import { useState } from "react";
import "./App.css";
import openai from "openai";
import { CopyBlock } from "react-code-blocks";

export default function App({ text }) {
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
          style={{ minWidth: 250, flex: 1, padding: 20 }}
          cols={30}
          rows={19}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <section
          style={{
            flex: 1,
            marginLeft: 50,
            minWidth: 250,
            height: "auto",
            backgroundColor: "white",
            border: "3px solid white",
            color: "black",
          }}
        >
          <p style={{textAlign: 'left'}}><CopyBlock
            language={"javascript"}
            text={message?.content ?? ""}
            theme
            codeBlock
            {...message?.content ?? ''}
          />
          </p>
        </section>
      </section>
    </div>
  );
}
