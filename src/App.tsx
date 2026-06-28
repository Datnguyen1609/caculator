import { useCallback, useState } from "react"
import './index.css'

export default function App(){
  const [toDo, setToDo] = useState([])
  const [test, setTest] = useState("")

  function Makelist(){
    if(!test.trim()){return}
    const NewToDo = {
      test: test,
      id: Date.now(),
      completed: false
    }    
    setToDo([...toDo, NewToDo])
    setTest("")
  }


  function DeleteToDo(id){
    const newList = toDo.filter((todo) => todo.id != id)
    setToDo(newList)
  }

  function Togglecomplete(id){
    setToDo(
      toDo.map((todo) => {
        if(todo.id === id){
          return {...todo,completed: !todo.completed
          };
        }else{
          return todo;
        }
      })
    );
  }

  const [iDEdit, setIDEdit] = useState(null);
  const [editText, setEditText] =  useState("")

  function Edit(todo){
    setIDEdit(todo.id);
    setEditText(todo.test)
  }

 function saveEdit(id){
  if(!editText.trim()){
    setToDo(
      toDo.map(todo =>
        todo.id === id ? {...todo, test: "vui long nhap"} : todo
      )
    )
    setIDEdit(null)
    setEditText("")
    return;
  }

  setToDo(
    toDo.map(todo =>
      todo.id === id ? {...todo, test: editText} : todo
    )
  )

  setIDEdit(null)
  setEditText("")
}

  return(
    <div className="toDo-Wrapper">
    <div className="card">
      <h1>YOUR TO DO</h1>
      <div className="input-container"> 
        <input type="text" placeholder="add new task" onChange={(e) => setTest(e.target.value)} value={test} onKeyDown={(e) => {if(e.key === "Enter"){Makelist();} }}/>

        <button onClick={Makelist}>+</button>

      </div>
        <div  className="toDo-List">
        {toDo.map((todo) => (
  <div key={todo.id} className="todo-wrapper">
    
    <div className={`todo-item ${todo.completed ? 'completed' : " "}`}> 
      
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {Togglecomplete(todo.id)}}
      />
          
      <div className="text">
        {iDEdit === todo.id ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <div>{todo.test}</div>
        )}
      </div>

      {iDEdit === todo.id ? (
        <button className="save" onClick={() => {saveEdit(todo.id)}}>Save</button>
      ) : (
        <button className="edit" onClick={() => {Edit(todo)}}>Edit</button>
      )}

      <button onClick={() => DeleteToDo(todo.id)} className="Delete">
        <div>x</div>
      </button>

    </div>

  </div>
))}
        <p className="remaining">Your remaining todos: {toDo.filter(todo => !todo.completed).length}</p>
        </div>
     </div>
        </div>
 
  )
}