import { states } from './../state-constants';
const TripRequested = {
  onEvent(event, StateMachine, stateUpdateCallback) {
    console.log('got event', event);
    stateUpdateCallback(() => ({ loading: true }));
    return new Promise(resolve => {
      this.requestTrip(event.id)
        .then(data => {
          // Transition to Next state
          console.log(data);
          stateUpdateCallback(() => ({ loading: false }));
          stateUpdateCallback(
            StateMachine.transitionToNextState(states.PAYMENT_REQUESTED)
          );
        })
        .catch(error => {
          // Display error
        });
    });
  },
  beforeTransition(currentState, nextState, stateMachine) {
    console.log('About to transition from ' + currentState, nextState);
  },
  requestTrip(tripId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(tripId);
      }, 500);
    });
  }
};

export default TripRequested;
