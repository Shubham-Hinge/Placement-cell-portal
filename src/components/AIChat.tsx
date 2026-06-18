"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Improve my resume",
  "Recommend jobs for React Developer",
  "Generate Java interview questions",
  "Create a MERN roadmap",
  "How do I crack TCS?",
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Career Assistant.\n\nI can help you with resumes, interview preparation, career guidance, placement tips and job recommendations.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await fetch(
          `/api/ai/history?userId=${userId}`
        );

        const data = await res.json();

        if (data.success && data.chats.length) {
          setMessages(
            data.chats.map((chat: any) => ({
              role: chat.role,
              content: chat.message,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    }

    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(text?: string) {
    const message = text || input;

    if (!message.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          userId: localStorage.getItem("userId"),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "No response",
        },
      ]);
      async function clearChat() {
  try {
    const userId =
      localStorage.getItem(
        "userId"
      );

    await fetch(
      "/api/ai/clear",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    setMessages([
      {
        role: "assistant",
        content:
          "👋 Chat cleared successfully.\n\nHow can I help you today?",
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

 return (
  <div
    className="
      bg-white
      dark:bg-gray-900
      rounded-2xl
      shadow-xl
      border
      h-[80vh]
      flex
      flex-col
    "
  >
    {/* Header */}
    <div
      className="
        p-5
        border-b
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h1 className="text-2xl font-bold">
          🤖 AI Career Assistant
        </h1>

        <p className="text-gray-500 mt-1">
          Resume • Interview • Career • Placement
        </p>
      </div>

      <button
        onClick={async () => {
          const userId = localStorage.getItem("userId");

          await fetch("/api/ai/clear", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
            }),
          });

          setMessages([
            {
              role: "assistant",
              content:
                "👋 Chat cleared. How can I help you today?",
            },
          ]);
        }}
        className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-4
          py-2
          rounded-lg
          transition
        "
      >
        Clear Chat
      </button>
    </div>

    {/* Suggestions */}
    <div
      className="
        px-5
        py-3
        flex
        flex-wrap
        gap-2
      "
    >
      {suggestions.map((q) => (
        <button
          key={q}
          onClick={() => sendMessage(q)}
          className="
            text-sm
            bg-blue-100
            hover:bg-blue-200
            dark:bg-blue-900
            dark:hover:bg-blue-800
            px-3
            py-2
            rounded-full
            transition
          "
        >
          {q}
        </button>
      ))}
    </div>

    {/* Messages */}
    <div
      className="
        flex-1
        overflow-y-auto
        p-5
        space-y-5
      "
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
  className={`max-w-[80%] rounded-2xl px-5 py-3 overflow-x-auto ${
    message.role === "user"
      ? "bg-blue-600 text-white"
      : "bg-gray-100 dark:bg-gray-800 dark:text-white"
  }`}
>
  {message.role === "assistant" ? (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mb-3">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mb-2">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-3 leading-7">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc ml-6 mb-3">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-6 mb-3">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-1">
            {children}
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-bold">
            {children}
          </strong>
        ),
        code: ({ children }) => (
          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-black text-green-400 p-4 rounded-lg overflow-auto mb-3">
            {children}
          </pre>
        ),
      }}
    >
      {message.content}
    </ReactMarkdown>
  ) : (
    <p className="whitespace-pre-wrap">
      {message.content}
    </p>
  )}
</div>
        </div>
      ))}

      {loading && (
        <div className="text-gray-500">
          🤖 AI is typing...
        </div>
      )}

      <div ref={bottomRef} />
    </div>

    {/* Input */}
    <div
      className="
        border-t
        p-4
        flex
        gap-3
      "
    >
      <input
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        placeholder="Ask anything..."
        className="
          flex-1
          border
          rounded-xl
          px-4
          py-3
          dark:bg-gray-800
          dark:border-gray-700
          dark:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <button
        onClick={() => sendMessage()}
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-blue-400
          text-white
          px-6
          rounded-xl
          transition
        "
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  </div>
);
}