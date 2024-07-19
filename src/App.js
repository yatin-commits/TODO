import 'react-notifications/lib/notifications.css';
import { useState } from 'react';
import './App.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Toggle from './toggle';

let clas;

function App() {


  const [theme,setTheme]=useState("dark");

  

  
 
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
  let appStyles;
  const toggleTheme=()=>
    {
      
      
      if(theme==="dark")
      {
        setTheme("light");
         clas="light";
         
         appStyles = {
          backgroundColor: 'black',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
      };
      console.log(appStyles);
      }
      else{
        setTheme("dark");
         clas="dark";
  
      }
    }
  
  
  

  return (
    
    <div >
      
      <NotificationContainer/>
      <div style={appStyles} className='sub-container'>
   <h1 className='heading'>Todo List<sup><button  onClick={toggleTheme} className={clas} >{theme}</button></sup></h1></div>
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
