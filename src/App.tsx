import { useCallback, useState } from "react"
import './index.css'

export default function App(){
  const [toDo, setToDo] = useState([])
  const [test, setTest] = useState("")

  function Makelist(){
    //cái  test.trim thông thường nó reder ra chuỗi mới xóa dấu " " khi cho ! vào no sẽ cố ép thành kiểu boolen
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

  return(
    <div className="toDo-Wrapper">
    <div className="card">
      <h1>YOUR TO DO</h1>
      <div className="input-container"> 
        <input type="text" placeholder="add new task" onChange={(e) => setTest(e.target.value)} value={test}/>
        <button onClick={Makelist}>+</button>
      </div>
        <div  className="toDo-List">
        {toDo.map((todo) => <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : " "}`}> 
          <input type="checkbox" checked = {todo.complete} onChange={() => {Togglecomplete(todo.id)}}/> <div className="text">{todo.test}</div> <button onClick={() => DeleteToDo(todo.id)} className="Delete"><div>x</div></button></div>)}
        
        
        
        
        <p className="remaining">Your remaining todos: {toDo.filter(todo => !todo.completed).length}</p>
        </div>
     </div>
        </div>
 
  )
}