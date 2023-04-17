import { FaEdit, FaCheck, FaTrashAlt } from "react-icons/fa";

export const TaskAdded = ({ list, deleteTask, edit, completedTask }) => {
  return (
    <tr>
      <td className="task">
        <small
          style={list.isCompleted ? { textDecoration: "line-through" } : null}
        >
          {list.taskName}
        </small>
      </td>
      <td className="action-items">
        <div className="action-icons">
          <li>
            <button onClick={() => completedTask(list.id)}>
              <FaCheck />
            </button>
          </li>

          <li>
            <button onClick={() => edit(list)}>
              <FaEdit />
            </button>
          </li>
          <li>
            {list.isHideDelete ? (
              ""
            ) : (
              <button onClick={() => deleteTask(list.id)}>
                <FaTrashAlt />
              </button>
            )}
          </li>
        </div>
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
