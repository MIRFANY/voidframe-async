import React, { useState } from "react";

const AnalyzeDPR = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dpr/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dprText: text }),
      });
      const data = await response.json();
      setResult(data.analysis);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">DPR Text Analysis</h1>
      <textarea
        className="w-full border p-3 rounded mb-4"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste DPR text here..."
      />
      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AnalyzeDPR;
