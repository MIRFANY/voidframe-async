"""
predict.py

Load a saved model and predict risk from a JSON features file.
Usage: python predict.py <model_path> <features_json>

Outputs JSON to stdout: { riskScore: float, level: 'Low'|'Medium'|'High' }
"""
import sys
import json
import joblib
import numpy as np


def main():
    if len(sys.argv) < 3:
        print(json.dumps({'error': 'model_path and features_json required'}))
        return
    model_path = sys.argv[1]
    features_path = sys.argv[2]
    model = joblib.load(model_path)
    with open(features_path, 'r') as f:
        data = json.load(f)
    # Expect features as flat dict
    features = data.get('features') or data
    keys = sorted(features.keys())
    X = np.array([features[k] for k in keys], dtype=float).reshape(1, -1)
    prob = model.predict_proba(X)[0, 1]
    level = 'Low' if prob < 0.4 else ('Medium' if prob < 0.75 else 'High')
    print(json.dumps({'riskScore': float(prob), 'level': level}))


if __name__ == '__main__':
    main()
"""
Prediction wrapper script: load saved model and output prediction for given features (stdin/json args)
"""
import sys, json
print('Predict called - demo')
print(json.dumps({'riskScore': 0.42, 'level': 'Medium'}))