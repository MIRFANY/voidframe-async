"""
train_xgb.py

Example XGBoost training script.
Usage:
  python train_xgb.py <dataset_csv> <output_model_path>

If dataset_csv is omitted, this script will train on a small synthetic dataset for demo purposes.

This script requires: pandas, scikit-learn, xgboost, joblib
"""
import sys
import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import xgboost as xgb


def main():
	args = sys.argv[1:]
	if len(args) >= 2:
		data_path, out_path = args[0], args[1]
	else:
		data_path = None
		out_path = os.path.join('models', 'xgb_model.joblib')

	if data_path and os.path.exists(data_path):
		df = pd.read_csv(data_path)
		# Assumes last column is the label
		X = df.iloc[:, :-1]
		y = df.iloc[:, -1]
	else:
		print('No dataset provided or file not found — generating synthetic demo data')
		from sklearn.datasets import make_classification
		X, y = make_classification(n_samples=500, n_features=10, n_informative=6, random_state=42)
		X = pd.DataFrame(X, columns=[f'f{i}' for i in range(X.shape[1])])

	X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

	clf = xgb.XGBClassifier(n_estimators=50, use_label_encoder=False, eval_metric='logloss')
	clf.fit(X_train, y_train)

	preds = clf.predict_proba(X_val)[:, 1]
	auc = roc_auc_score(y_val, preds)
	print(f'Training complete — validation AUC: {auc:.4f}')

	os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
	joblib.dump(clf, out_path)
	print('Model saved to', out_path)


if __name__ == '__main__':
	main()
