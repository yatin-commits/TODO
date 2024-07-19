import 'react-notifications/lib/notifications.css';
import { useState } from 'react';
import './App.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {
  const [theme, setTheme] = useState('dark');

  const darkThemeStyles = {
    backgroundColor: 'black',
    color: 'white',
    
  };

  const lightThemeStyles = {
    backgroundColor: 'white',
    color: 'black',
    
  };

  const darkButtonStyles = {
    backgroundColor: 'white',
    color: 'black',
    border:"2px solid black"
  };

  const lightButtonStyles = {
    backgroundColor: 'black',
    color: 'white',
    border:"2px solid white"
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const [todolist, setTodoList] = useState([]);

  const saveTodoList = (event) => {
    event.preventDefault();
    let todoName = event.target.todoName.value;

    if (todoName === '') {
      NotificationManager.error('Please Enter Some Task!', "Error!");
      return;
    }

    if (!todolist.includes(todoName)) {
      setTodoList([...todolist, todoName]);
      event.target.todoName.value = '';
    } else {
      alert("Todo Name Already Exists!!");
    }
  };

  let list = todolist.map((v, index) => {
    return (
      <TodoListComponent 
        value={v} 
        key={index} 
        indexNumber={index} 
        todolist={todolist} 
        setTodoList={setTodoList}
      />
    );
  });

  const currentThemeStyles = theme === 'dark' ? lightThemeStyles : darkThemeStyles;
  const currentButtonStyles = theme === 'dark' ? darkThemeStyles : lightButtonStyles;

  return (
    <div style={currentThemeStyles}>
      <NotificationContainer />
      <div className='sub-container'>
        <h1 className='heading'>
          Todo List.
          <sup>
            <button 
              onClick={toggleTheme} 
              style={currentButtonStyles} 
              className="theme-toggle"
            >
              {theme === 'light' ? 'Dark' : 'light'}
            </button>
          </sup>
        </h1>
      </div>
      <div className='container'>
        <form onSubmit={saveTodoList}>
          <input type='text' name='todoName' placeholder='Enter Task' />
          <button type='submit'>Save</button>
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

function TodoListComponent({ value, indexNumber, todolist, setTodoList }) {
  const [strikeThrough, setStrike] = useState(false);

  const strike = () => {
    setStrike(!strikeThrough);
  };

  const deleteRow = () => {
    let finalData = todolist.filter((v, i) => i !== indexNumber);
    setTodoList(finalData);
  };

  return (
    <li className={strikeThrough ? 'completeTodo' : ''} onClick={strike}>
      {indexNumber + 1}. {value} <span onClick={deleteRow}>&times;</span>
    </li>
  );
}

export default App;
