import { useEffect, useState } from "react";
import "./styles.css";
import ToDoHeader from "./components/Header";
import TaskManager from "./components/TaskManager";

export default function App() {
  const [tasks, setTasksState] = useState([]);

  function setTasks(newTasks) {
    setTasksState(newTasks);
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
  useEffect(() => {
    const savedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    setTasksState(savedTasks ?? []);
  }, []);
  return (
    <div className="App">
      <ToDoHeader tasks={tasks} />

      <main>
        <TaskManager tasks={tasks} setTasks={setTasks} />
      </main>
    </div>
  );
}
