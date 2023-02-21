export const UpdateTodo = ({
  updateTask,
  taskUpdate,
  changeItemName,
  cancelUpdate,
}) => {
  return (
    <div>
      <input
        type="text"
        className="task-add"
        value={updateTask && updateTask.taskName}
        onChange={(e) => taskUpdate(e)}
      />
      <button onClick={changeItemName}>update</button>
      <button onClick={cancelUpdate}>cancel</button>
    </div>
  );
};
