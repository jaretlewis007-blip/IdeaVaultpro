"use client";

import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NDAGenerator() {
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [generatedNDA, setGeneratedNDA] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNDA = () => {
    const template = `
      NON-DISCLOSURE AGREEMENT (NDA)

      This agreement is made between the Creator and ${recipientName} (${recipientEmail}).

      Description of Idea:
      ${ideaDescription}

      Terms:
      - Recipient agrees not to share, copy, or disclose this idea.
      - All intellectual property remains with the Creator.
      - Violation of this agreement may result in legal action.

      Signed electronically via IdeaVault.
      Date: ${new Date().toLocaleDateString()}
    `;
    setGeneratedNDA(template);
  };

  const saveNDA = async () => {
    if (!generatedNDA) {
      alert("Generate the NDA first.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "ndas"), {
        recipientName,
        recipientEmail,
        ideaDescription,
        ndaText: generatedNDA,
        createdAt: serverTimestamp(),
      });

      alert("NDA saved successfully!");
    } catch (err) {
      console.error("Failed to save NDA:", err);
      alert("Error saving NDA.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">NDA Generator</h1>

      <div className="space-y-5 max-w-2xl">
        <input
          type="text"
          placeholder="Recipient Name"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Recipient Email"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />

        <textarea
          placeholder="Describe your idea..."
          className="w-full p-3 h-32 rounded bg-gray-800 border border-gray-700"
          value={ideaDescription}
          onChange={(e) => setIdeaDescription(e.target.value)}
        />

        <button
          onClick={generateNDA}
          className="bg-yellow-500 px-4 py-2 rounded font-bold hover:bg-yellow-600"
        >
          Generate NDA
        </button>

        {generatedNDA && (
          <div className="bg-gray-900 border border-gray-700 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              Generated NDA
            </h2>
            <pre className="whitespace-pre-wrap text-gray-300">
              {generatedNDA}
            </pre>

            <button
              onClick={saveNDA}
              disabled={loading}
              className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? "Saving..." : "Save NDA"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

