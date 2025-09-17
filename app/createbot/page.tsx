"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBotPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/bots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, avatar }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create bot");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a New Bot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Bot Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Bot"}
        </button>
      </form>
    </div>
  );
}