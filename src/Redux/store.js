import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./Auth/auth.reducer";

const loggerMiddleware = (store)=>(next)=>(action)=>{
    if(typeof action ==="function"){
        return action(store.dispatch);
    }

    next(action)
}

const rootReducer = combineReducers({
    auth:authReducer
})

export const store = createStore(rootReducer, compose(applyMiddleware(loggerMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))