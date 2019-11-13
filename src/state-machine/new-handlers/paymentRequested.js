import { states } from './../state-constants';

const PaymentRequested = {
  onEvent: function(event, StateMachine, stateUpdateCallback) {
    alert(' Getting your payment details ');
    this.getPayments().then(value => {
      if (value) {
        StateMachine.transitionToNextState(states.DRIVER_ASSIGNED);
      } else {
        StateMachine.transitionToNextState(states.TRIP_REQUESTED);
      }
    });
  },
  getPayments: function() {
    return new Promise(resolve => {
      setTimeout(() => {
        const rand = Math.random();
        if (rand > 0.2) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
};

export default PaymentRequested;
