export const TaskAdded = ({ list, deleteTask, edit, hide }) => {
  return (
    <div>
      <li>{list.taskName}</li>
      {hide ? null : (
        <button onClick={() => deleteTask(list.id)}>delete</button>
      )}
      <button onClick={() => edit(list)}>Edit</button>
    </div>
  );
};
