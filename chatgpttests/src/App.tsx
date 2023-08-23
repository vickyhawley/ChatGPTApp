import { useState } from "react";
import { config } from 'dotenv';
import "./App.css";
import { Configuration, OpenAIApi } from 'openai';
config()


const openai =new OpenAIApi(new Configuration({
  apikey: process.env.API_KEY
}))

openai.''({
  model: 'gpt-4-turbo',
  messages: [{role: 'user', content: 'hello ChatGPT'}]
}).then(res => {
  console.log(res.data.choices)
})

export default function App() {
  const [userInput, setUserInput] = useState<string>()


  const checkInput () => {
    if(rows == 4){
      //send to Chatgpt wrapped in 'Can you create a test for this?'
    }
  }
  return (
    <div>
      <textarea cols={50} rows={50} style={{ padding: 20 }}>
        {}
      </textarea>

      <div className="chat-test-response">
        {}
      </div>
    </div>
  );
}
