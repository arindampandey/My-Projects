import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = JSON.parse(localStorage.getItem("todos"))
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const savetolocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }

  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newtodos)
    savetolocal()
  }

  const handledel = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newtodos)
    savetolocal()
  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    savetolocal()
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos)
    savetolocal()
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className='box'>
          <div className="addtodo">
            <h2>Add a Task</h2>
            <input onChange={handlechange} value={todo} type="text" className='in col' />
            <button onClick={handleadd} disabled={todo.length <= 3} className='add save col'>Save</button>
          </div>
          <input onChange={togglefinished} className='sf' type="checkbox" checked={showfinished} /> Show Finished
          <h2 className='yt'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='msg'>No Tasks to display</div>}
            {todos.map(item => {
              return (showfinished || !item.iscompleted) && <div key={item.id} className="todo">
                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} id="" />
                <div className={`text ${item.iscompleted ? "line" : ""}`}>{item.todo}</div>
                <div className="buttons">
                  <button onClick={(e) => { handleedit(e, item.id) }} className='add'><MdEdit /></button>
                  <button onClick={(e) => { handledel(e, item.id) }} className='add'><MdDelete /></button>
                </div>
              </div>
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
