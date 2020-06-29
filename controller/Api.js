const express = require('express');
const Twit = require('twit');
const keys=require("../config/keys");
const Sentiment= require('sentiment');
const User = require("../model/User");
const passport = require("passport");

const bot =new Twit(keys);
const sentiment =new Sentiment();
const app = express();

module.exports= app=> {
    //GOOGLE OAUTH
app.get('/auth/google',
passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/success' }),
function(req, res) {
  // Successful authentication, redirect to Analyze.
  res.redirect('/analyze');
});
//TWITTER OAUTH
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/success' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/analyze');
    
  });
//GET USER DETAILS
app.get('/current_user', (req, res) => {
res.send(req.user);
});
//GET TWEETS

app.post('/analysis', (req, res) => {
var Twitterdata=[];
  var tweet_sentiment="";
  var OverallScore={"Very_negative":0,"negative":0,"neutral":0,"positive":0,"Very_positive":0}
  bot.get("/search/tweets",{q:'#'+req.body.q,lang:"en",count:1000}, (err, data, response) => {
  
      const tweet=data.statuses;
   
      if (!err) {
        for (const eachTweet of tweet) {
            const result=sentiment.analyze(eachTweet.text)
         
         
       if (result.score <-4) {
         tweet_sentiment="Very negative"
            OverallScore["Very_negative"]+=1
       }
        if (result.score >=-3 && result.score<0){
         tweet_sentiment="negative"
         OverallScore["negative"]+=1
       }
       if (result.score == 0){
        tweet_sentiment="neutral"
        OverallScore["neutral"]+=1
      }
      if (result.score > 0 && result.score <=3){
        tweet_sentiment="positive"
        OverallScore["positive"]+=1
      }
        if (result.score >3 ){
         tweet_sentiment="Very positive"
         OverallScore["Very_positive"]+=1
       } console.log(eachTweet.text,result)
            
Twitterdata.push({
id:eachTweet.id,
tweet:eachTweet.text,
score:result.score,
sentiment:tweet_sentiment
})
    

         
        }
        Twitterdata.push(OverallScore)
        console.log(OverallScore);
        return res.status(200).json(Twitterdata);
        
      
      } else {
          console.log("OOps")
          res.send("OUR BOT IS DOWN PLEASE RESTORE YOUR INTERNET")
      }
    })
  
});

};
