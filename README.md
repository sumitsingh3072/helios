# Helios

Helios is a comprehensive machine learning-powered application designed for intelligent document analysis and insights generation. It features a robust FastAPI backend for handling data processing, OCR tasks, and AI integrations, coupled with a modern, responsive Next.js frontend.

## 🚀 Features

- **Advanced OCR**: Text extraction from images and PDFs using PyTesseract and PyMuPDF.
- **AI-Powered Insights**: Generates intelligent insights using Google's Gemini models via LangChain.
- **Secure Authentication**: Built-in user authentication system.
- **Modern UI**: A responsive and interactive interface built with Next.js, Tailwind CSS, and Framer Motion.
- **Data Visualization**: Interactive charts and graphs powered by Recharts.
- **3D Elements**: Integration of 3D graphics using Three.js and React Three Fiber.
- **Image Management**: Seamless image handling with ImageKit.

## 🛠 Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: PostgreSQL (with pgvector support); ORM: [SQLAlchemy](https://www.sqlalchemy.org/)
- **AI/LLM**: Google Gemini (via `langchain-google-genai`)
- **OCR**: PyTesseract, PyMuPDF
- **Image Processing**: Pillow, ImageKit
- **Auth**: Python-JOSE, Passlib

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn UI, Lucide React
- **Animations**: Framer Motion, GSAP
- **3D**: Three.js, React Three Fiber
- **State Management**: Zustand, React Hook Form

## 📋 Prerequisites

Ensure you have the following installed:
- **Python** 3.10 or higher
- **Node.js** 18 or higher (LTS recommended)
- **PostgreSQL** database
- **Tesseract OCR** (installed on your system and added to PATH)

## 🏗 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/helios.git
cd helios
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv
```

Activate the virtual environment:
- **Windows**: `venv\Scripts\activate`
- **Unix/MacOS**: `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

**Configuration**:
Create a `.env` file in the `backend` directory with the following keys:
```env
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
# Add other keys as required (e.g., IMAGEKIT keys if used)
```

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

## 🏃 Usage

### Running the Backend
From the `root` directory (ensure your virtual environment is activated):
```bash
uvicorn backend.main:app --reload
```
The API will be available at `http://localhost:8000`.  
API Documentation: `http://localhost:8000/docs`.

### Running the Frontend
From the `frontend` directory:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 📂 Project Structure

```
helios/
├── backend/                # FastAPI backend
│   ├── app/                # Application logic (API, Core, Services)
│   ├── db/                 # Database connection and session
│   ├── models/             # SQLAlchemy models
│   ├── main.py             # Entry point
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Backend environment variables
├── frontend/               # Next.js frontend
│   ├── src/                # Source code (Components, Pages, etc.)
│   ├── public/             # Static assets
│   ├── package.json        # Node.js dependencies
│   └── next.config.ts      # Next.js configuration
└── README.md               # Project documentation
```

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.