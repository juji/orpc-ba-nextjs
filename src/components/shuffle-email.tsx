"use client";

import { useState } from "react";
import { typedClient } from "@/lib/orpc/client";

export default function ShuffleEmail() {
  const [shuffledResult, setShuffledResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const shuffleUserEmail = async () => {
    setLoading(true);
    try {
      const result = await typedClient.shuffleEmail({});
      setShuffledResult(
        `Original: ${result.originalEmail}\nShuffled: ${result.shuffledEmail}`,
      );
    } catch (error) {
      setShuffledResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
        Shuffle My Email
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Click the button to shuffle the characters in your authenticated email
        address. You must be signed in to use this feature. Check the network
        tab in the developer panel to see the request.
      </p>

      <button
        type="button"
        onClick={shuffleUserEmail}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium transition-colors"
      >
        {loading ? "Shuffling..." : "Shuffle Email"}
      </button>

      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 text-center">
        POST /rpc/shuffle-email
      </p>

      {shuffledResult && (
        <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-md">
          <pre className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-mono">
            {shuffledResult}
          </pre>
        </div>
      )}
    </div>
  );
}
