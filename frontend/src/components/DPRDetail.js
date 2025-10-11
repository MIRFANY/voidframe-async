import React from 'react';

// Simple modal to show DPR details, scores and feedback. This is intentionally minimal
// so it can be wired to real API responses or ML outputs later.
export default function DPRDetail({ dpr, onClose }) {
  if (!dpr) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{dpr.title}</h3>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>

        <div className="modal-body">
          <div className="meta">{dpr.site} • {dpr.author} • <small className="muted">{dpr.date}</small></div>
          <div className="scores">
            <div className="score-item">NLP: <strong>{Math.round((dpr.analysis?.text?.score || dpr.nlpScore || 0) * 100)}%</strong></div>
            <div className="score-item">Images: <strong>{Math.round((dpr.analysis?.image?.score || dpr.imageScore || 0) * 100)}%</strong></div>
            <div className="score-item">Overall: <strong>{dpr.overallScore ?? Math.round(((dpr.analysis?.text?.score||0) + (dpr.analysis?.image?.score||0))/2 * 100) }%</strong></div>
            <div className="score-item">Decision: <strong style={{ textTransform: 'capitalize' }}>{dpr.decision || 'review'}</strong></div>
            <div className="score-item">Risk Level: <strong style={{ textTransform: 'capitalize' }}>{dpr.riskLevel || (dpr.analysis?.risk?.level)}</strong></div>
          </div>

          <h4>Summary</h4>
          <p className="muted">{dpr.analysis?.text?.text || dpr.text || 'No textual content available.'}</p>

          <h4>Risk Reasons</h4>
          <ul>
            {(dpr.analysis?.risk?.reasons || []).map((f, i) => <li key={i}>{f}</li>)}
            {(!dpr.analysis?.risk?.reasons || dpr.analysis?.risk?.reasons.length === 0) && <li>{dpr.feedback || 'No issues flagged'}</li>}
          </ul>

          <div className="modal-actions">
            <button className="btn">Re-run Analysis</button>
            <button className="btn ghost">Mark Reviewed</button>
            <button className="btn ghost">Override Decision</button>
          </div>
        </div>
      </div>
    </div>
  );
}
