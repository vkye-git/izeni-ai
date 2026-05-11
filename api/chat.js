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
'https://api-inference.huggingface.co/models/google/flan-t5-large',
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

/* READ RAW TEXT FIRST */

const rawText = await response.text()

console.log(rawText)

/* TRY PARSE JSON */

let data

try{

data = JSON.parse(rawText)

}catch(parseError){

return res.status(500).json({

error:{
message:rawText
}

})

}

return res.status(200).json(data)

} catch(error){

return res.status(500).json({

error:{
message:error.message
}

})

}

}
