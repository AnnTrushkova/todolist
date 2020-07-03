import apiService from "../DAL/todolistAPI"

const ADD_TASK = 'TODOLIST/ADD_TASK'
const ADD_NEW_TASK_TEXT = 'TODOLIST/ADD_NEW_TASK_TEXT'
const SET_TASKS = 'TODOLIST/SET_TASKS'
const SET_STATUS = 'TODOLIST/SET_STATUS'
const SET_FILTER = 'TODOLIST/SET_FILTER'
const TOGGLE_SORT_DIRECTION = 'TODOLIST/TOGGLE_SORT_DIRECTION'

export const statuses = {
    NOT_INITIALIZED: 'NOT_INIT',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS'
}

let initialState = {
    tasks: [],
    newTaskText: '',
    filter: '',
    status: statuses.NOT_INITIALIZED,
    sortDirection: 'asc',
    sortField: 'title'
}

let TodolistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.newTask],
            }
        }
        case ADD_NEW_TASK_TEXT: {
            return {
                ...state,
                newTaskText: action.newText
            }
        }
        case SET_TASKS: {
            return {
                ...state,
                tasks: [...action.tasks]
            }
        }
        case SET_FILTER: {
            return {
                ...state,
                filter: action.filter
            }
        }

        case TOGGLE_SORT_DIRECTION: {
            return {
                ...state,
                sortDirection: action.value
                    ? action.value
                    : (state.sortDirection === 'asc' ? 'desc' : 'asc')
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

export let setTask = (newTask) => ({ type: ADD_TASK, newTask })
export let changeTaskText = (newText) => ({ type: ADD_NEW_TASK_TEXT, newText })
export let setTasks = (tasks) => ({ type: SET_TASKS, tasks })
export let setStatus = (status) => ({ type: SET_STATUS, status })
export let setFilter = (filterValue) => ({ type: SET_FILTER, filter: filterValue })
export let toggleSortDirection = (value = null) => ({ type: TOGGLE_SORT_DIRECTION, value })


export let getTasks = () => (dispatch) => {
    dispatch(setStatus(statuses.IN_PROGRESS))
    apiService.getTask()
        .then(tasks => {
            dispatch(setTasks(tasks))
            dispatch(setStatus(statuses.SUCCESS))
        })
}

export let addTask = (title) => (dispatch) => {
    dispatch(setStatus(statuses.IN_PROGRESS))
    apiService.setTask(title).then(task => {
        dispatch(setTask(task))
        dispatch(setStatus(statuses.SUCCESS))
        dispatch(changeTaskText(''))
    })
}

export default TodolistReducer
