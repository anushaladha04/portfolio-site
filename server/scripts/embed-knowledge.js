import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function chunkText(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + chunkSize;
    if (end < text.length) {
      const nextSpace = text.lastIndexOf(' ', end);
      if (nextSpace > start) end = nextSpace + 1;
    }
    chunks.push(text.slice(start, end).trim());
    start = end - overlap;
  }
  return chunks.filter(c => c.length > 0);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Set OPENAI_API_KEY in server/.env');
    process.exit(1);
  }

  const knowledgeDir = path.join(__dirname, '../knowledge');
  const files = fs.readdirSync(knowledgeDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.txt'))
    .sort();
  const text = files
    .map((f) => fs.readFileSync(path.join(knowledgeDir, f), 'utf-8'))
    .join('\n\n');
  if (!text.trim()) {
    console.error('No .md or .txt files found in server/knowledge/');
    process.exit(1);
  }
  console.log('Using knowledge files:', files.join(', '));
  const chunks = chunkText(text);

  const openai = new OpenAI({ apiKey });
  const embeddings = [];
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  for (let i = 0; i < chunks.length; i++) {
    let lastErr;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunks[i],
        });
        embeddings.push({ text: chunks[i], embedding: res.data[0].embedding });
        if ((i + 1) % 5 === 0) console.log(`Embedded ${i + 1}/${chunks.length}`);
        await delay(300);
        break;
      } catch (e) {
        lastErr = e;
        if (e.status === 429 && attempt < 2) {
          console.log('Rate limited, waiting 5s...');
          await delay(5000);
        } else throw e;
      }
    }
  }

  const outPath = path.join(__dirname, '../knowledge/embeddings.json');
  fs.writeFileSync(outPath, JSON.stringify(embeddings), 'utf-8');
  console.log(`Wrote ${embeddings.length} chunks to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
