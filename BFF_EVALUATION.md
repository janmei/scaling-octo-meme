# BFF (Backend For Frontend) Evaluation

## Architecture Overview
The project has been transitioned from a pure frontend app with mock data to a full-stack application featuring an Express-based BFF and a Prisma/SQLite database.

### Why a BFF?
1. **Security**: The Gemini API integration has been moved to the backend. This prevents the `GEMINI_API_KEY` from being exposed to the client-side browser, significantly improving the security posture of the application.
2. **Data Aggregation**: The Dashboard requires data from multiple sources (Orders, Shipments). The BFF provides a dedicated `/api/dashboard` endpoint that aggregates these metrics into a single optimized payload, reducing the number of round-trips and frontend complexity.
3. **Frontend-Optimized API**: The API is designed specifically to match the UI's needs. For instance, the metrics returned by `/api/dashboard` include the exact labels and icons used in the React components.
4. **Decoupling**: The frontend is no longer tied to a specific database schema or mock data structure. It interacts with an abstraction layer (the BFF), making it easier to scale or change the database in the future.

## Implementation Details
- **Backend**: Express.js with TypeScript (`tsx`).
- **Database**: SQLite with Prisma 6 for type-safe database access.
- **Proxy**: Vite is configured to proxy `/api` requests to the BFF running on port 3001.
- **AI Integration**: Gemini 1.5 Flash is integrated via the backend `/api/generate-insights` endpoint.
- **Hosting**: Configured for **Vercel**. The backend is served as a Serverless Function in the `api/` directory.
- **Database Persistence**: SQLite is used for this demo. Note that on Vercel, the filesystem is ephemeral, so any data changes (CRUD) will not persist across function restarts. For production, a persistent database like PostgreSQL is recommended.

## Conclusion
The BFF pattern is highly effective for this application as it provides a secure, efficient, and maintainable bridge between the React frontend and the data/AI services.
