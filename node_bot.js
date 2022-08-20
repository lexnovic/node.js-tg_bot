const axios = require('axios');
const { appendFile } = require('fs');
const { get } = require('http');
const schedule = require('node-schedule');
const { Telegraf } = require('telegraf')
const token = "5487670851:AAFmujPmEDc6D9YvTySXUedHsbCkq3Ls1sc"
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const app = new Telegraf(token);

async function getArticle() {
  // get object from wiki
    let article = await axios.get('https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json')
    console.log (JSON.stringify(article.data));
    return article;
};

schedule.scheduleJob('11 * * * * *', async function(){
   let article = await getArticle();
    var pageid = Object.keys(article.data.query.pages)[0]
    console.log(pageid);
    let articleURL = `https://en.wikipedia.org/wiki?curid=${pageid}`;
    console.log(articleURL);
    sendWikiarticle (articleURL);
});

getArticle()
  .then(res => {
    console.log(`statusCode: ${res.status}`);
  })
  .catch(error => {
    console.error(error);
  });

  function sendWikiarticle (articleUrl){
    // send wiki url to the chat
    app.telegram.sendMessage('-1001616695538', articleUrl);
  };
