export const TaskAdded = ({ list, deleteTask, edit }) => {
  return (
    <tr className="overflow-index">
      <td className="task">{list.taskName}</td>
      <td>
        <button>Complete</button>
      </td>
      <td>
        <button onClick={() => edit(list)}>Edit</button>
      </td>
      <td>
        {list.isHideDelete ? (
          ""
        ) : (
          <button onClick={() => deleteTask(list.id)}>delete</button>
        )}
      </td>
    </tr>
  );
};
