import { useState } from "react";
import "./App.css";
import TaskList from "./components/taskList/TaskList";

const initialTasks = [
  // { id: 0, task: "call some sharks", done: false },
  // { id: 1, task: "throw out the fine trash", done: false },
];
let nextID = 2;

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [inputValue, setInputValue] = useState("");
  const [btnText, setBtnText] = useState("add");
  const [editedID, setEditedID] = useState(0);

  // CHANGE INPUT VALUES
  const HandleInputandBtn = (e) => {
    setInputValue(e.target.value);
  };

  // LOGIC TO ADD NEW TASK
  const AddTask = () => {
    if (btnText === "add") {
      const newTask = {
        id: nextID++,
        task: inputValue,
        done: false,
      };
      setTasks([newTask, ...tasks]);
      setInputValue("");
    } else if (btnText === "save") {
      setTasks(
        [...tasks].map((currentTask) => {
          if (currentTask.id == editedID) {
            setInputValue("");
            return { ...currentTask, task: inputValue };
          } else {
            setInputValue("");
            return currentTask;
          }
        })
      );
    }
  };

  // LOGIC TO DELETE TASK
  const DeleteTask = (TaskID) => {
    setTasks([...tasks].filter((task) => task.id !== TaskID));
  };

  // LOGIC TO EDIT A TASK
  const EditTask = (TASK) => {
    const taskContent = TASK.task;
    setInputValue(taskContent);
    setBtnText("save");

    setEditedID(TASK.id);
  };

  const HandleFinishedTask = (TaskID, TaskStatus) => {
    setTasks(
      [...tasks].map((currentTask) => {
        if (currentTask.id === TaskID) {
          return { ...currentTask, done: TaskStatus };
        } else {
          return currentTask;
        }
      })
    );
  };

  const HandleKeyUp = (e) => {
    if (e.key === "Enter") {
      AddTask();
    }
  };

  const DeleteAllTasks = () => {
    setTasks([...tasks].filter((task) => task.id === tasks.length));
  };

  return (
    <div className="app">
      <h2 className="title">task tracker</h2>
      <main>
        <header>
          <label htmlFor="task">add your task 🎨</label>
          <div className="inputContainer">
            <input
              type="text"
              value={inputValue}
              onChange={HandleInputandBtn}
              onKeyUp={HandleKeyUp}
            />
            <button
              className="addBtn"
              disabled={inputValue.length > 0 ? false : true}
              onClick={AddTask}
            >
              {btnText}
            </button>
          </div>
        </header>
        <div className="tasksContainer">
          <h3 className="tasksTitle">Tasks</h3>
          {tasks.length > 0 ? (
            <div className="taskMainContainer">
              <TaskList
                taskList={tasks}
                DeleteTask={DeleteTask}
                EditTask={EditTask}
                HandleFinishedTask={HandleFinishedTask}
              />
            </div>
          ) : (
            <div className="emptyTask">No Task To show</div>
          )}
        </div>
        <footer>
          <p className="uncompleteTask">
            you have {[...tasks].filter((task) => task.done === false).length}{" "}
            uncompleted task(s)
          </p>
          {tasks.length > 0 ? (
            <button onClick={DeleteAllTasks}>clear all</button>
          ) : (
            ""
          )}
        </footer>
      </main>
    </div>
  );
};

export default App;
