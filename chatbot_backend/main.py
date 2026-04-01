from fastapi import FastAPI
from db.model import Query, PromptRequest
from db.ai_service import ask_gemini
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROLE_PROMPT = "You are a medical doctor. Answer only medical questions."

MEDICAL_KEYWORDS = [
    "fever","headache","pain","medicine","doctor","disease",
    "infection","symptom","treatment","blood","heart"
]

@app.post("/ask_ai")
def ask_ai(data: Query):

    question = data.question.lower()

    if not any(word in question for word in MEDICAL_KEYWORDS):
        return {
            "question": data.question,
            "answer": "I am a doctor. Please ask a medical related question."
        }

    final_prompt = ROLE_PROMPT + "\nQuestion: " + data.question

    answer = ask_gemini(final_prompt)

    return {
        "question": data.question,
        "answer": answer
    }


@app.post("/ask")
def ask(request: PromptRequest):
    response = ask_ai(Query(question=request.prompt))

    #response = ask_ai(request.prompt)
    return {"response": response}

# @app.post("/ask")
# def ask(request: PromptRequest):
#     response = ask_ai(Query(question=request.prompt))
#     return {"response": response}