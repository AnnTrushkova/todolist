import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import TodolistReducer from "./todolist-reducer"


let reducers = combineReducers({
    todolist: TodolistReducer
})


let store = createStore(reducers, applyMiddleware(thunk))


export default store