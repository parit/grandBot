var Alexa = require('alexa-sdk');
const states = [
  "_NONE",
  "_CONFIRM_REQUEST_MEDICINE",
  "_CONFIRM_MEDICINE",
  "_CONFIRM_PAYMENT_METHOD"
];
var recheckMsg = "I am going to check on you again in 2 hours. If you don't feel better, I will call your husband or the doctor for you.";

var confirmRequestMedicineHandlers = Alexa.CreateStateHandler("_CONFIRM_REQUEST_MEDICINE", {
    'AMAZON.YesIntent': function() {
        console.log("Got into yes and no intent");
        this.emitWithState("ConfirmMedicineIntent");
    },
    'ConfirmMedicineIntent': function() {
      this.handler.state = "_CONFIRM_MEDICINE";
      console.log("current state is " + this.handler.state);
      this.emit(":ask", "Let me check which pharmacy can deliver it today. By the way, my name is Smarty, not smarty-pants. May I suggest ibuprofen?");
    },
    'AMAZON.NoIntent': function() {
      this.handler.state = "NONE";
      this.emit(":tell", "Well.. hope you get better soon! " + recheckMsg);
    },
    'Unhandled': function() {
      console.log("Can't understand user input " + this.handler.state);
      this.emit(":ask", "Sorry Doora, I didn't understand you could you say that again");
    }
});

var confirmMedicineHandlers = Alexa.CreateStateHandler("_CONFIRM_MEDICINE", {
    'AMAZON.YesIntent': function() {
        this.emitWithState("PaymentOptionIntent");
    },
    'PaymentOptionIntent': function() {
      this.handler.state = "_CONFIRM_PAYMENT_METHOD";
      console.log("current state is " + this.handler.state);
      this.emit(":ask", "I have ordered it, would you like to pay in advance using your bank account ?");
    },
    'AMAZON.NoIntent': function() {
      this.handler.state = "NONE";
      this.emit(":tell", "Fine. Take some rest." + recheckMsg);
    },
    'Unhandled': function() {
      console.log("Can't understand user input " + this.handler.state);
      this.emit(":ask", "Sorry Doora, I didn't understand you could you say that again");
    }
});


var confirmPaymentMethods = Alexa.CreateStateHandler("_CONFIRM_PAYMENT_METHOD", {
    'AMAZON.YesIntent': function() {
        this.emitWithState("ConfirmAccountAmount");
    },
    'ConfirmAccountAmount': function() {
        this.handler.state = "NONE";
        console.log("current state is " + this.handler.state);
        this.emit(":tell", "Okay, the  current account balance is 1500 CHF after this payment. Your medicine will be delivered to your door in about 20 minutes." + recheckMsg);
    },
    'AMAZON.NoIntent': function() {
      this.handler.state = "NONE";
      this.emit(":tell", "Fine. then keep 50 Francs handy. Your medicine will be delivered to your door in about 20 minutes." + recheckMsg);
    },
    'Unhandled': function() {
      console.log("Can't understand user input " + this.handler.state);
      this.emit(":ask", "Sorry Doora, I didn't understand you could you say that again");
    }
});

var noneHandlers = Alexa.CreateStateHandler("_NONE", {
  'OrderAspirinIntent': function() {
    this.handler.state = "_CONFIRM_REQUEST_MEDICINE";
    this.emit(":ask", "I have already ordered it twice this week. Are you sure that you want to order more and remove"
    + " rum from your shopping list?");
    console.log("current state is " + this.handler.state);
  },
  'Unhandled': function() {
    console.log("Can't understand user input " + this.handler.state);
    this.emit(":ask", "Sorry Doora, I didn't understand you could you say that again");
  }
});


var handlers = {
    'LaunchRequest': function () {
      this.handler.state = "_NONE";
      this.emit(":ask", 'Dora, <break time="5s"/> how are you and how was the tea party last night?');
      console.log("current state is " + this.handler.state);
    },
    'Unhandled': function() {
      console.log("Can't understand user input " + this.handler.state);
      this.emit(":ask", "Sorry Doora, I didn't understand you could you say that again");
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(confirmRequestMedicineHandlers, confirmMedicineHandlers, confirmPaymentMethods, noneHandlers, handlers);
    alexa.execute();
};
