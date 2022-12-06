import React from "react";
import { TodoistApi } from "@doist/todoist-api-typescript"
import ToDoList from "../ToDoList/ToDoList"
import { useEffect } from "react";

const ToDo = (props) => {
  const api = new TodoistApi("4212eb31449f92a1b7ae75cb48bf44313f895cc8")
  const projectId = "2303580023"

  // api.getProjects()
  //   .then((projects) => {
  //     console.log(projects)
  //   })
  //   .catch((error) => console.log(error))

  const GetToDos = () => {
    useEffect(() => {
  api.getTasks({project_id: projectId})
    .then((tasks) => {
      console.log(tasks)
      props.setToDoList(tasks)
      console.log(props.toDoList)
    })
    .catch((error) => console.log(error))
    }, [])
  }
  
  GetToDos()

  const addTaskToList = (toDo) => {
    // e.preventDefault()
      api.addTask({
        content: toDo,
        project_id: projectId
      })
          .then((task) => console.log(task))
          .catch((error) => console.log(error))
  }

  return (
    <div id="to-do-page">
      <p>--------------------------------------</p>        
      <h1>This is the to-do page!</h1>
      <p>To Do List</p>
      <form onSubmit={(e) => {
        e.preventDefault()
        addTaskToList(props.toDo)
        GetToDos()
      }
      }
      >
        To-do: <input name="taskInput" placeholder="Type your new task" type="text" 
        onChange={(e) => {
              let newToDo = e.target.value
              props.setToDo(newToDo)
              console.log(props.toDo);
        }} />
        <button type="submit">Add</button>
      </form>
      <ToDoList toDoList={props.toDoList}/>
      <p>--------------------------------------</p>  
    </div>
  )
}

export default ToDo;