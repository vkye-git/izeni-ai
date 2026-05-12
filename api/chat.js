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

const {
messages,
leadData
} = req.body

/* SEND LEAD TO GOOGLE SHEET */

if(leadData){

try{

await fetch(
process.env.GOOGLE_SHEET_WEBHOOK,
{
method:'POST',
}
