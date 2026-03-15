import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());

function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}
let embeddings = null;

function loadEmbeddings() {
  if (embeddings) return embeddings;
  const p = path.join(__dirname, 'knowledge/embeddings.json');
  if (!fs.existsSync(p)) {
    throw new Error('Run "npm run embed" in server/ first to generate knowledge/embeddings.json');
  }
  embeddings = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return embeddings;
}

function cosineSimilarity(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function getRelevantChunks(openai, query, topK = 5) {
  const list = loadEmbeddings();
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const qEmb = res.data[0].embedding;
  const scored = list.map(({ text, embedding }) => ({
    text,
    score: cosineSimilarity(qEmb, embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((x) => x.text);
}

app.get('/', (req, res) => {
  res.json({
    message: 'Chat API is running. Use the portfolio site (Vite dev server) to open the app.',
    chat: 'POST /api/chat with body { "message": "..." }',
  });
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }
  const openai = getOpenAI();
  if (!openai) {
    return res.status(500).json({
      error: 'Chat not configured. Add OPENAI_API_KEY to server/.env (see server/.env.example).',
    });
  }

  try {
    const embeddingsPath = path.join(__dirname, 'knowledge/embeddings.json');
    if (!fs.existsSync(embeddingsPath)) {
      return res.status(503).json({
        error: 'Knowledge base not built. In the server folder run: npm run embed (requires OPENAI_API_KEY in .env)',
      });
    }
    const chunks = await getRelevantChunks(openai, message);
    const context = chunks.join('\n\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are AnushaGPT, a helpful assistant for Anusha Ladha's portfolio site. Answer only based on the following information about Anusha. If the answer is not in the context, say you don't know or suggest they reach out via the contact page.\n\nContext:\n${context}`,
        },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a reply.';
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Chat failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`RAG chat API running on http://localhost:${PORT}`));
