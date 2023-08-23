// import { ClientOptions, OpenAI } from "openai";
// import Configuration from "openai";
import "./App.css";

function App() {
  const express = require("express");
  const app = express();
  app.use(express.json());

  const API_KEY = "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";

  app.post("/completions", async (req, res) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", cnotent: "How are you?" }],
        max_tokens: 100,
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  });

  // const openai = new OpenAI<ClientOptions>(
  //   new Configuration({
  //     apiKey: process.env.API_KEY,
  //   })
  // );

  // openai.chat.completions
  //   .create({
  //     model: "gpt-4",
  //     messages: [{ role: "user", content: "Hello" }],
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "hello how are you?",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <section>
        <button
          style={{
            background: "red",
            color: "white",
            height: 100,
            width: 300,
            border: "1px solid white",
          }}
          onClick={getMessages}
        >
          Click
        </button>
      </section>
    </div>
  );
}

export default App;
