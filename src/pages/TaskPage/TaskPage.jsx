import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import classnames from "classnames";
import styles from "./style.module.css"

function TaskPage(props) {

    const {taskId} = useParams()
    
    const [task, setTask] = useState({})
    
    useEffect(() => {
        axios.get(`/api/task/?task_id=${taskId}`)
            .then(response => {
                setTask(response.data)
            })
            .catch(() => {

            })
    }, [])

    return (
        <div>
            <h2  className={classnames(
                styles.text,
                task.status ? styles.done : styles.unfulfilled,
                styles.status
            )}>{task.status ? "Выполнено" : "Не выполнено"}</h2>
            <h1>{task.title}</h1>
            <h2>{task.type}</h2>
            <text>{task.description}</text>
            <Button
            onClick={() => {
                axios.put("/api/set_task_status", {
                    task_id: taskId
                })
            }}
            >Завершить</Button>
        </div>
    );
}

export default TaskPage;