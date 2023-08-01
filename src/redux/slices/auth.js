import { authApi } from "@/src/mocks/auth";
import {Slice, createSlice} from "@reduxjs/toolkit";
const initialState = {
    user:{},
}


const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        getUser(state,action){
            let data = {...action.payload.data}
            console.log(data)
         state.user = data
        },
        updateUser(state,action){
            let data = action.payload.data
        state.user = {...state.user, ...data}
        },
        deleteUser(state,action){
         let data = action.payload.data;
         state.user = {}
        },
        logoutUser(state,action){
            state.user = {}
           },

    }

});

export const {reducer} = slice

export const getUser = () => async (dispatch) =>{
    const result = await authApi.getUser();
    if(result){
        await dispatch(slice.actions.getUser(result))
        return true
    }
    return false
}

export const updateUser = (data,id)=> async (dispatch) =>{
    console.log(data)
    const result = await authApi.updateUser(data,id);
    console.log(result)
    if(result){
        await dispatch(slice.actions.updateUser(result))
        return true
    }
    return false
    
}

export const deleteUser = (id)=> async (dispatch) =>{
    const result = await authApi.deleteUser(id);
    if(result){
        await dispatch(slice.actions.deleteUser(result))
        return true
    }
    return false
    
}

export const register = (data)=> async (dispatch) =>{
    const result = await authApi.register(data);
    if(result)
        return true
    return false
    
}
export const login = (data,users) => async (dispatch) =>{
    const result = await authApi.login(data);
    if(result)
        return result.data;
    return false
}

export const logoutUser = ()=> async (dispatch) =>{
    
        await dispatch(slice.actions.logoutUser())
        return true;
    
}



export default slice;
