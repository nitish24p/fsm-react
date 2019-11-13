import { states } from '../state-constants';

const TripCancelled = {
  onEvent(event, StateMachine, stateUpdateCallback) {
    StateMachine.transitionToNextState(states.TRIP_REQUESTED);
  },
  onInitialise(newState, StateMachine) {},
  onMessage() {}
};

export default TripCancelled;
