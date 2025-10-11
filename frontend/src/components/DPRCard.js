import React from 'react';

// DPRCard: reusable card to display a DPR summary and quick actions
export default function DPRCard({ dpr, onView }) {
  const pct = Math.round((dpr.overallScore ?? dpr.score ?? 0));
  const riskClass = (dpr.riskLevel || dpr.risk || 'low').toLowerCase();

  return (
    <div className={`card dpr-card ${riskClass}`}> 
      <div className="card-top">
        <div className="file-name">{dpr.title || dpr.filename}</div>
        <div className="score">{pct}%</div>
      </div>
      <div className="card-body">
        <div className="meta">{dpr.site} • {dpr.author} • <small className="muted">{dpr.date}</small></div>
        <div className="risk">Decision: <strong style={{ textTransform: 'capitalize' }}>{dpr.decision || 'review'}</strong></div>
        <p className="feedback">{(dpr.feedback && dpr.feedback[0]) || dpr.feedback || 'No quick feedback'}</p>
      </div>
      <div className="card-actions">
        <button className="btn" onClick={() => onView && onView(dpr)}>View</button>
        <button className="btn ghost">Feedback</button>
      </div>
    </div>
  );
}
