import * as StateMachineConstants from './state-constants';
import TripRequested from './new-handlers/tripRequested';
import PaymentRequested from './new-handlers/paymentRequested';
import DriverAssigned from './new-handlers/driverAssigned';
import TripCompleted from './new-handlers/tripCompleted';
import TripCancelled from './new-handlers/tripCancelled';
/**
 * state: {
 *   onEvent: 'someHandler',
 *   allowedTransitions: [],
 * }
 */
export const schema = {
  [StateMachineConstants.states.TRIP_REQUESTED]: {
    onEvent: TripRequested.onEvent.bind(TripRequested),
    onMessage: TripRequested.onMessage.bind(TripRequested),
    allowedTransitions: [StateMachineConstants.states.PAYMENT_REQUESTED],
    onExit: TripRequested.onExit.bind(TripRequested)
  },
  [StateMachineConstants.states.PAYMENT_REQUESTED]: {
    onEvent: PaymentRequested.onEvent.bind(PaymentRequested),
    onMessage: PaymentRequested.onMessage.bind(PaymentRequested),
    allowedTransitions: [
      StateMachineConstants.states.TRIP_REQUESTED,
      StateMachineConstants.states.DRIVER_ASSIGNED
    ]
  },
  [StateMachineConstants.states.DRIVER_ASSIGNED]: {
    onEvent: DriverAssigned.onEvent.bind(DriverAssigned),
    onMessage: DriverAssigned.onMessage.bind(DriverAssigned),
    allowedTransitions: [
      StateMachineConstants.states.TRIP_CANCELLED,
      StateMachineConstants.states.TRIP_COMPLETED
    ]
  },
  [StateMachineConstants.states.TRIP_CANCELLED]: {
    onEvent: TripCancelled.onEvent.bind(TripCancelled),
    onMessage: TripCancelled.onMessage.bind(TripCancelled),
    allowedTransitions: [StateMachineConstants.states.TRIP_REQUESTED]
  },
  [StateMachineConstants.states.TRIP_COMPLETED]: {
    onEvent: TripCompleted.onEvent.bind(TripCompleted),
    onMessage: TripCompleted.onMessage.bind(TripCompleted),
    allowedTransitions: [StateMachineConstants.states.TRIP_REQUESTED]
  },
  defaultState: StateMachineConstants.states.TRIP_REQUESTED
};
