const systemPrompt =
require('../knowledge/systemPrompt')

const products =
require('../knowledge/products.json')

module.exports = async function handler(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

if (req.method === 'OPTIONS') {
return res.status(200).end()
}

if (req.method !== 'POST') {
return res.status(405).json({
success:false
})
}

try {

const { messages } = req.body

const productKnowledge =
JSON.stringify(products)

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
- Keep responses concise
- Ask only ONE meaningful question at a time
- Sound premium and conversational
- Recommend contextually
- Avoid long paragraphs
- Continue conversation naturally

`
},

...(messages || [])

]

const response = await fetch(
'https://api.groq.com/openai/v1/chat/completions',
{
method:'POST',

headers:{
'Authorization':
`Bearer ${process.env.GROQ_API_KEY}`,
'Content-Type':'application/json'
},

body:JSON.stringify({

model:'llama-3.1-8b-instant',

messages:finalMessages,

temperature:0.7,

max_tokens:180

})

}
)

const data = await response.json()

console.log(
'GROQ RESPONSE:',
JSON.stringify(data, null, 2)
)

/* HANDLE API ERRORS */

if(data.error){

return res.status(500).json({
success:false,
errors:[{
message:data.error.message
}]
})

}

/* SUCCESS RESPONSE */

return res.status(200).json({
success:true,
result:{
response:
data?.choices?.[0]?.message?.content ||
data?.choices?.[0]?.text ||
'No response generated.'
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
