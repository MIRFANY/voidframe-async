Backend README

- Start: cd backend; npm install; npm run dev
- Endpoints:
  - POST /api/dpr/upload -> multipart form 'file' to upload DPR
  - GET /api/dpr/:id -> get DPR analysis
  - POST /api/ml/predict -> JSON features -> returns { riskScore, level }
  - POST /api/ml/train -> { datasetPath }

Notes: ML integration currently mocked; replace mlService to call real scripts/services.
