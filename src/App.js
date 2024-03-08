import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [IsCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [completedTodos, setcompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
  };

  const handleCompleteTodo = (index) => {
    let completedTime = new Date();
    let dd = completedTime.getDate();
    let mm = completedTime.getMonth() + 1;
    let yy = completedTime.getFullYear();
    let hh = completedTime.getHours();
    let min = completedTime.getMinutes();
    let seconds = completedTime.getSeconds();
    let completedOn = `${dd}-${mm}-${yy} at ${hh}:${min}:${seconds}`;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedTodo = [...completedTodos];
    updatedCompletedTodo.push(filteredItem);
    setcompletedTodos(updatedCompletedTodo);
    localStorage.setItem(
      "completetodolist",
      JSON.stringify(updatedCompletedTodo)
    );
    handleDeleteTodo(index);
  };

  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completetodolist", JSON.stringify(reducedTodo));
    setcompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    let savedCompletedTodo = JSON.parse(
      localStorage.getItem("completetodolist")
    );
    if (savedCompletedTodo) {
      setcompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={newTitle}
              onChange={(e) => setnewTitle(e.target.value)}
              placeholder="Enter todo title"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={newDescription}
              onChange={(e) => setnewDescription(e.target.value)}
              placeholder="Enter todo description"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              className="primary-button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondary-button ${
              IsCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondary-button ${
              IsCompleteScreen === true && "active"
            }`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {IsCompleteScreen === false &&
            allTodos.map((todo, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => {
                        handleCompleteTodo(index);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          {IsCompleteScreen === true &&
            completedTodos.map((todo, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <i>{`Completed On: ${todo.completedOn}`}</i>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
