import React, { useState } from 'react';
import api from '../services/api';

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');
    const form = new FormData();
    form.append('file', file);
    form.append('title', title || file.name);

    try {
      setLoading(true);
      const res = await api.uploadDpr(form);
      onUpload && onUpload(res.data);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="upload-form card" onSubmit={submit} encType="multipart/form-data">
      <h3>Upload DPR (PDF)</h3>
      <label>Title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Optional title" /></label>
      <label>PDF file<input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} /></label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload & Analyze'}</button>
        <small className="muted">Uploads the PDF to backend for text extraction and risk prediction.</small>
      </div>
    </form>
  );
}
