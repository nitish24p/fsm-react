import * as StateMachineConstants from './state-constants';
import TripRequested from './handlers/tripRequested';
import PaymentRequested from './handlers/paymentRequested';
import DriverAssigned from './handlers/driverAssigned';
/**
 * state: {
 *   onEvent: 'someHandler',
 *   allowedTransitions: [],
 * }
 */
export const schema = {
  [StateMachineConstants.states.TRIP_REQUESTED]: {
    onEvent: TripRequested.onEvent.bind(TripRequested),
    allowedTransitions: [StateMachineConstants.states.PAYMENT_REQUESTED],
    beforeTransition: TripRequested.beforeTransition.bind(TripRequested)
  },
  [StateMachineConstants.states.PAYMENT_REQUESTED]: {
    onEvent: PaymentRequested.onEvent.bind(PaymentRequested),
    allowedTransitions: [
      StateMachineConstants.states.TRIP_REQUESTED,
      StateMachineConstants.states.DRIVER_ASSIGNED
    ]
  },
  [StateMachineConstants.states.DRIVER_ASSIGNED]: {
    onEvent: DriverAssigned.onEvent.bind(DriverAssigned),
    allowedTransitions: [
      StateMachineConstants.states.TRIP_REQUESTED,
      StateMachineConstants.states.DRIVER_UNASSIGNED
    ],
    onChangeState: DriverAssigned.changeState.bind(DriverAssigned),
    onInitialise: DriverAssigned.onInitialise.bind(DriverAssigned)
  },
  [StateMachineConstants.states.DRIVER_UNASSIGNED]: {
    onEvent: 'someHandler'
  },
  [StateMachineConstants.states.TRIP_COMPLETED]: {
    onEvent: 'someHandler'
  },
  defaultState: StateMachineConstants.states.TRIP_REQUESTED
};
