import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const TaskAdded = ({ list, deleteTask, edit }) => {
  return (
    <tr>
      <td className="task">{list.taskName}</td>
      <td>
        <button>Complete</button>
        <button onClick={() => edit(list)}>
          <FaEdit />
        </button>
        {list.isHideDelete ? (
          ""
        ) : (
          <button onClick={() => deleteTask(list.id)}>
            <FaTrashAlt />
          </button>
        )}
      </td>
    </tr>
  );
};
// <TaskAdded
//   list={list}
//   key={index}
//   deleteTask={deleteTask}
//   edit={edit}
// />
