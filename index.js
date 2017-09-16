var Alexa = require('alexa-sdk');
const states = [
  "NONE",
  "CONFIRM_REQUEST_MEDICINE",
  "CONFIRM_MEDICINE",
  "CONFIRM_PAYMENT_METHOD"
];
var currentState = "NONE";
var recheckMsg = "I am going to check on you again in 2 hours. If you don't feel better, I will call your husband or the doctor for you.";
var handlers = {
    'LaunchRequest': function () {
      currentState = "NONE";
      this.emit(":ask", "Dora, how are you and how was the tea party last night?");
      console.log("current state is " + currentState);
    },
    'AMAZON.YesIntent': function() {
      switch(currentState) {
        case "CONFIRM_REQUEST_MEDICINE" :
          this.emit("ConfirmMedicineIntent");
          break;
        case "CONFIRM_MEDICINE":
          this.emit('PaymentOptionIntent');
          break;
        case "CONFIRM_PAYMENT_METHOD":
          this.emit("ConfirmAccountAmount");
          break;
        default:
          break;
      }
    },
    'AMAZON.NoIntent': function() {
      switch(currentState) {
        case "CONFIRM_REQUEST_MEDICINE" :
          currentState = "NONE";
          this.emit(":tell", "Well.. hope you get better soon! " + recheckMsg);
          break;
        case "CONFIRM_MEDICINE":
          currentState = "NONE";
          this.emit(":tell", "Fine. Take some rest." + recheckMsg);
          break;
        case "CONFIRM_PAYMENT_METHOD":
          currentState = "NONE";
          this.emit(":tell", "Fine. then keep 50 Francs handy. Your medicine will be delivered to your door in about 20 minutes." + recheckMsg);
          break;
        default:
          break;
      }
    },
    'OrderAspirinIntent': function() {
      currentState = "CONFIRM_REQUEST_MEDICINE";
      this.emit(":ask", "I have already ordered it twice this week. Are you sure that you want to order more and remove"
      + " rum from your shopping list?");
      console.log("current state is " + currentState);
    },
    'ConfirmMedicineIntent': function() {
      currentState = "CONFIRM_MEDICINE";
      this.emit(":ask", "Let me check which pharmarcy can deliver it today. By the way, my name is Smarty, not smarty-pants. May I suggest ibuprofen?");
      console.log("current state is " + currentState);
    },
    'PaymentOptionIntent': function() {
      currentState = "CONFIRM_PAYMENT_METHOD";
      this.emit(":ask", "I have ordered it, would you like to pay in advance using your bank account ?");
      console.log("current state is " + currentState);
    },
    'ConfirmAccountAmount': function() {
        currentState = "NONE";
        this.emit(":tell", "Okay, the  current account balance is 1500 CHF after this payment. Your medicine will be delivered to your door in about 20 minutes." + recheckMsg);
        console.log("current state is " + currentState);
    }
};


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
