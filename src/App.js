import { useEffect, useState } from "react";
import { InputTodo } from "./Componets/TodoInput";
import { TaskAdded } from "./Componets/TodoAdd";
import { UpdateTodo } from "./Componets/TodoUpdate";
import "./App.css";

const getItemsStorage = () => {
  const list = localStorage.getItem("addTask");
  const recordJSON = JSON.parse(list);
  return recordJSON;
};

function App() {
  const [text, setText] = useState("");
  const [addTask, setAddTask] = useState(getItemsStorage());
  const [updateTask, setUpdateTask] = useState("");

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
    };
    const add = [...addTask, taskN];
    setAddTask(add);
    setText("");
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
      isHideDelete: list.isHideDelete ? true : false,
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
          <div className="parent-table">
            <div className="text">
              <p>
                <i>Task ---</i>
              </p>
            </div>
            <div className="outer-wrapper">
              <div className="inner-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2}>Details</th>
                      <th colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addTask.map((list, index) => (
                      <TaskAdded
                        list={list}
                        key={index}
                        deleteTask={deleteTask}
                        edit={edit}
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
