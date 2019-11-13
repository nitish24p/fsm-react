import { states } from './../state-constants';

const DriverAssigned = {
  onEvent(event, StateMachine, stateUpdateCallback) {
    let count = 0;
    let id = setInterval(() => {
      if (count <= 100) {
        count = count + 1;
        stateUpdateCallback(() => ({
          count
        }));
      } else {
        StateMachine.transitionToNextState(states.TRIP_COMPLETED);
        window.clearInterval(id);
      }
    }, 1);
  },
  onInitialise(newState, StateMachine) {
    console.log('Initialied the new State', newState);
  }
};

export default DriverAssigned;
