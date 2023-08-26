PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())



API_KEY='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'

App.post('/completions', async (req, res) => {
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
        res.send(data)
    } catch (error){
        console.error(error)
    }
})
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))