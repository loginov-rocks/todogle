import { useDispatch as useReduxDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { Action } from './Action';
import { State } from './State';

export type Dispatch = ThunkDispatch<State, unknown, Action>;

export const useDispatch = () => useReduxDispatch<Dispatch>();
