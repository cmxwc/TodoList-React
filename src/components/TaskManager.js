//import { CatFactBox } from "./Header";
import { useState } from "react";

function TaskManager(props) {
  const { tasks, setTasks } = props;
  const [newTaskDesc, setNewTaskDesc] = useState("");

  function handleAddTask(event) {
    event.preventDefault();
    addTask(newTaskDesc);
  }

  function addTask(description) {
    const newTasks = [
      // the ... operator is called the spread operator
      // what we are doing is creating a brand new array of
      // tasks, that is different from the previous array
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      ...tasks,
      {
        description: description,
        isComplete: false
      }
    ];
    setTasks(newTasks);
    console.log(newTasks);
  }

  return (
    <>
      <div>
        <h2>Add Tasks</h2>
        <form onSubmit={handleAddTask}>
          <label>
            Task:
            <input
              style={{ margin: "0 1rem" }}
              type="text"
              value={newTaskDesc}
              onChange={(event) => {
                // how do you know it's event.target.value? it just is.
                // search it up on MDN, and view react code samples
                // See: https://reactjs.org/docs/forms.html
                setNewTaskDesc(event.target.value);
                //console.log(event.target.value);
              }}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>

      <div>
        <h2>Task List</h2>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} setTasks={setTasks} />
        ) : (
          <p>No tasks added yet</p>
        )}
      </div>
    </>
  );
}

function TaskList(props) {
  const { tasks, setTasks } = props;

  function handleTaskToggle(taskToToggle, taskToToggleIndex) {
    const newTasks = [
      ...tasks.slice(0, taskToToggleIndex),
      {
        description: taskToToggle.description,
        isComplete: !taskToToggle.isComplete
      },
      ...tasks.slice(taskToToggleIndex + 1)
    ];
    setTasks(newTasks);
  }

  return (
    <table style={{ margin: "0 auto", width: "100%" }}>
      <thead>
        <tr>
          <th>No.</th>
          <th>Task</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{task.description}</td>
            <td>
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => handleTaskToggle(task, index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TaskManager;
