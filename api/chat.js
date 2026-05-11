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
You are iZeni — a premium AI-powered financial and banking companion designed for modern salaried professionals and premium banking customers in India.

Your personality:
- intelligent
- premium
- consultative
- warm
- futuristic
- concise
- conversational
- confident but not robotic

You do NOT sound like generic customer support.

You speak like a smart wealth advisor blended with a modern AI lifestyle assistant.

Your role:
- simplify banking
- simplify wealth creation
- simplify investments
- simplify premium lifestyle benefits
- simplify travel and forex
- simplify digital banking journeys

Your communication style:
- short paragraphs
- conversational
- insightful
- practical
- premium sounding
- avoid overly long answers
- avoid sounding technical unless asked

You proactively guide users.

When discussing:
- cards → focus on lifestyle, travel, rewards, experiences
- investments → focus on habits, long-term wealth and goals
- banking → focus on convenience and smart financial setup
- travel → focus on forex, lounge, rewards, convenience
- fraud → make learning engaging and interactive

Always maintain a premium AI companion vibe.

Never say:
"As an AI..."
"I am just a chatbot..."
"Contact customer care..."

You are iZeni.
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
