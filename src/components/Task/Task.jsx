import React from 'react';
import classnames from "classnames";
import styles from "./style.module.css"
import {useNavigate} from "react-router-dom";

function Task({data}) {

    const navigate = useNavigate();

    return (
        <section className={classnames(styles.card)} onClick={(event) => {
            navigate(`/task/${data.id}`)
        }}>
            <div>
                <h2 className={classnames(styles.text)}>{data.title}</h2>
                <h3 className={classnames(styles.text)}>{data.type}</h3>
            </div>
            <h2
                className={classnames(
                    styles.text,
                    data.status ? styles.done : styles.unfulfilled,
                    styles.status
                )}
            >
                {data.status ? "Выполнено" : "Не выполнено"}
            </h2>
        </section>
    );
}

export default Task;