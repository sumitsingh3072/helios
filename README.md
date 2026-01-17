# Helios 🌞

<div align="center">

![Helios Banner](https://img.shields.io/badge/Helios-Financial%20Intelligence-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI1Ii8+PGxpbmUgeDE9IjEyIiB5MT0iMSIgeDI9IjEyIiB5Mj0iMyIvPjxsaW5lIHgxPSIxMiIgeTE9IjIxIiB4Mj0iMTIiIHkyPSIyMyIvPjxsaW5lIHgxPSI0LjIyIiB5MT0iNC4yMiIgeDI9IjUuNjQiIHkyPSI1LjY0Ii8+PGxpbmUgeDE9IjE4LjM2IiB5MT0iMTguMzYiIHgyPSIxOS43OCIgeTI9IjE5Ljc4Ii8+PGxpbmUgeDE9IjEiIHkxPSIxMiIgeDI9IjMiIHkyPSIxMiIvPjxsaW5lIHgxPSIyMSIgeTE9IjEyIiB4Mj0iMjMiIHkyPSIxMiIvPjxsaW5lIHgxPSI0LjIyIiB5MT0iMTkuNzgiIHgyPSI1LjY0IiB5Mj0iMTguMzYiLz48bGluZSB4MT0iMTguMzYiIHkxPSI1LjY0IiB4Mj0iMTkuNzgiIHkyPSI0LjIyIi8+PC9zdmc+)

**AI-Powered Financial Intelligence Platform**

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 📖 Overview

Helios is a comprehensive machine learning-powered application designed for intelligent document analysis, financial insights generation, and fraud detection. It features a robust FastAPI backend for handling data processing, OCR tasks, and AI integrations, coupled with a modern, responsive Next.js frontend.

---

## 🏗 System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Browser]
        MOBILE[Mobile Browser]
    end
    
    subgraph "Frontend - Next.js"
        NEXT[Next.js 15 App Router]
        COMPONENTS[React Components]
        STORES[Zustand Stores]
        HOOKS[Custom Hooks]
        API_SERVICE[API Service Layer]
    end
    
    subgraph "Backend - FastAPI"
        FASTAPI[FastAPI Server]
        AUTH[Auth Middleware]
        ENDPOINTS[API Endpoints]
        SERVICES[Business Services]
    end
    
    subgraph "AI/ML Layer"
        GEMINI[Google Gemini]
        LANGCHAIN[LangChain]
        OCR[Tesseract OCR]
        PYMUPDF[PyMuPDF]
    end
    
    subgraph "Data Layer"
        POSTGRES[(PostgreSQL)]
        IMAGEKIT[ImageKit CDN]
    end
    
    WEB --> NEXT
    MOBILE --> NEXT
    NEXT --> COMPONENTS
    COMPONENTS --> STORES
    COMPONENTS --> HOOKS
    HOOKS --> API_SERVICE
    API_SERVICE --> FASTAPI
    FASTAPI --> AUTH
    AUTH --> ENDPOINTS
    ENDPOINTS --> SERVICES
    SERVICES --> GEMINI
    SERVICES --> LANGCHAIN
    SERVICES --> OCR
    SERVICES --> PYMUPDF
    SERVICES --> POSTGRES
    SERVICES --> IMAGEKIT
```

### Low-Level Design (LLD)

```mermaid
graph LR
    subgraph "Frontend Architecture"
        direction TB
        
        subgraph "Pages (App Router)"
            HOME["/"]
            LOGIN["/auth/login"]
            SIGNUP["/auth/signup"]
            DASHBOARD["/dashboard"]
            CHAT["/dashboard/chat"]
            INSIGHTS["/dashboard/insights"]
            SCANNER["/dashboard/scanner"]
            TRANSACTIONS["/dashboard/transactions"]
            SETTINGS["/dashboard/settings"]
        end
        
        subgraph "State Management"
            AUTH_STORE[authStore]
            UI_STORE[uiStore]
            SETTINGS_STORE[settingsStore]
            INSIGHTS_STORE[financialInsightsStore]
        end
        
        subgraph "Services"
            API_SVC[api.ts]
            TOKEN_MGR[tokenManager]
        end
    end
```

---

## 🔄 Data Flow Diagrams

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant AS as AuthStore
    participant API as Backend API
    participant DB as PostgreSQL
    participant JWT as JWT Service
    
    U->>FE: Enter credentials
    FE->>API: POST /api/v1/login/token
    API->>DB: Validate user
    DB-->>API: User data
    API->>JWT: Generate token
    JWT-->>API: Access token
    API-->>FE: {access_token, token_type}
    FE->>AS: Store token & user
    AS->>FE: Update isAuthenticated
    FE->>U: Redirect to /dashboard
```

### Financial Insights Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant IS as InsightsStore
    participant API as Backend API
    participant OCR as OCR Service
    participant AI as Gemini AI
    participant DB as PostgreSQL
    
    U->>FE: Upload bank statement
    FE->>IS: uploadStatement(file)
    IS->>API: POST /api/v1/expense/financial/get-insights
    API->>OCR: Extract text from document
    OCR-->>API: Extracted text
    API->>AI: Analyze financial data
    AI-->>API: Advisory report
    API->>DB: Store document record
    API-->>IS: {advisory_report}
    IS->>FE: Update report state
    FE->>U: Display insights cards
```

### Chat Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Backend API
    participant LLM as LangChain + Gemini
    participant DB as PostgreSQL
    
    U->>FE: Send message
    FE->>API: POST /api/v1/chat/
    API->>DB: Load user context
    DB-->>API: User transactions, history
    API->>LLM: Process with context
    LLM-->>API: AI response
    API->>DB: Save chat message
    API-->>FE: {message, response}
    FE->>U: Display AI response
```

### Document Scanner Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Backend API
    participant OCR as Tesseract OCR
    participant DOC as Document Analysis
    participant FRAUD as Fraud Detection
    
    U->>FE: Upload document image
    
    alt OCR Extraction
        FE->>API: POST /api/v1/ocr/upload
        API->>OCR: Process image
        OCR-->>API: Extracted text
        API-->>FE: {extracted_text}
    end
    
    alt Document Analysis
        FE->>API: POST /api/v1/document-analysis/analyze
        API->>DOC: Analyze document structure
        DOC-->>API: {document_type, extracted_data}
        API-->>FE: Structured data
    end
    
    alt Fraud Detection
        FE->>API: POST /api/v1/fraud/analyze
        API->>FRAUD: Check for scam patterns
        FRAUD-->>API: {is_scam, reason}
        API-->>FE: Risk assessment
    end
    
    FE->>U: Display all results
```

---

## 📁 Detailed Project Structure

```
helios/
├── backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── api/
│   │   │   ├── api_v1/
│   │   │   │   ├── endpoints/        # API route handlers
│   │   │   │   │   ├── chat.py       # AI chat endpoint
│   │   │   │   │   ├── dashboard.py  # Dashboard summary
│   │   │   │   │   ├── document.py   # Document management
│   │   │   │   │   ├── document_analysis.py  # Document AI analysis
│   │   │   │   │   ├── expense.py    # Bill processing & insights
│   │   │   │   │   ├── fraud.py      # Fraud detection
│   │   │   │   │   ├── health.py     # Health check
│   │   │   │   │   ├── insights.py   # Financial insights
│   │   │   │   │   ├── login.py      # Authentication
│   │   │   │   │   ├── ocr.py        # OCR processing
│   │   │   │   │   └── user.py       # User management
│   │   │   │   └── api.py            # Router aggregation
│   │   │   └── deps.py               # Dependency injection
│   │   ├── core/                     # Core configuration
│   │   │   ├── config.py             # App settings
│   │   │   └── security.py           # JWT & password hashing
│   │   ├── schemas/                  # Pydantic models
│   │   │   ├── chat.py
│   │   │   ├── dashboard.py
│   │   │   ├── document.py
│   │   │   ├── token.py
│   │   │   ├── transactions.py
│   │   │   └── user.py
│   │   └── services/                 # Business logic
│   │       ├── gemini_service.py     # Gemini AI integration
│   │       ├── ocr_service.py        # OCR processing
│   │       └── document_service.py   # Document handling
│   ├── db/
│   │   ├── database.py               # Database connection
│   │   └── session.py                # Session management
│   ├── models/                       # SQLAlchemy models
│   │   ├── user.py
│   │   ├── document.py
│   │   ├── chat.py
│   │   └── transaction.py
│   ├── main.py                       # Application entry point
│   ├── requirements.txt              # Python dependencies
│   └── .env                          # Environment variables
│
├── frontend/                         # Next.js Frontend
│   ├── src/
│   │   ├── app/                      # App Router pages
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx    # Login page
│   │   │   │   ├── signup/page.tsx   # Signup page
│   │   │   │   └── layout.tsx        # Auth layout
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          # Dashboard overview
│   │   │   │   ├── chat/page.tsx     # AI chat
│   │   │   │   ├── insights/page.tsx # Financial insights
│   │   │   │   ├── scanner/page.tsx  # Document scanner
│   │   │   │   ├── transactions/page.tsx
│   │   │   │   ├── settings/page.tsx
│   │   │   │   └── layout.tsx        # Dashboard layout + AuthGuard
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── page.tsx              # Landing page
│   │   ├── components/
│   │   │   ├── auth-guard.tsx        # Route protection
│   │   │   ├── app-sidebar.tsx       # Navigation sidebar
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   ├── chat/                 # Chat components
│   │   │   ├── insights/             # Insight cards
│   │   │   │   ├── statement-upload.tsx
│   │   │   │   ├── client-profile-card.tsx
│   │   │   │   ├── financial-health-card.tsx
│   │   │   │   ├── key-metrics-cards.tsx
│   │   │   │   ├── detailed-analysis-card.tsx
│   │   │   │   └── recommendations-card.tsx
│   │   │   └── ui/                   # Reusable UI components
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useDashboard.ts
│   │   │   ├── useInsights.ts
│   │   │   └── useChat.ts
│   │   ├── stores/                   # Zustand state stores
│   │   │   ├── authStore.ts          # Authentication state
│   │   │   ├── uiStore.ts            # UI state
│   │   │   ├── settingsStore.ts      # User settings
│   │   │   ├── financialInsightsStore.ts  # Financial report state
│   │   │   └── index.ts              # Barrel export
│   │   ├── services/
│   │   │   └── api.ts                # API client & types
│   │   ├── types/
│   │   │   └── financialInsights.ts  # TypeScript interfaces
│   │   └── lib/
│   │       └── utils.ts              # Utility functions
│   ├── public/                       # Static assets
│   ├── package.json
│   └── next.config.ts
│
└── README.md
```

---

## 🔐 Security Architecture

```mermaid
graph TB
    subgraph "Frontend Security"
        AUTH_GUARD[AuthGuard Component]
        TOKEN_STORAGE[localStorage Token]
        ROUTE_PROTECTION[Protected Routes]
    end
    
    subgraph "API Security"
        BEARER[Bearer Token Auth]
        JWT_VERIFY[JWT Verification]
        OAUTH2[OAuth2 Password Flow]
    end
    
    subgraph "Backend Security"
        PASSLIB[Passlib bcrypt]
        JOSE[python-jose]
        CORS[CORS Middleware]
    end
    
    subgraph "Data Security"
        ENCRYPTED_PWD[Encrypted Passwords]
        SQL_INJECTION[SQLAlchemy ORM]
    end
    
    AUTH_GUARD --> TOKEN_STORAGE
    AUTH_GUARD --> ROUTE_PROTECTION
    TOKEN_STORAGE --> BEARER
    BEARER --> JWT_VERIFY
    JWT_VERIFY --> OAUTH2
    OAUTH2 --> PASSLIB
    JWT_VERIFY --> JOSE
    PASSLIB --> ENCRYPTED_PWD
    JOSE --> ENCRYPTED_PWD
```

---

## 🧩 Component Architecture

### Frontend Component Hierarchy

```mermaid
graph TD
    ROOT[RootLayout]
    ROOT --> LANDING[LandingPage]
    ROOT --> AUTH_LAYOUT[AuthLayout]
    ROOT --> DASH_LAYOUT[DashboardLayout]
    
    AUTH_LAYOUT --> LOGIN[LoginPage]
    AUTH_LAYOUT --> SIGNUP[SignupPage]
    
    DASH_LAYOUT --> AUTH_GUARD[AuthGuard]
    AUTH_GUARD --> SIDEBAR[AppSidebar]
    AUTH_GUARD --> CONTENT[Dashboard Content]
    
    CONTENT --> OVERVIEW[OverviewPage]
    CONTENT --> CHAT_PAGE[ChatPage]
    CONTENT --> INSIGHTS_PAGE[InsightsPage]
    CONTENT --> SCANNER[ScannerPage]
    
    INSIGHTS_PAGE --> UPLOAD[StatementUpload]
    INSIGHTS_PAGE --> PROFILE[ClientProfileCard]
    INSIGHTS_PAGE --> HEALTH[FinancialHealthCard]
    INSIGHTS_PAGE --> METRICS[KeyMetricsCards]
    INSIGHTS_PAGE --> ANALYSIS[DetailedAnalysisCard]
    INSIGHTS_PAGE --> RECS[RecommendationsCard]
```

### State Management Flow

```mermaid
graph LR
    subgraph "Zustand Stores"
        AUTH[authStore]
        UI[uiStore]
        SETTINGS[settingsStore]
        INSIGHTS[financialInsightsStore]
    end
    
    subgraph "Persistence"
        LOCAL[localStorage]
    end
    
    subgraph "Components"
        C1[Dashboard]
        C2[Sidebar]
        C3[InsightsPage]
        C4[Settings]
    end
    
    AUTH --> |persist| LOCAL
    SETTINGS --> |persist| LOCAL
    INSIGHTS --> |persist| LOCAL
    
    C1 --> AUTH
    C1 --> INSIGHTS
    C2 --> AUTH
    C3 --> INSIGHTS
    C4 --> SETTINGS
```

---

## 🚀 Features

| Feature | Description | Tech Stack |
|---------|-------------|------------|
| **OCR Processing** | Extract text from images/PDFs | PyTesseract, PyMuPDF |
| **AI Financial Insights** | Analyze bank statements for recommendations | Google Gemini, LangChain |
| **Fraud Detection** | Identify potential scam messages | Gemini AI Pattern Matching |
| **Document Analysis** | Structure extraction from documents | Gemini Vision API |
| **AI Chat Assistant** | Context-aware financial Q&A | LangChain, Gemini |
| **Dashboard Analytics** | Spending charts and metrics | Recharts, Zustand |
| **Secure Authentication** | JWT-based auth with route protection | python-jose, AuthGuard |
| **Responsive UI** | Mobile-first dark theme design | Tailwind CSS, Framer Motion |

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | High-performance API framework |
| [SQLAlchemy](https://www.sqlalchemy.org/) | ORM for PostgreSQL |
| [Pydantic](https://pydantic.dev/) | Data validation |
| [LangChain](https://www.langchain.com/) | LLM orchestration |
| [Google Gemini](https://ai.google.dev/) | AI/LLM provider |
| [PyTesseract](https://github.com/madmaze/pytesseract) | OCR engine |
| [python-jose](https://github.com/mpdavis/python-jose) | JWT handling |
| [Passlib](https://passlib.readthedocs.io/) | Password hashing |

### Frontend
| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Recharts](https://recharts.org/) | Data visualization |
| [Radix UI](https://www.radix-ui.com/) | Accessible components |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## 📋 Prerequisites

| Requirement | Version |
|-------------|---------|
| Python | 3.10+ |
| Node.js | 18+ (LTS) |
| PostgreSQL | 13+ |
| Tesseract OCR | 5.0+ |

---

## 🏗 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/helios.git
cd helios
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Unix/MacOS)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Environment Variables** (`.env`):
```env
DATABASE_URL=postgresql://user:password@localhost/helios
SECRET_KEY=your-super-secret-key-here
GEMINI_API_KEY=your-gemini-api-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-endpoint
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install
```

**Environment Variables** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🏃 Usage

### Start Backend
```bash
# From backend directory
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- API: `http://localhost:8000`
- Swagger Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Start Frontend
```bash
# From frontend directory
npm run dev
```
- Application: `http://localhost:3000`

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/login/token` | User authentication |
| `POST` | `/api/v1/users/` | User registration |
| `GET` | `/api/v1/users/me` | Get current user |
| `POST` | `/api/v1/chat/` | AI chat message |
| `GET` | `/api/v1/dashboard/summary` | Dashboard stats |
| `POST` | `/api/v1/ocr/upload` | OCR text extraction |
| `POST` | `/api/v1/document-analysis/analyze` | Document AI analysis |
| `POST` | `/api/v1/fraud/analyze` | Fraud detection |
| `POST` | `/api/v1/expense/process-bill` | Bill processing |
| `POST` | `/api/v1/expense/financial/get-insights` | Financial insights |
| `GET` | `/api/v1/health/` | Health check |

---

## 🎨 UI/UX Design Principles

- **Dark Theme First**: Premium black-based color palette
- **Glassmorphism**: Subtle blur and transparency effects
- **Micro-animations**: Smooth transitions with Framer Motion
- **Mobile Responsive**: Optimized for all screen sizes
- **Accessibility**: WCAG 2.1 compliant components

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ using FastAPI + Next.js**

</div>