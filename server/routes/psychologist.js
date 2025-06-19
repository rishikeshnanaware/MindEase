const express = require('express');
const router = express.Router();
const { AutoModelForCausalLM, AutoTokenizer } = require('@xenova/transformers');

let model, tokenizer;

(async () => {
  tokenizer = await AutoTokenizer.from_pretrained('./model');
  model = await AutoModelForCausalLM.from_pretrained('./model');
})();

router.post('/', async (req, res) => {
  try {
    const input = req.body.message;
    const inputIds = tokenizer.encode(input + tokenizer.eos_token, { return_tensors: 'pt' });
    const outputIds = await model.generate(inputIds, {
      max_length: 150,
      pad_token_id: tokenizer.eos_token_id
    });
    const reply = tokenizer.decode(outputIds[0].slice(inputIds.shape[-1]), { skip_special_tokens: true });
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: 'Sorry, I am having trouble processing that.' });
  }
});

module.exports = router;
