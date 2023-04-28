import React, {useEffect, useState} from 'react';
import classnames from "classnames";
import styles from "../LoginPage/style.module.css";
import axios from "axios";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";

function CreateTaskPage(props) {

    const [type_, setType] = useState("Теория")

    const [students, setStudents] = useState([])

    useEffect(() => {
        axios.get("/api/students")
            .then((response) => {
                setStudents(response.data.users)
            })
    }, [])

    const [people, setPeople] = useState([])

    const [open, setOpen] = useState(false)
    const [data, setData] = useState({
        status: "info",
        text: "Ожидание ответа сервера"
    })

    return (
        <main className={classnames(styles.main)}>
            <form className={classnames(styles.form)} name="task_form" onSubmit={(event) => {
                event.preventDefault();
                const form = document.forms["task_form"]
                setData({
                    status: "info",
                    text: "Ожидание ответа сервера"
                })
                setOpen(true)
                axios.post("/api/task", {
                    title: form.title.value,
                    description: form.description.value,
                    type: type_,
                    people_id: people
                })
                    .then((response) => {
                        if (response.data.status) {
                            setData({
                                status: "success",
                                text: "Успешно"
                            })
                        }
                    })
                    .catch((response) => {
                        setData({
                            status: "error",
                            text: "Ошибка"
                        })
                    })
            }}>
                <FormControl>
                    <InputLabel required={true} htmlFor="title">Заголовок</InputLabel>
                    <OutlinedInput required={true} label="Заголовок" id="title" name="title"/>
                </FormControl>
                <FormControl>
                    <TextField required={true} label="Описание" id="description" name="description"/>
                </FormControl>
                <FormControl>
                    <InputLabel required={true} htmlFor="title">Тип задания</InputLabel>
                    <Select required={true} label="Тип задания" value={type_} id="type" name="type"
                            onChange={(event) => {
                                setType(event.target.value)
                            }}>
                        <MenuItem key={1} value="Видеолекция">Видеолекция</MenuItem>
                        <MenuItem key={2} value="Схема">Схема</MenuItem>
                        <MenuItem key={3} value="Тест">Тест</MenuItem>
                        <MenuItem key={4} value="Теория">Теория</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Ученики</InputLabel>
                    <Select
                        labelId="people-label"
                        id="people"
                        multiple
                        value={people}
                        onChange={(event) => {
                            const {
                                target: {value},
                            } = event;
                            setPeople(typeof value === 'string' ? value.split(',') : value,)
                        }}
                        input={<OutlinedInput label="Ученики"/>}
                        renderValue={(selected) => selected.join(', ')
                        }
                    >
                        {students.map((student) => (
                            <MenuItem key={student.id} value={student.id}>
                                <Checkbox checked={people.indexOf(student.id) > -1}/>
                                <ListItemText primary={student.name + " " + student.surname}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <OutlinedInput value="Создать" type="submit"/>
                </FormControl>
            </form>
        </main>
    );
}

export default CreateTaskPage;