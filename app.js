const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/' , function(req, res){
   res.send('hello world');
});

app.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});