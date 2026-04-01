from pydantic import BaseModel

class Query(BaseModel):
    question: str

class PromptRequest(BaseModel):
    prompt: str


