import { useState } from 'react';
export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: 'bot', content: 'Hi, I\'m here for you. How are you feeling today?' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await fetch('http://localhost:5000/api/psychologist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages(m => [...m, { role: 'bot', content: data.reply }]);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Talk to MindEase</h2>
      <div className="border p-4 h-96 overflow-y-scroll mb-4 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}> 
            <span className="inline-block px-3 py-1 rounded bg-white shadow text-sm">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 border p-2 rounded-l" placeholder="Type your thoughts..." />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </div>
    </div>
  );
} 
