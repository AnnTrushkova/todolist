import * as axios from "axios"

const widgetsId = "?widgetId=97569"
const todolistAPI = axios.create({
    baseURL: "https://repetitora.net/api/JS/Tasks",
})


const apiService = {
    getTask() {
        return todolistAPI.get(widgetsId).then(response => {
            return response.data
        })
    },

    setTask(title) {
        return todolistAPI.post(widgetsId, {title}).then(response => {
            return response.data.task
        })
    }
}

export default apiService
