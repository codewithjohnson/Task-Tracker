import "./taskList.css";

const TaskList = ({ taskList, DeleteTask, EditTask, HandleFinishedTask }) => {
  // LOGIC TO DELETE A TASK
  return (
    <ul className="taskList">
      {taskList.map((TASK) => {
        return (
          <li key={TASK.id} className="Task">
            <div className="left">
              <input
                type="checkbox"
                checked={TASK.done}
                onChange={(e) => HandleFinishedTask(TASK.id, e.target.checked)}
              />
              <span
                style={{
                  textDecoration: TASK.done ? "line-through" : "none",
                  textDecorationColor: TASK.done ? "red" : "none",
                }}
                className="taskContent"
              >
                {TASK.task}
              </span>
            </div>
            <div className="right">
              <span
                className="material-symbols-outlined"
                onClick={() => EditTask(TASK)}
              >
                edit_note
              </span>
              <span
                className="material-symbols-outlined"
                onClick={() => DeleteTask(TASK.id)}
              >
                delete
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
