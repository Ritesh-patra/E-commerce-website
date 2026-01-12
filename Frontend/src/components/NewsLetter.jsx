import React, { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Successfully Subscribed!");
        setEmail("");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("❌ Something went wrong!");
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-xl mx-auto text-center flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">
          Subscribe now & get 20% off
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <form
          className="w-full flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 my-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="w-full outline-none px-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-black text-white text-xs py-3 px-6 rounded-full hover:opacity-80 transition"
          >
            SUBSCRIBE
          </button>
        </form>

        {message && (
          <p className="text-sm font-medium text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}
