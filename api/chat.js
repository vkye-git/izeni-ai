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
`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
{
method:'POST',

headers:{
'Authorization':`Bearer ${process.env.CF_API_TOKEN}`,
'Content-Type':'application/json'
},

body:JSON.stringify({

messages:[
{
role:'system',
content:`
You are iZeni, a premium AI-powered banking companion.

Tone:
- premium
- intelligent
- warm
- concise

Help users with:
- banking
- wealth
- investments
- premium cards
- travel
- digital banking
`
},
{
role:'user',
content:userMessage
}
]

})

}
)

const data = await response.json()

console.log(data)

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
