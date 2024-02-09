import { useEffect, useState } from "react"
import { Button, Container, Nav, Table } from "react-bootstrap"
import { Link } from "react-router-dom"


const Tasks = ({user, token}) => {
    const API = import.meta.env.VITE_BASE_URL
    const [tasks, setTasks] = useState([])

    const completeTask = (id) => {
        const task = tasks.find(task => task.task_id === id)
        const updatedTask = {...task, completed: !task.completed}
        fetch(`${API}/users/${user.user_id}/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedTask),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(res => {
            // map over prev state of tasks to create new arr w/ updated tasks
            setTasks((prevTasks)=> prevTasks.map(task => task.task_id === id ? updatedTask : task))
        })
        .catch(err => console.log(err))
    }
    useEffect(()=> {
        fetch(`${API}/users/${user.user_id}/tasks`, {
            headers: {
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(res => setTasks(() => res))
        .catch(err => console.log(err))
    }, [user, tasks])

    // sort tasks by id# so they keep the same order when updated
    const sortedTasks = tasks.sort((a,b) => a.task_id < b.task_id ? -1 : 1 )



    return (
       <Container>
        <h2>Task List</h2>
        <Nav.Link as={Link} to='/new'> <Button variant='outline-primary' style={{marginBottom: '7px'}}> Create Task </Button> </Nav.Link>
        <Table striped bordered hover responsive className="table-warning table-md border-success">
        <thead className="table-dark">
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {tasks.length > 0 && sortedTasks.map((task) => (
                <tr key={task.task_id}>
                    <td><Nav.Link as={Link} to={`/tasks/${task.task_id}`}> {task.title}</Nav.Link></td>
                    <td>{task.description}</td>
                    <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
                    <td>
                        <Button variant={task.completed ? 'secondary' : 'success'} onClick={() => completeTask(task.task_id)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
        </Table>
       </Container>
    )
}

export default Tasks