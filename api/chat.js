export default async function handler(req, res) {

try {

const response = await fetch(
'https://api.openai.com/v1/chat/completions',
{
method:'POST',

headers:{
'Content-Type':'application/json',
'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
},

body:JSON.stringify({

model:'gpt-4.1-mini',

messages:req.body.messages,

temperature:0.7

})

}
)

const data = await response.json()

res.status(200).json(data)

} catch(error){

res.status(500).json({
error:'Server error'
})

}

}
