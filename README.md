# Anusha Ladha’s Portfolio
## Introduction

Hi! I’m Anusha Ladha, a second-year Computer Science student at UCLA. This repository contains the code for my interactive 3D portfolio website. The site is designed as a floating island with three simple sections: About, Projects, and Contact.

## About This Project

I built this portfolio to create a more personal and immersive way to share my work. Instead of a standard static layout, the island is a little more fun and interactive! Hope you enjoy exploring it.

## RAG Chatbot

The site includes an optional chatbot that answers questions about Anusha using RAG (retrieval-augmented generation). The knowledge base is built from `server/knowledge/about.md` (you can edit this to add more about you).

### Setup

1. **OpenAI API key**  
   Create a key at [OpenAI API keys](https://platform.openai.com/api-keys) and add it to `server/.env`:
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env and set OPENAI_API_KEY=sk-...
   ```

2. **Install server deps and build the knowledge base** (one-time, or whenever you change `about.md`):
   ```bash
   cd server && npm install && npm run embed && cd ..
   ```

3. **Run the chat server** (in a separate terminal):
   ```bash
   cd server && npm start
   ```

4. **Run the frontend** (from project root):
   ```bash
   npm run dev
   ```

Open the site and use the blue chat button at the bottom-right to ask questions. In dev, Vite proxies `/api` to the server; for production, set `VITE_CHAT_API_URL` to your backend URL if the API is on a different origin.

**Deploying to production:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for how to deploy the site and AnushaGPT (frontend on Vercel, chat backend on Render or similar).

## Contact

If you'd like to connect or collaborate, feel free to reach out:
anushaladha4@g.ucla.edu
