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
      <button onClick={addTaskList}>Add</button>
    </div>
  );
};
