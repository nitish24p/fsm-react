class StateMachine {
  static initialise(STATE_MACHINE) {
    return new StateMachine(STATE_MACHINE);
  }

  static EVENTS = {
    TRANSITION: 'TRANSITION'
  };

  constructor(STATE_MACHINE) {
    this.stateMachine = STATE_MACHINE;
    this.currentState = this.stateMachine.defaultState;
    this.currentStateContext = this.stateMachine[this.currentState];

    this.listeners = {};
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

  addListener(eventName, callback) {
    if (!StateMachine.EVENTS[eventName]) {
      console.log(`${eventName} is not a valid event`);
      return;
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  removeListener(eventName, callback) {
    if (!StateMachine.EVENTS[eventName]) {
      console.log(`${eventName} is not a valid event`);
      return;
    }

    if (!this.listeners[eventName]) {
      console.log(`${eventName} is not a valid event`);
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      cb => cb.toString() !== callback.toString()
    );
  }

  transitionToNextState(nextState) {
    const currentState = this.getCurrentState();
    const currentContext = this.getCurrentStateContext();
    if (
      !this.stateMachine[nextState] ||
      this.stateMachine[currentState].allowedTransitions.indexOf(nextState) ===
        -1
    ) {
      console.log(
        `Error Case stuff here cannot transition from ${currentState} to ${nextState}`
      );
      return {
        error: 'Invalid State Transition'
      };
    }

    this.setCurrentState(nextState);
    this.setCurrentStateContext(nextState);

    const newState = this.getCurrentState();
    const newStateContext = this.getCurrentStateContext();

    this.listeners[StateMachine.EVENTS.TRANSITION].length > 0 &&
      this.listeners[StateMachine.EVENTS.TRANSITION].forEach(callback =>
        callback(newState, newStateContext, this)
      );

    return {
      currentState: nextState
    };
  }
}

export default StateMachine;
