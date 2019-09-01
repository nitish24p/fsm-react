import { states } from '../state-constants';

const TripCancelled = {
  onButtonClick(event, StateMachine, stateUpdateCallback) {
    stateUpdateCallback(
      StateMachine.transitionToNextState(states.DRIVER_UNASSIGNED)
    );
  },
  onInitialise(newState, StateMachine) {
    setTim;
  }
};
