"""
image_analyze.py

Small example using OpenCV to extract simple image features.
Usage: python image_analyze.py <image_path>
Prints JSON to stdout with simple features (width, height, num_contours)
"""
import sys
import json
import cv2


def analyze_image(path):
    img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        return {'error': 'cannot read image'}
    h, w = img.shape[:2]
    # Simple contour count as a heuristic
    _, thresh = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    return {'width': w, 'height': h, 'num_contours': len(contours)}


def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'image path required'}))
        return
    path = sys.argv[1]
    features = analyze_image(path)
    print(json.dumps({'features': features}))


if __name__ == '__main__':
    main()
