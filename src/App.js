import 'react-notifications/lib/notifications.css';
import { useState } from 'react';
import './App.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {

 
  const [todolist,setTodoList]=useState([]);
  // let[]
  

  const saveTodoList=(event)=>
  {
    
    let todoName =event.target.todoName.value;
    
    
    if(todoName==="")
    {
      NotificationManager.error('Please Enter Some Task!',"Error!");
      
    }
    if(!todolist.includes(todoName)&&(todoName!==""))
    {
      let finalTodoList=[...todolist,todoName];
      setTodoList(finalTodoList);
      event.target.todoName.value="";
    }
    
    if(todolist.includes(todoName)){
      alert("Todo Name Already Exists!!")
    }
    
    event.preventDefault();

  }

  let list=todolist.map((v,index)=>{
    return(<TodoListComponent value={v} key={index} indexNumber={index} 
      todolist={todolist} 
      setTodoList={setTodoList}/>)
  })

  return (
    <div >
      <NotificationContainer/>
   <h1 className='heading'>Todo List</h1>
      <div className='container'>
   <form onSubmit={saveTodoList}>
    <input type='text' name='todoName' placeholder='Enter Task'></input><button>Save</button>

   </form>
   </div>

   <div className='outerDiv'>

    <ul>
      {list}
    
    </ul>
   </div>
   </div>
 
  );
}




function TodoListComponent({value,indexNumber,todolist,setTodoList})
{
  const [strikeThrough,setStrike]=useState(false);
  function strike()
{
  setStrike(!strikeThrough)

}
  const deleteRow=()=>{
    let finalData=todolist.filter((v,i)=>i!==indexNumber)
    
    setTodoList(finalData)
    
  
  }
  return (
    <li className={strikeThrough?"completeTodo":" "} onClick={strike}>{indexNumber+1} . {value}  <span onClick={deleteRow}>&times;</span></li>

  )
}

export default App;
