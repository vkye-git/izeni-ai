const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()

app.use(cors())
app.use(express.json())

const OPENAI_API_KEY = "PASTE_YOUR_OPENAI_KEY"

app.post('/chat', async(req,res)=>{

try{

const response = await fetch(
'https://api.openai.com/v1/chat/completions',
{
method:'POST',

headers:{
'Content-Type':'application/json',
'Authorization':`Bearer ${OPENAI_API_KEY}`
},

body:JSON.stringify({

model:'gpt-4.1-mini',

messages:req.body.messages,

temperature:0.7

})

}
)

const data = await response.json()

res.json(data)

}catch(error){

console.log(error)

res.status(500).json({
error:'Server error'
})

}

})

app.listen(3000,()=>{
console.log('Server running on port 3000')
})
