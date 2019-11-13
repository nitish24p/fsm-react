import { states } from './../state-constants';
const TripRequested = {
  onEvent(event, StateMachine, setState) {
    console.log('got event', event);
    setState(() => ({ loading: true }));
    this.requestTrip(event.id)
      .then(data => {
        // Transition to Next state
        console.log(data);
        setState(() => ({ loading: false }));
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

  onMessage() {},
  onExit(stateMachine, setState) {
    console.log('Inside OnExit');
  }
};

export default TripRequested;
