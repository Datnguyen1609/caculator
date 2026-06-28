import { useState } from "react";
import "./index.css";

interface Todo {
  id: number;
  test: string;
  completed: boolean;
}

export default function App() {
  const [toDo, setToDo] = useState<Todo[]>([]);
  const [test, setTest] = useState("");

  function Makelist() {
    // Không thêm nếu chỉ nhập khoảng trắng
    if (!test.trim()) return;

    const NewToDo: Todo = {
      id: Date.now(),
      test: test,
      completed: false,
    };

    setToDo([...toDo, NewToDo]);
    setTest("");
  }

  function DeleteToDo(id: number) {
    const newList = toDo.filter((todo) => todo.id !== id);
    setToDo(newList);
  }

  function Togglecomplete(id: number) {
    setToDo(
      toDo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      })
    );
  }

  return (
    <div className="toDo-Wrapper">
      <div className="card">
        <h1>YOUR TO DO</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Add new task"
            value={test}
            onChange={(e) => setTest(e.target.value)}
          />

          <button onClick={Makelist}>+</button>
        </div>

        <div className="toDo-List">
          {toDo.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${
                todo.completed ? "completed" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => Togglecomplete(todo.id)}
              />

              <div className="text">{todo.test}</div>

              <button
                className="Delete"
                onClick={() => DeleteToDo(todo.id)}
              >
                x
              </button>
            </div>
          ))}

          <p className="remaining">
            Your remaining todos:{" "}
            {toDo.filter((todo) => !todo.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
}