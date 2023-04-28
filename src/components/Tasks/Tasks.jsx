import React, {useEffect, useState} from 'react';
import Task from "../Task/Task";
import classnames from "classnames";
import styles from "./style.module.css"
import axios from "axios";


function Tasks({}) {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        axios.get("/api/tasks")
            .then(response => {
                setTasks(response.data)
            })
    }, [])

    if (!tasks){
        return <h1>Loading</h1>
    }

    return (
        <main className={classnames(styles.main)}>
            {tasks.map((task) => <Task key={task.id} data={task}/>
            )}
        </main>
    );
}

export default Tasks;