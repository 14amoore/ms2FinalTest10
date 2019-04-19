console.log(`Let's see what we get!`);

const Twit = require('twit');
const config = require('./config.js');
const say = require('say');
const Sentiment = require('sentiment');
const player = require('play-sound')(opts = {});


const T = new Twit(config);


// const stream = T.stream('statuses/filter', {
//   follow: ['822215679726100480', '1020930595', '138203134'],
// });

// stream.on('tweet', function(tweet, err) {
//   const talk = tweet.text;
//   say.speak(talk);
// });

// const params = {
//   q: 'AOC',
//   count: 1,
// };

// T.get('search/tweets', params, gotData);


// function gotData(err, data, response) {
//   const texts = data.statuses;
//   let useName = data.user;
//     say.speak(texts.length);
//   for (let s = 0; s < useName.length; s++) {
//     console.log(useName[i].screen_name);

//   // }
//   for (let i = 0; i < texts.length; i++) {
//     console.log(texts[i].text);
//     // console.log(data.screen_name);

//     // say.speak(texts[i].text);
//   };
// }
// // }
const params = ('statuses/filter',
{
  follow: ['822215679726100480', '1020930595', '138203134'],
});

const stream = T.stream('statuses/filter', params, gotData);

function gotData(err, data, response) {
  const texts = data.statuses;
  for (let i = 0; i < texts.length; i++) {
    console.log(texts[i].text);
  }
}

stream.on('tweet', function(tweet, err) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(
      tweet.text
  );
  // console.log(tweet.user.screen_name + tweet.text);
  // // console.dir(result);
  // console.log(result.score);
  const song = result.score;
  function sing(song) {
    if (result.score > 0 && result.score <= 5) {
      return './assets/robin.wav';
    } else {
      return './assets/raven.wav';
    }
  }
  player.play(sing(song), function(err) {
    if (err) throw err;
  });
  const twit = (tweet.user.screen_name + tweet.text);
  function talk(twit) {
    rand = Math.random();
    if (rand < 0.05) {
      console.log(twit);
      return twit;
    } else {
      console.log('tweet skipped');
    }
  }
  say.speak(talk(twit));
});
