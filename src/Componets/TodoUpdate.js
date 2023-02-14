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
        value={updateTask && updateTask.taskName}
        onChange={(e) => taskUpdate(e)}
      />
      <button onClick={changeItemName}>update</button>
      <button onClick={cancelUpdate}>cancel</button>
    </div>
  );
};
