// backend/services/genaiService.js
// Generic GenAI API integration (no OpenAI SDK)

import axios from "axios";

const GENAI_API_URL = process.env.GENAI_API_URL;   // Example: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
const GENAI_API_KEY = process.env.GENAI_API_KEY;   // e.g. Gemini API key or your local model token

/**
 * Analyze DPR content using your configured GenAI API
 * @param {string} dprText - The DPR text content
 * @param {object} structuredFields - Extra project data
 * @returns {object} JSON result (issues, feasibility_insights, suggestions)
 */
export async function analyzeDPR(dprText, structuredFields = {}) {
  const prompt = `
You are a DPR evaluation assistant. Analyze the following DPR text and fields.
Return output in strict JSON format with keys:
- issues
- feasibility_insights
- suggestions

DPR Text:
${dprText}

Project Fields:
${JSON.stringify(structuredFields)}
`;

  try {
    // ===== EXAMPLE 1: Google Gemini =====
    const resp = await axios.post(
      `${GENAI_API_URL}?key=${GENAI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ "text": prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // For Gemini-like API response
    const modelResponse = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let parsed;
    try {
      parsed = JSON.parse(modelResponse);
    } catch {
      parsed = { raw: modelResponse };
    }

    return parsed;
  } catch (error) {
    console.error("GenAI API Error:", error.response?.data || error.message);
    throw new Error("GenAI API call failed");
  }
}