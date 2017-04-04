'use strict';

var router = require('express').Router();
let User = require('./users/user.model');

router.use('/', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

router.post('/login', function(req, res, next){
  const { email, password } = req.body;
  console.log('received userdata is',email,password, 'reqbody is',req.body);
  User.findOne({
    where: {email, password}
  })
  .then(user=>{
    console.log('db response is',user);
    if(user){
      req.session.userId=user.id

      res.sendStatus(204);
    } else{
      res.status(401).send();
    }

  })
  .catch(next)
})

module.exports = router;
