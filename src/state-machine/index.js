class StateMachine {
  static initialise(STATE_MACHINE) {
    return new StateMachine(STATE_MACHINE);
  }

  constructor(STATE_MACHINE) {
    this.stateMachine = STATE_MACHINE;
    this.currentState = this.stateMachine.defaultState;
    this.currentStateContext = this.stateMachine[this.currentState];
  }

  getCurrentState() {
    return this.currentState;
  }

  getCurrentStateContext() {
    return this.currentStateContext;
  }

  setCurrentState(nextState) {
    this.currentState = nextState;
  }

  setCurrentStateContext(nextState) {
    this.currentStateContext = this.stateMachine[nextState];
  }

  transitionToNextState(nextState) {
    return prevState => {
      const currentState = this.getCurrentState();
      const currentContext = this.getCurrentStateContext();
      if (
        !this.stateMachine[nextState] ||
        this.stateMachine[currentState].allowedTransitions.indexOf(
          nextState
        ) === -1
      ) {
        console.log(
          `Error Case stuff here cannot transition from ${currentState} to ${nextState}`
        );
        return {
          error: 'Invalid State Transition'
        };
      }

      if (
        currentContext.beforeTransition &&
        typeof currentContext.beforeTransition === 'function'
      ) {
        currentContext.beforeTransition(currentState, nextState, this);
      }

      this.setCurrentState(nextState);
      this.setCurrentStateContext(nextState);

      const newState = this.getCurrentState();
      const newStateContext = this.getCurrentStateContext();
      if (
        newStateContext.onInitialise &&
        typeof newStateContext.onInitialise === 'function'
      ) {
        newStateContext.onInitialise(newState, this);
      }

      return {
        currentState: nextState
      };
    };
  }
}

export default StateMachine;
