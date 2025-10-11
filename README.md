# DPR Evaluator 

This workspace is a full-stack AI-powered DPR evaluation system.

Structure:

- backend/: Node.js + Express API, MongoDB models, services for NLP, image analysis, and ML orchestration
- ml/: Python scripts for model training and prediction (XGBoost/OpenCV placeholders)
- frontend/: React app with a dashboard to display DPR quality scores and risk levels

How to run (local dev):

1. Start MongoDB locally (or set MONGO_URI in env)
2. Install backend deps and start server:
   - cd backend; npm install; npm run dev
3. Install frontend deps and start React dev server:
   - cd frontend; npm install; npm start

Notes:

- ML and image-processing scripts are placeholders. In production you'd implement real analysis in Python and call from Node.js (e.g., via REST or spawned processes).
- Add environment variables and secrets using .env files (not included).
