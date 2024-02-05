import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "./demo";
function App() {

  const [todos, settodos] = useState([]);
  const [todosperpage, settodosperpage] = useState(10);
  const [currentpage,setcurrentpage]=useState(1);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      settodos(res.data);
    });
  }, []);

  const noofpages = Math.ceil(todos.length / todosperpage);

  const pages = [...Array(noofpages + 1).keys()].slice(1);

  const indexofLastTodo=currentpage*todosperpage;//3*10= 30

  const indexOfFirstTodo=indexofLastTodo-todosperpage; // 30-10=20

  const visbleTodos=todos.slice(indexOfFirstTodo,indexofLastTodo);

  const prevpagehandler=()=>{
    if(currentpage!==1){
      setcurrentpage(currentpage-1);
    }
  }

  const nextpagehandler=()=>{
    if(currentpage!==noofpages){
      setcurrentpage(currentpage+1);
    }
  }

  const pageuserselect=(event)=>{
    let pageNumber=parseInt(`${event.target.value}`);
    settodosperpage(pageNumber);
    setcurrentpage(1);
  }

  return (
    <>
    <select onClick={pageuserselect}>
    <option>10</option>
    <option>20</option>
    <option>30</option>
    </select>
      <div>
        {visbleTodos.map((todos) => {
          return <p key={todos.id}>{todos.title}</p>;
        })}
        <span onClick={prevpagehandler}>prev</span>
        <p>{pages.map((page) => {
          return <span className={currentpage==page?"text-purple-900 text-xl":""} key={page} onClick={()=>setcurrentpage(page)}>{`${page} |`}</span>
        })}</p>
        <span onClick={nextpagehandler}>next</span>
      </div>
    </>
  );
}

export default App;
