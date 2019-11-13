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
      loading: false,
      message: ''
    };

    this.FSM.addListener('TRANSITION', this.changeStateCb);
  }

  componentWillUnmount() {
    this.FSM.removeListener('TRANSITION', this.changeStateCb);
  }

  changeStateCb = currentState => this.updateState({ currentState });

  onClick = event => {
    const handlerContext = this.FSM.getCurrentStateContext();
    event.id = '100';
    handlerContext.onEvent(event, this.FSM, this.updateState);
  };

  socketMessage = event => {
    const handlerContext = this.FSM.getCurrentStateContext();
    handlerContext.onMessage(event, this.FSM, this.updateState);
  };

  updateState = callback => {
    this.setState(callback);
  };

  getButtonText() {
    switch (this.state.currentState) {
      case 'TRIP_REQUESTED':
        return 'Book Trip';

      case 'DRIVER_ASSIGNED':
        return 'End Trip';

      case 'PAYMENT_REQUESTED':
        return 'Get Payment Details';

      case 'TRIP_CANCELLED':
        return 'Find Another Trip';

      case 'TRIP_COMPLETED':
        return 'Give Feedback';

      default:
        break;
    }
  }

  getIcon() {
    switch (this.state.currentState) {
      case 'TRIP_REQUESTED':
        return '📍';

      case 'DRIVER_ASSIGNED':
        return '🚖';

      case 'PAYMENT_REQUESTED':
        return '🤑';

      case 'TRIP_COMPLETED':
        return '✅';

      case 'TRIP_CANCELLED':
        return '🖕🏼';

      default:
        break;
    }
  }

  render() {
    const { currentState, error, loading, count } = this.state;
    console.log('render is called');
    return (
      <div className="min-h-screen container px-20 py-2 bg-blue-700">
        <div className="h-64 max-w-sm rounded overflow-hidden shadow-lg px-4 py-4 bg-white">
          <h2 className="text-lg">
            Current State is:{' '}
            <span className="p-2 bg-purple-700 rounded-full text-white text-base">
              {currentState}
            </span>
          </h2>
          {loading && <h1>Loading</h1>}
          {count && <h2>Trip Duration is: {count}</h2>}

          <h1 className="text-center h-16 text-6xl mt-5">
            <span role="img" aria-label="icon">
              {this.getIcon()}
            </span>
          </h1>
        </div>

        <div className="mt-10">
          <button
            className="bg-gray-700 hover:bg-gray-800 focus:outline-none text-white  py-1 px-4 rounded"
            onClick={this.onClick}
          >
            {this.getButtonText()}
          </button>
        </div>

        <div className="mt-10">
          <button
            onClick={this.socketMessage}
            className="bg-gray-700 hover:bg-gray-800 focus:outline-none text-white  py-1 px-4 rounded"
          >
            Socket Message
          </button>
        </div>
      </div>
    );
  }
}

export default StateMachineApp;
