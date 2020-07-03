export const getFilteredTasks = (state) => {
    let { sortField, sortDirection } = state.todolist

    let tasks = [...state.todolist.tasks]
    // filtering
    if (state.todolist.filter) {
        tasks = tasks.filter(t => t.title.indexOf(state.todolist.filter) > -1)
    }
    // sorting

    tasks.sort((a, b) => {
        let A = a[sortField].toString().toUpperCase()
        let B = b[sortField].toString().toUpperCase()
        if (A > B) return sortDirection === 'asc' ? 1 : -1
        if (A < B) return sortDirection === 'asc' ? -1 : 1
        return 0
    })
    return tasks
}

export const getSortDirection = (state) => {
    return state.todolist.sortDirection
}

export const getSortField = (state) => {
    return state.todolist.sortField
}

export const getStatus = (state) => {
    return state.todolist.status
}

export const getNewTaskText = (state) => {
    return state.todolist.newTaskText
}
