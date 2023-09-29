import React, {ChangeEvent, FC, useRef, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType) => void
    addTask : (title: string)=> void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (
    //3.
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }) => {
    console.log("Render")
    //1.
    // const title = props.title
    // const tasks = props.tasks
    //2.
    //const {title: title, tasks: tasks} = props
    //3.
    //const {title, tasks} = props

    // let tasksList: Array<JSX.Element> | JSX.Element;
    // if(tasks.length === 0){
    //     tasksList = <span>Your tasksList is empty</span>
    // } else {
    //     const listItems: Array<JSX.Element> = []
    //     for (let i = 0; i < tasks.length; i++) {
    // const newListItem = <li key={tasks[i].id}>
    //     <input type="checkbox" checked={tasks[i].isDone}/>
    //     <span>{tasks[i].title}</span>
    //     <button>x</button>
    // </li>
    //         listItems.push(newListItem)
    //     }
    //     tasksList = <ul>
    //         {listItems}
    //     </ul>
    // }
    // const titleInput = useRef<HTMLInputElement>(null)
    const[ newTaskTitle,setNewTaskTitle] = useState("")
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>)=> event.key === "Enter" && onClickAddTask()
    const onChangeNewTaskTitle= (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)
    const listItems: Array<JSX.Element> = tasks.map((t) => {
        const onClickRemoveTaskHandler = () => removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your tasksList is empty</span>

    const onClickAddTask = ()=> {
        addTask(newTaskTitle)
        setNewTaskTitle("")
}
const isAddBtnDisabled = newTaskTitle === "" || newTaskTitle.length >= 15

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                value={newTaskTitle}
                onChange={onChangeNewTaskTitle}
                onKeyDown={onKeyDown}/>
                {/*<button onClick={()=> {*/}
                {/*    if (titleInput.current !== null) {*/}
                {/*        addTask(titleInput.current.value )*/}
                {/*    }*/}
                {/*    else {*/}
                {/*        addTask("")*/}
                {/*    }*/}
                {/*}*/}
                {/*    }>+</button>*/}
                <button
                    disabled={isAddBtnDisabled}
                    onClick={onClickAddTask }>+</button>
                <div>
                    <span>
                        {newTaskTitle.length< 15
                        ? "Enter new title"
                        : "Your title is too long;"}
                    </span>
                </div>
            </div>
            {tasksList}
            <div>
                <button onClick={()=>changeFilter("all")}>All</button>
                <button onClick={()=>changeFilter("active")}>Active</button>
                <button onClick={()=>changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;

