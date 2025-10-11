import React, { useState } from "react";

const DPRAnalyzer = () => {
  const [dprText, setDprText] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [duration, setDuration] = useState("");
  const [manpower, setManpower] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle DPR analysis request
  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const body = {
        dprText,
        structuredFields: {
          Estimated_Cost: estimatedCost,
          Duration: duration,
          Manpower: manpower,
        },
      };

      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error || "Analysis failed.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🧠 DPR AI Analysis Console
      </h2>

      {/* DPR Input */}
      <textarea
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
        rows="8"
        placeholder="Paste your DPR text here..."
        value={dprText}
        onChange={(e) => setDprText(e.target.value)}
      ></textarea>

      {/* Structured Fields */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <input
          type="number"
          placeholder="Estimated Cost"
          value={estimatedCost}
          onChange={(e) => setEstimatedCost(e.target.value)}
          className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
        />
        <input
          type="number"
          placeholder="Duration (months)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
        />
        <input
          type="number"
          placeholder="Manpower"
          value={manpower}
          onChange={(e) => setManpower(e.target.value)}
          className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
        />
      </div>

      {/* Analyze Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleAnalyze}
          disabled={loading || !dprText}
          className={`px-6 py-2 rounded-xl font-semibold ${
            loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Analyzing..." : "Run AI Analysis"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-400 text-center">
          ⚠️ {error}
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-8 bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-blue-300">
            ✅ AI Analysis Results
          </h3>

          <div className="space-y-4">
            {analysis.issues && (
              <div>
                <h4 className="font-semibold text-orange-400">Issues / Corrections:</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {analysis.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.feasibility_insights && (
              <div>
                <h4 className="font-semibold text-green-400">Technical Feasibility Insights:</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {analysis.feasibility_insights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.suggestions && (
              <div>
                <h4 className="font-semibold text-blue-400">Improvement Suggestions:</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {analysis.suggestions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DPRAnalyzer;
