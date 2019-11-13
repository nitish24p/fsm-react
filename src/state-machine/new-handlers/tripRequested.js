import { states } from './../state-constants';
const TripRequested = {
  onEvent(event, StateMachine, stateUpdateCallback) {
    console.log('got event', event);
    stateUpdateCallback(() => ({ loading: true }));
    this.requestTrip(event.id)
      .then(data => {
        // Transition to Next state
        console.log(data);
        stateUpdateCallback(() => ({ loading: false }));
        StateMachine.transitionToNextState(states.PAYMENT_REQUESTED);
      })
      .catch(error => {
        // Display error
      });
  },

  requestTrip(tripId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(tripId);
      }, 500);
    });
  },

  onMessage() {}
};

export default TripRequested;
