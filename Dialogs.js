// Alexa could you tell me how my account balance looks like?
// Sure Doora hold on...
// You currently have a balance of CHG 10000 in your savings account....
// Wait for a minute... I see your money from social services has not been remitted for this month.. Would you like me to send an enquiry about it?
// yes / No
//
// No for now..
// Damn I guess am running out off my back pain pills.. could you order those for me?
// Hi Dorra, we did bought your medicines
// Indeed, lemme find a pharmacy that is open today...
// Okay, I have ordered your medicine, would you like to pay for it from your account or pay in cash on delivery?
// Making your payment...
// your medicines shall be delievered to you in about an hour.

var Alexa = require('alexa-sdk');

var handlers = {

    'HelloWorldIntent': function () {
      // :tell >> session ends after this without waiting for the user to provide more input. but not after :ask
        this.emit(':tell', 'Hello World!');
    }

};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
