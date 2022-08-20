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

function sendWikiarticle (articleUrl){
  // send wiki url to the chat
  //  bot.api.sendMessage('-1001616695538', 'Веталь зайка');
  //  bot.api.sendMessage('-1001616695538', articleUrl);
  app.telegram.sendMessage('-1001616695538', articleUrl);
};

schedule.scheduleJob('11 * * * * *', async function(){
   let article = await getArticle();
  //  let pageid = await getArticle().data.query.pages;
    var pageid = Object.keys(article.data.query.pages)[0]
    console.log(pageid);
    let articleURL = `https://en.wikipedia.org/wiki?curid=${pageid}`;
    console.log(articleURL);
    sendWikiarticle (articleURL);
});


// axios
//   .get('https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json')
getArticle()
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    //console.log(res);
  })
  .catch(error => {
    console.error(error);
  });

// getPage()
//   .then(res => {
//     console.log(`statusCode: ${res.status}`);
//     //console.log(res);
//   })
//   .catch(error => {
//     console.error(error);
//   });

function sendWikiarticle (articleUrl){
  // send wiki url to the chat
  //  bot.api.sendMessage('-1001616695538', 'Веталь зайка');
  //  bot.api.sendMessage('-1001616695538', articleUrl);
  app.telegram.sendMessage('-1001616695538', articleUrl);
};

// scheduleWiki()
// .then(res => {
//     console.log(res);
//   })
// .catch(error => {
//     console.error(error);
//   });
