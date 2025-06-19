const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pipeline } = require('stream');
const { AutoModelForCausalLM, AutoTokenizer } = require('@xenova/transformers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let model, tokenizer;
(async () => {
  tokenizer = await AutoTokenizer.from_pretrained('microsoft/DialoGPT-medium');
  model = await AutoModelForCausalLM.from_pretrained('microsoft/DialoGPT-medium');
})();

app.post('/api/psychologist', async (req, res) => {
  const input = req.body.message;
  const inputIds = tokenizer.encode(input + tokenizer.eos_token, { return_tensors: 'pt' });
  const outputIds = await model.generate(inputIds, { max_length: 150, pad_token_id: tokenizer.eos_token_id });
  const reply = tokenizer.decode(outputIds[0].slice(inputIds.shape[-1]), { skip_special_tokens: true });
  res.json({ reply });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
