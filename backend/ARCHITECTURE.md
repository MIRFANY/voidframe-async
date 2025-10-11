Architecture contract

Inputs/Outputs:

- Upload DPR: multipart form-data file -> stored DPR record with analysis
- Text analysis: returns normalized features { word_count, sent_count, avg_sent_length }
- Image analysis: returns normalized features { width, height, num_contours }
- ML prediction: accepts flat features and returns { riskScore, level }

Error modes:

- Missing file -> 400
- DB errors -> 500
- ML script failures -> 502 (to be implemented)

Edge cases:

- Empty/very short DPRs: return low-confidence flag
- Large files: stream processing and job queue recommended
- Auth/permissions: add middleware (not included)
