import { useEffect, useState } from "react";
import { InputTodo } from "./Components/TodoInput";
import { TaskAdded } from "./Components/TodoAdd";
import { UpdateTodo } from "./Components/TodoUpdate";
import "./App.css";

//for local storage only
// const getItemsStorage = () => {
//   const list = localStorage.getItem("addTask");
//   const recordJSON = JSON.parse(list);
//   return recordJSON;
// };

function App() {
  const [text, setText] = useState("");
  const [addTask, setAddTask] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  const [isError, setError] = useState("");
  const [search, setSearch] = useState("");

  //get items

  useEffect(() => {
    localStorage.setItem("addTask", JSON.stringify(addTask));
  }, [addTask]);

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
      isHideDelete: false,
      isCompleted: false,
    };
    if (text.trim().length <= 0) {
      setError("Please add task.");
    } else {
      const add = [...addTask, taskN];
      setAddTask(add);
      setText("");
      setError("");
    }
  };

  const completedTask = (id) => {
    setAddTask(
      addTask.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      })
    );
  };

  //delete task
  const deleteTask = (id) => {
    const deleted = addTask.filter((item) => item.id !== id);
    setAddTask(deleted);
    setError("");
  };

  //edit task

  const edit = (list) => {
    setUpdateTask({
      id: list.id,
      taskName: list.taskName,
      isEdit: list.isEdit ? true : false,
      isHideDelete: list.isHideDelete ? true : false,
      isCompleted: list.isCompleted ? true : false,
    });
    const hideDelete = addTask.map((task) => {
      if (task.id === list.id) {
        return { ...task, isHideDelete: true };
      } else if (task.id !== list.id) {
        return { ...task, isHideDelete: false };
      }
      return task;
    });

    setAddTask(hideDelete);
    setError("");
  };

  const taskUpdate = (e) => {
    const newTask = {
      id: updateTask.id,
      taskName: e.target.value,
      isEdit: updateTask.isEdit ? true : false,
      isHideDelete: updateTask.isHideDelete ? true : false,
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
  };

  const cancelUpdate = () => {
    setUpdateTask("");
    const hideDelete = addTask.map((task) => {
      return { ...task, isHideDelete: false };
    });

    setAddTask(hideDelete);
  };

  return (
    <div className="App">
      <main>
        <div className="parent-list">
          <div>
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
              </>
            )}
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
              className="search"
            />
          </div>
          <div className="parent-table">
            <div className="text">
              <p>
                <i>
                  Task
                  <small>{addTask.length === 0 ? null : addTask.length}</small>
                </i>
              </p>
              <p>
                <span className="error">{isError}</span>
              </p>
            </div>
            <div className="outer-wrapper">
              <div className="inner-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th className="details">Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addTask
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.taskName
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                        return false;
                      })
                      .sort((a, b) => (a.id < b.id ? -1 : 1))
                      .map((list, index) => (
                        <TaskAdded
                          list={list}
                          key={index}
                          deleteTask={deleteTask}
                          edit={edit}
                          completedTask={completedTask}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
