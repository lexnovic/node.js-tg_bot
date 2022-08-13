const axios = require('axios');
const schedule = require('node-schedule');
var bb = require('bot-brother');
var bot = bb({
  key: '<5487670851:AAFmujPmEDc6D9YvTySXUedHsbCkq3Ls1sc',
  sessionManager: bb.sessionManager.memory(),
});

// axios
//   .get('https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json')
getArticle()
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });

async function getArticle() {
    let article = await axios.get('https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json')
    console.log (article);
    return article;
};

function sendWikiarticle (articleUrl){
    bot.api.sendMessage('-1001616695538', 'Веталь зайка');
    bot.api.sendMessage('-1001616695538', articleUrl);
};

async function scheduleWiki(){
schedule.scheduleJob('11 * * * * *', async function(){
    let article = await getArticle();
    let pageid = await getArticle().data.query.pages;
    console.log(pageid);
    let articleURL = `https://en.wikipedia.org/wiki?curid=${article.pageid}`;
    console.log(articleURL);
    sendWikiarticle (articleURL);
  })
};

// scheduleWiki()
// .then(res => {
//     console.log(res);
//   })
// .catch(error => {
//     console.error(error);
//   });