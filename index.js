console.log(`Let's see what we get!`);

const Twit = require('twit');
const config = require('./config.js');
const say = require('say');
const Sentiment = require('sentiment');
const player = require('play-sound')(opts = {});

const T = new Twit(config);

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
    if (result.score <= 0 && result.score >= -1) {
      return './assets/gulls.wav';
    } else if (result.score < -1 && result.score >= -2) {
      return './assets/flamingo.wav';
    } else if (result.score < -2 && result.score >= -3) {
      return './assets/magpie.wav';
    } else if (result.score < -3 && result.score >= -4) {
      return './assets/raven.wav';
    } else if (result.score < -4 && result.score > -5) {
      return './assets/owl.wav';
    } else if (result.score > 0 && result.score <= 1) {
      return './assets/robin.wav';
    } else if (result.score > 1 && result.score <= 2) {
      return './assets/tui.wav';
    } else if (result.score > 2 && result.score <= 3) {
      return './assets/kookaburra.wav';
    } else if (result.score > 3 && result.score <= 4) {
      return './assets/fluiter.wav';
    } else {
      return './assets/rooster.wav';
    }
  }
  player.play(sing(song), {afplay: ['-v', 0.2]}, function(err) {
    if (err) throw err;
  });
  const twit = (tweet.user.screen_name + tweet.text);
  function talk(twit) {
    rand = Math.random();
    if (rand < 0.1) {
      console.log(twit);
      return twit;
    } else {
      console.log('tweet skipped');
    }
  }
  function rando(vox) {
    rand = Math.random();
    if (rand <= 0.2) {
      return 'Alex';
    } else if (rand > 0.2 && rand <= 0.4) {
      return 'Daniel';
    } else if (rand > 0.4 && rand <= 0.6) {
      return 'Fiona';
    } else if (rand > 0.4 && rand <= 0.8) {
      return 'Fred';
    } else {
      return 'Karen';
    }
  }
  const vox = ['Alex', 'Daniel', 'Fiona', 'Fred', 'Karen'];
  say.speak(talk(twit), rando(vox));
});
