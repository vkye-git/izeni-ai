export default async function handler(req, res) {

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
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.Gemini_API_Key}`,
{
method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({

contents:[
{
parts:[
{
text:userMessage
}
]
}
]

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
