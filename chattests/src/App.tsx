import { useState } from "react";
import "./App.css";

export default function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [message, setMessage] = useState(null);
  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
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

  console.log(message);
  return (
    <div>
      <section style={{ display: "flex", flexDirection: "row" }}>
        <textarea
          style={{ minWidth: 250 }}
          cols={30}
          rows={19}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <section
          style={{
            minWidth: 250,
            marginLeft: 50,
            padding: 10,
            height: 300,
            backgroundColor: "white",
            border: "3px solid white",
            color: "black",
          }}
        >
          <p style={{ color: "black" }}>{message?.content ?? ""}</p>
        </section>
      </section>
      <button
        style={{
          background: "red",
          color: "white",
          height: 100,
          width: 300,
          border: "1px solid white",
          marginTop: 20,
        }}
        onClick={getMessages}
      >
        Click
      </button>
    </div>
  );
}
