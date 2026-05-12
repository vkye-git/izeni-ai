const systemPrompt =
require('../knowledge/systemPrompt')

const products =
require('../knowledge/products.json')

export default async function handler(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

if (req.method === 'OPTIONS') {
return res.status(200).end()
}

if (req.method !== 'POST') {
return res.status(405).json({
success:false,
message:'Method not allowed'
})
}

try {

const { messages } = req.body

/* PRODUCT KNOWLEDGE */

const productKnowledge =
JSON.stringify(products)

/* FINAL AI MESSAGES */

const finalMessages = [

{
role:'system',
content:systemPrompt
},

{
role:'system',
content:`

Available Banking Knowledge:

${productKnowledge}

Instructions:
- Use this banking knowledge intelligently
- Recommend contextually
- Do not dump all products together
- Keep responses concise
- Ask only ONE meaningful next question
- Avoid long paragraphs
- Sound premium and conversational

`
},

...(messages || [])

]

/* CLOUDFLARE AI CALL */

const response = await fetch(

`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct-fast`,

{
method:'POST',

headers:{
'Authorization':
`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
'Content-Type':'application/json'
},

body:JSON.stringify({
messages:finalMessages,
max_tokens:180,
temperature:0.7
})

}

)

const data = await response.json()

console.log('CLOUDFLARE RESPONSE:', data)

if(!response.ok){

return res.status(500).json({
success:false,
errors:[{
message:
data.errors?.[0]?.message ||
'AI request failed'
}]
})

}

return res.status(200).json({
success:true,
result:{
response:
data.result?.response ||
data.result?.text ||
'I could not generate a response.'
}
})

}catch(error){

console.log('SERVER ERROR:', error)

return res.status(500).json({
success:false,
errors:[{
message:error.message
}]
})

}

}
