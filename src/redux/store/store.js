import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
  } from 'react-redux';

const store = configureStore({
    reducer:rootReducer
});

export default  store;

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();