"""
nlp_analyze.py

Simple example using spaCy to extract text features for DPR quality evaluation.
Usage: python nlp_analyze.py <input_text_file>
Outputs JSON to stdout with features like word_count, sent_count, avg_sent_length.
"""
import sys
import json
import spacy


def analyze_text(text):
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    words = [t for t in doc if t.is_alpha]
    sents = list(doc.sents)
    features = {
        'word_count': len(words),
        'sent_count': len(sents),
        'avg_sent_length': (len(words) / len(sents)) if sents else 0
    }
    return features


def main():
    if len(sys.argv) >= 2:
        path = sys.argv[1]
        with open(path, 'r', encoding='utf-8') as f:
            text = f.read()
    else:
        text = sys.stdin.read()

    features = analyze_text(text)
    print(json.dumps({'features': features}))


if __name__ == '__main__':
    main()
