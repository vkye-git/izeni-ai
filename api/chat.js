module.exports = async function(req, res) {

/* CORS */

res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

if(req.method === 'OPTIONS'){
return res.status(200).end()
}

try {

const userMessage =
req.body.messages[req.body.messages.length - 1].content

const response = await fetch(
'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
{
method:'POST',

headers:{
'Content-Type':'application/json',
'Authorization':`Bearer ${process.env.HF_TOKEN}`
},

body:JSON.stringify({
inputs:userMessage
})

}
)

const data = await response.json()

return res.status(200).json(data)

} catch(error){

console.log(error)

return res.status(500).json({

error:{
message:error.message
}

})

}

}
