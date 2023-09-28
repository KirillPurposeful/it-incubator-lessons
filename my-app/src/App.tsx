import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';



export type FilterValuesType = "all"|"active"|"completed"

// CRUD
function App() {
    // BLL:
    const todoListTitle: string = "What to learn"
    //useReducer()
    //redux
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: crypto.randomUUID(), isDone: true, title: "HTML&CSS"},
        {id: crypto.randomUUID(), isDone: true, title: "JS/TS"},
        {id: crypto.randomUUID(), isDone: false, title: "REACT"},
        {id: crypto.randomUUID(), isDone: true, title: "REDUX"},
    ])

    const removeTask = (taskId: string) => {
        // const nextState: Array<TaskType> = []
        // for (let i = 0; i < tasks.length; i++) {
        //     if(tasks[i].id !== taskId){
        //         nextState.push(tasks[i])
        //     }
        // }
        const nextState: Array<TaskType> = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }
const addTask = (title: string)=>{
        const newTaskId = crypto.randomUUID();
        const newTask: TaskType = {
            id: newTaskId,
            title: title,
            isDone: false
        }
        const nexState: Array<TaskType>= [...tasks,newTask]
    setTasks(nexState);
    }
    // UI:
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const getFilteredTasksForRender =
        (allTasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
         switch (filterValue) {
             case "active":
                 return  allTasks.filter(t => !t.isDone)
             case "completed":
                 return allTasks.filter(t => t.isDone)
             default:
                 return allTasks
         }
    }
    const changeFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }
    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)
    return (
        <div className="App">
            <TodoList
                tasks={filteredTasksForRender}
                title={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
