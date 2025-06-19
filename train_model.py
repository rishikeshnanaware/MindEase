from datasets import load_dataset, Dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, Trainer, TrainingArguments
import pandas as pd

# Load Kaggle CSV (you can preprocess outside if needed)
df = pd.read_csv('data/empatheticdialogues.csv')  # must contain 'context' and 'utterance'

# Create prompt-response pairs
conversations = []
for i, row in df.iterrows():
    context = row['context']
    utterance = row['utterance']
    prompt = f"User: {context}\nTherapist:"
    completion = f" {utterance}"
    conversations.append({"text": prompt + completion})

# Convert to Hugging Face Dataset
train_data = Dataset.from_pandas(pd.DataFrame(conversations))

# Load tokenizer and model
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Tokenization function
def tokenize(batch):
    return tokenizer(batch["text"], padding="max_length", truncation=True, max_length=128)

train_data = train_data.map(tokenize, batched=True)
train_data.set_format("torch", columns=["input_ids", "attention_mask"])

# Training configuration
training_args = TrainingArguments(
    output_dir="./model",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    logging_dir="./logs",
    logging_steps=50,
    save_strategy="epoch"
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_data
)

# Start training
trainer.train()

# Save model and tokenizer
model.save_pretrained("./model")
tokenizer.save_pretrained("./model")
