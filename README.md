# MindEase – AI Psychologist Chatbot

MindEase is a mental wellness platform with an AI-powered chatbot trained to support users with empathetic conversations. It offers a clean UI, login/auth system, and real-time chat with an AI therapist.

## 💡 Features
- Responsive UI with Home, About, Contact, Login/Register, and Chat pages
- Real-time interaction with an AI psychologist (DialoGPT trained on EmpatheticDialogues)
- Node.js/Express backend with local model hosting

## 🛠️ Tech Stack
- Frontend: ReactJS
- Backend: Node.js
-Model: Fine-tuned DialoGPT-medium (local server)
- Dataset: [EmpatheticDialogues on Kaggle](https://www.kaggle.com/datasets/atharvjairath/empathetic-dialogues-facebook-ai)

## 🚀 Setup Instructions
```bash
# Frontend
cd client
npm install
npm start

# Backend
cd server
npm install
node server.js
```
