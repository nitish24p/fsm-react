import React from 'react';
import { schema } from './state-machine/states';
//import StateMachine from './state-machine';
import StateMachine from './state-machine/new-statemachine';

function changeState(prevState, props) {
  return {
    currentState: 'PAYMENT_REQUESTED'
  };
}

class StateMachineApp extends React.PureComponent {
  FSM = StateMachine.initialise(schema);
  constructor(props) {
    super(props);

    this.state = {
      currentState: this.FSM.getCurrentState(),
      error: '',
      loading: false
    };

    this.FSM.addListener('TRANSITION', this.changeStateCb);
  }

  changeStateCb = currentState => this.updateState({ currentState });

  onClick = event => {
    const handlerContext = this.FSM.getCurrentStateContext();
    event.id = '100';
    handlerContext.onEvent(event, this.FSM, this.updateState);
  };

  updateState = callback => {
    this.setState(callback);
  };

  render() {
    const { currentState, error, loading, count } = this.state;
    console.log('render is called');
    return (
      <div>
        <h1>This is the state Machine App</h1>
        <h2>Current State is: {currentState}</h2>
        {loading && <h1>Loading state</h1>}
        <button onClick={this.onClick}> Go To Next State </button>
        {error && <h2>Error is: {error}</h2>}
        {count && <h2>Trip Duration is: {count}</h2>}
        {currentState === 'DRIVER_ASSIGNED' ? (
          <div>
            <button>Cancel</button>
            <button>Complete</button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default StateMachineApp;
