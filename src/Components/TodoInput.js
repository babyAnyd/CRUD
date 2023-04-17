import { FaPlus } from "react-icons/fa";

export const InputTodo = ({ taskInput, addTaskList, text }) => {
  return (
    <div>
      <input
        className="task-add"
        type="text"
        placeholder="Add here"
        value={text}
        onChange={taskInput}
      />
      <button onClick={addTaskList} className="add-icons">
        <FaPlus />
      </button>
    </div>
  );
};
