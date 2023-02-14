export const InputTodo = ({ taskInput, addTaskList, text }) => {
  return (
    <div>
      <input type="text" value={text} onChange={taskInput} />
      <button onClick={addTaskList}>Add</button>
    </div>
  );
};
