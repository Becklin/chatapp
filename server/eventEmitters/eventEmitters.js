// get the reference of EventEmitter class of events module
var events = require('events');

//create an object of EventEmitter class by using above reference
var em = new events.EventEmitter();

em.on('user_signup', ({ user, company }) => {
    // send email
    console.log("we have sent email to you");
  })