import { useState } from "react";
import "./App.css";
import openai from "openai";

export default function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [message, setMessage] = useState(null);

  const getMessages = async () => {
    const unitTestPrompt = `I want you to wrap your answer in <code></code> code blocks. Write me component tests using jest. Include edge case scenarios. Here is the file: ${userInput}`;
    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: unitTestPrompt }],
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message);
      console.log(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  // Check if the content has code block
  const hasCodeBlock = content.includes("```");
  if (hasCodeBlock) {
    // If the content has code block, wrap it in a <pre><code> element
    const codeContent = content.replace(
      /```([\s\S]+?)```/g,
      "</p><pre><code>$1</code></pre><p>"
    );
  }

  return (
    <div>
      <button
        style={{
          background: "Green",
          color: "white",
          fontSize: 24,
          padding: "12px 20px",
          border: "1px solid white",
          marginBottom: 20,
        }}
        onClick={getMessages}
      >
        Click To Run Tests
      </button>
      <section style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <textarea
          style={{ minWidth: 550, flex: 1, padding: 20 }}
          cols={30}
          rows={19}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <section
          style={{
            minWidth: 550,
            flex: 1,
            marginLeft: 50,
            padding: 20,
            height: "auto",
            backgroundColor: "white",
            border: "3px solid white",
            color: "black",
          }}
        >
          <pre className="language-jsx">
            <code style={{ textAlign: "left" }}>{hasCodeBlock}</code>
          </pre>
        </section>
      </section>
    </div>
  );
}
