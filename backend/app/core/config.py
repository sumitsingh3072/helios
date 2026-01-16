from pydantic_settings import BaseSettings, SettingsConfigDict
import os

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')


class Settings(BaseSettings):
    """
    Holds all the application settings. The values are loaded from
    environment variables.
    """
    PROJECT_NAME: str = "Helios"
    API_V1_STR: str = "/api/v1"
    GEMINI_API_KEY: str 
    SECRET_KEY: str
    DATABASE_URL: str
    model_config = SettingsConfigDict(env_file="C:\\ML_Projects\\Helios\\backend\\.env", extra="ignore")

settings = Settings()  # type: ignore