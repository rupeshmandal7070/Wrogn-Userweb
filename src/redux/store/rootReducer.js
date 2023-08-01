import {reducer as authReducer} from "../slices/auth";
import {reducer as productReducer} from '../slices/product'
import {reducer as cartReducer} from '../slices/cart'
import {reducer as orderReducer} from '../slices/orders'
import {combineReducers} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
   auth:authReducer, 
   product:productReducer,
   cart:cartReducer,
   orders:orderReducer,
});
