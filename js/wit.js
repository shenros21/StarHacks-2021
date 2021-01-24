const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

function getWitRes (query) {
  const q = encodeURIComponent(query);
  const uri = 'https://api.wit.ai/message?v=20200902&q=' + q;
  const auth = 'Bearer ' + process.env.WIT_TOKEN;
  return new Promise ((resolve, reject) => {
    fetch(uri, {headers: {Authorization: auth}})
    .then(res => res = res.json())
    .then(res => {
      //console.log(res);
      resolve(res);
    })
    .catch(err => reject(err));
  });
}

async function botResponds (query) {
  let botRes = await getWitRes(query);
  console.log(botRes);
  //console.log(botRes.entities["meal:meal"][0].value);
  //console.log(botRes.entities["want_suggestions:want_suggestions"][0].entities);
  if (botRes.intents[0]) {
    getResponse(botRes);
  } else {
    console.log("Sorry, I didn't get that. Ask me for meal suggestions, like 'What can I make with potatoes and chicken in less than 20 minutes?'");
  }
}
