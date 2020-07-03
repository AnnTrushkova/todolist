import React, { useState } from 'react'
import { statuses } from "../BLL/todolist-reducer"
import style from './todolist.module.css'
import { NavLink } from "react-router-dom"
import SearchBlock from "./SearchBlock"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CircularProgress from '@material-ui/core/CircularProgress'


const Todolist = (props) => {

    const [searchValue, setInputValue] = useState(null)

    let { tasks = [], newTaskText, status } = props
    let { addTask, changeTaskText, toggleSortDirection, sortDirection } = props

    let changeText = (e) => {
        changeTaskText(e.target.value)
        setInputValue(e.target.value)
    }

    let onKeyUp = (e) => {
        e.keyCode === 13 && addTask(e.target.value)
    }

    let onClick = () => {
        !!searchValue && addTask(newTaskText)
    }

    let onSortDirectionChanged = (e) => {
        toggleSortDirection()
    }

    return (
        <Card variant="outlined" style={{ width: 500 }}>
            <CardContent className={style.root}>

                <div className={style.card_header}>
                    <TextField id="outlined-basic" label="Add new task" variant="outlined"
                        value={newTaskText} onChange={changeText}
                        onKeyUp={onKeyUp} disabled={status === statuses.IN_PROGRESS}
                    />
                    <Button variant="contained" color="primary" onClick={onClick}>
                        Send
                </Button>
                </div>

                <div className={style.tasks}>
                    <SearchBlock setFilter={props.setFilter} />
                    <div>
                        <h3 onClick={onSortDirectionChanged}> {sortDirection === 'asc' ?
                            <IconButton color="secondary">
                                <ArrowUpwardIcon />
                            </IconButton>
                            :
                            <IconButton color="secondary">
                                <ArrowDownwardIcon />
                            </IconButton>
                        }
                        </h3>
                        {status === statuses.IN_PROGRESS
                            ?
                            <CircularProgress />
                            :
                            !tasks.length
                                ? <div className={style.title}>No tasks</div>
                                : tasks.map(t => <div className={style.title}><li>{t.title}</li></div>)
                        }
                    </div>
                </div>
                <div className={style.menu}>
                    <NavLink activeClassName={style.active} to='/all'>All</NavLink>
                    <NavLink activeClassName={style.active} to='/active'>Active</NavLink>
                    <NavLink activeClassName={style.active} to='/completed'>Completed</NavLink>
                </div>



            </CardContent>

        </Card>
    )
}

export default Todolist