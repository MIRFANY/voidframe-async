import React from 'react';

// Simple language selector. In a full app this would wire into i18n and persist selection.
export default function LanguageSelector() {
  const [lang, setLang] = React.useState('en');

  return (
    <select value={lang} onChange={e => setLang(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
      <option value="en">English</option>
      <option value="bn">Bangla (Bengali)</option>
      <option value="hi">Hindi</option>
      <option value="as">Assamese</option>
    </select>
  );
}
