from pydantic import BaseModel

class DocumentBase(BaseModel):
    """Base schema with common document attributes."""
    filename: str
    extracted_text: str | None = None


class DocumentCreate(DocumentBase):
    """Schema for creating a new document."""
    pass


class Document(DocumentBase):
    """Schema for returning a document from the API."""
    id: int
    owner_id: int

    class Config:
        from_attributes = True
