const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = {
  id: 1,
  username: 'rikushiru',
  password: 'password'
};

// setup passport
passport.use(new LocalStrategy((username, password, done) => {
  if (username === user.username && password === user.password) {
    return done(null, user);
  }
  done(null, false, { message: 'ログインできませんでした。' });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // XXX: lookup user by id
  done(null, user);
});

const PORT = process.env.PORT || 8080;
const app = express();

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'fuga',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 10 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/' , function(req, res){
   res.sendFile(__dirname+'/index.html');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/ok',
                                   failureRedirect: '/failed'}));

app.get('/ok', function(req,res){
	res.send('ok');
});

app.get('/failed', function(req,res){
	res.send('failed');
});

app.get('/logout', function(req, res){
  req.logout();
  res.send('Good bye!<a href="/">back</a>');
});


app.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});