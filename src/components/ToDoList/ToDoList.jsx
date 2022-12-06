import React, { useState, useEffect } from 'react';
import axios from "axios"

const ToDoList = (props) => {
  console.log(props.toDoList);
  const toDos = props.toDoList.map((toDo, index) => {
    return <li key={index}>{toDo.content}</li>
  })
  return (
    <div id="show-to-do-list">
      <ul>
        {toDos}
      </ul>
    </div>
  )

}

export default ToDoList