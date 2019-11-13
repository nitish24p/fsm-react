import { states } from '../state-constants';

const TripCompleted = {
  onEvent(event, StateMachine, stateUpdateCallback) {
    StateMachine.transitionToNextState(states.TRIP_REQUESTED);
  },
  onInitialise(newState, StateMachine) {}
};

export default TripCompleted;
