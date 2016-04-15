"use strict";

// WebUI
const express = require('express')
    , app = express();

const token = process.env.TOKEN
    , Slack = require('slack-node')
    , slack = new Slack(token);

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/get', (req, res) => {
  slack.api('users.admin.invite', {email: req.query.email, set_active: 'true'});
  res.send('ok');
});

// routers
app.use('/', express.static('./public', {maxAge: 3600 * 1000}));
app.listen(3000);
