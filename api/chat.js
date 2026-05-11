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
'https://router.huggingface.co/hf-inference/models/google/gemma-2-2b-it',
{
method:'POST',

headers:{
'Authorization':`Bearer ${process.env.HF_TOKEN}`,
'Content-Type':'application/json'
},

body:JSON.stringify({
inputs:userMessage
})

}
)

const data = await response.json()

return res.status(200).json(data)

} catch(error){

return res.status(500).json({

error:{
message:error.message
}

})

}

}
