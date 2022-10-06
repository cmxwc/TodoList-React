import { useState, useEffect } from "react";

function Header(props) {
  const { tasks } = props;
  return (
    <header>
      <h1>My Todo List</h1>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <OverviewBox tasks={tasks} />
        <CatFactBox />
      </div>
    </header>
  );
}

function OverviewBox(props) {
  const { tasks } = props;
  const [name, setName] = useState("Loading name...");

  useEffect(() => {
    const savedName = window.localStorage.getItem("name");
    setName(savedName ?? "Default Name"); //?? for null values
  }, []);

  const tasksLength = tasks.filter((task) => !task.isComplete).length;

  const handleNameClick = () => {
    const newName = prompt("What is your name?", name);
    setName(newName);
    window.localStorage.setItem("name", newName);
  };
  return (
    <div className="HeaderBox">
      <h2>Overview</h2>
      <p>
        Welcome back,{" "}
        <strong role="button" onClick={handleNameClick}>
          {name || "<set your name>"}
        </strong>
        !
      </p>
      <p>
        You have <strong>{tasksLength}</strong> unfinished task
        {tasksLength === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export function CatFactBox() {
  const [catFact, setCatFact] = useState("Loading cat fact...");
  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => setCatFact(data.fact))
      .catch((error) =>
        setCatFact(`Unable to fetch cat fact ${error} blah blah`)
      );
  }, []);

  return (
    <div className="HeaderBox">
      <h2>Cat Fact of The Day</h2>
      <p>{catFact}</p>
    </div>
  );
}

export default Header;
