import { useState } from "react";
import { InputTodo } from "./Componets/TodoInput";
import { TaskAdded } from "./Componets/TodoAdd";
import { UpdateTodo } from "./Componets/TodoUpdate";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [addTask, setAddTask] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  const [hide, setHide] = useState(false);
  const [error, isError] = useState("");

  //task input
  const taskInput = (e) => {
    setText(e.target.value);
  };

  //add task
  const addTaskList = () => {
    const taskN = {
      id: addTask.length === 0 ? 1 : addTask[addTask.length - 1].id + 1,
      taskName: text,
      isEdit: false,
    };
    if (text.trim().length <= 0) {
      isError(<h1>Please add task</h1>);
    } else {
      const add = [...addTask, taskN];
      setAddTask(add);
      setText("");
      isError("");
    }
  };

  //delete task
  const deleteTask = (id) => {
    const deleted = addTask.filter((item) => item.id !== id);
    setAddTask(deleted);
  };

  //edit task

  const edit = (list) => {
    setUpdateTask({
      id: list.id,
      taskName: list.taskName,
      isEdit: list.isEdit ? true : false,
    });
    setHide(true);
  };

  const taskUpdate = (e) => {
    const newTask = {
      id: updateTask.id,
      taskName: e.target.value,
      isEdit: updateTask.isEdit ? true : false,
    };
    setUpdateTask(newTask);
  };

  const changeItemName = () => {
    const filterRecords = [...addTask].filter(
      (items) => items.id !== updateTask.id
    );
    const updateList = [...filterRecords, updateTask];
    setAddTask(updateList);
    setUpdateTask("");
    setHide(false);
  };

  const cancelUpdate = () => {
    setUpdateTask("");
    setHide(false);
  };

  return (
    <div className="App">
      <h1>{addTask.length}</h1>
      {updateTask ? (
        <>
          <UpdateTodo
            cancelUpdate={cancelUpdate}
            changeItemName={changeItemName}
            taskUpdate={taskUpdate}
            updateTask={updateTask}
          />
        </>
      ) : (
        <>
          <InputTodo
            taskInput={taskInput}
            addTaskList={addTaskList}
            text={text}
          />
          <h3>{error}</h3>
        </>
      )}

      <div
        className="item-list"
        id={addTask.length >= 6 ? "scroll-items" : "not active"}
      >
        <ul>
          {addTask.map((list, index) => (
            <TaskAdded
              list={list}
              key={index}
              deleteTask={deleteTask}
              edit={edit}
              hide={hide}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
