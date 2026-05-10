export default async function handler(req, res) {

/* CORS */

res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

if(req.method === 'OPTIONS'){
return res.status(200).end()
}

try {

const openaiResponse = await fetch(
'https://api.openai.com/v1/chat/completions',
{
method:'POST',

headers:{
'Content-Type':'application/json',
'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
},

body:JSON.stringify({

model:'gpt-4o-mini',

messages:req.body.messages,

temperature:0.7

})

}
)

const data = await openaiResponse.json()

/* RETURN COMPLETE RESPONSE */

return res.status(200).json(data)

} catch(error){

return res.status(500).json({

error:{
message:error.message
}

})

}

}
