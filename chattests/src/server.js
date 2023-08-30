PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
import openai from "openai";



API_KEY='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'

App.post('/completions', async (req, res) => {
    const unitTestPrompt = `I have the following file, write me a unit test using jest. Here is the file: ${userInput}`;
  const options = {
    method: 'POST',
    headers: {
      "Authorization" : `Bearer ${API_KEY}`,
      "COntent-Type" : "application/JSON"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: req.body.message}]
    }),
}
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        
        const data = await response.json()
        const completion = await openai.Completion.create({
            model: "text-davinci-003",
            prompt: unitTestPrompt,
            max_tokens: 2018,
            logprobs: 0,
            best_of: 1,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            streaming: true,
          });
          
        res.send(completion.data)
    } catch (error){
        console.error(error)
    }
    
})
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))