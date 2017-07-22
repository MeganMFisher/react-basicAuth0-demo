const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      config = require('./config.js'),
      cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'alsdkjflkjsdfjksdf'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('../app/src'));


passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
//    var db = app.get('db')
//     //Find user in database
//     db.getUserByAuthId(profile.id).then(function (user) {
//       user = user[0];
//       if (!user) { //if there isn't one, we'll create one!
//         console.log('CREATING USER');
//         db.createUserByAuth([profile.displayName, profile.id]).then(function             (user) {
//           console.log('USER CREATED', user);
//           return done(null, user[0]); // GOES TO SERIALIZE USER
//         })
//       } else { //when we find the user, return it
//         console.log('FOUND USER', user);
//         return done(null, user);
//       }
//     })
//   }
        return done(null, profile);
    })
);

passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: 'http://localhost:4014/'}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('http://localhost:4014/');
})

app.post('/posting', function(req, res) {
  req.user.submitted = req.body.data
  res.send(req.user.submitted)
})

app.listen(config.port, function() {
  console.log('Connected on ' + config.port)
})