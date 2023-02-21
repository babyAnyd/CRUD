import { FaEdit, FaCheckDouble, FaRegWindowClose } from "react-icons/fa";

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
      <button className="update-icons" onClick={changeItemName}>
        <FaCheckDouble />
      </button>
      <button className="cancel-icons" onClick={cancelUpdate}>
        <FaRegWindowClose />
      </button>
    </div>
  );
};
