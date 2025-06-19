from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load fine-tuned model
model_name = "./model"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route("/api/psychologist", methods=["POST"])
def psychologist():
    data = request.get_json()
    user_input = data.get("message", "")

    input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors="pt")
    output_ids = model.generate(
        input_ids,
        max_length=150,
        pad_token_id=tokenizer.eos_token_id
    )
    reply = tokenizer.decode(output_ids[0][input_ids.shape[-1]:], skip_special_tokens=True)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
