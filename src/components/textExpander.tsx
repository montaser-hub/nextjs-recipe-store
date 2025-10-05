"use client";
import { useState } from "react";

interface TextExpanderProps {
  children: React.ReactNode;
}

function TextExpander({ children }: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert children safely to string (if possible)
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
      ? children.join(" ")
      : String(children ?? "");

  // Show limited text when collapsed
  const displayText = isExpanded
    ? text
    : text.split(" ").slice(0, 3).join(" ") +
      (text.split(" ").length > 3 ? "..." : "");

  return (
    <span className="text-gray-800 dark:text-gray-200">
      {displayText}{" "}
      {text.split(" ").length > 3 && (
        <button
          className="text-green-600 border-b border-green-600 hover:text-green-700 ml-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </span>
  );
}

export default TextExpander;
