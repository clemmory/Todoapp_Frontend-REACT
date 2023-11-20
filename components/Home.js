import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from './Header';
import Diary from './Diary';
import Todo from './Todo';
import NewTodo from './NewTodo';
import { useRef } from 'react';
import 'moment/locale/fr';
import moment from 'moment';

function Home() {

  const [todosData, setTodosData] = useState({});
  const [isModal, setIsModal] = useState(false);

  const newTodoRef = useRef(null);

  const scrollToNewTodo = () => {
    if (newTodoRef.current) {
      newTodoRef.current.scrollIntoView({ behavior: 'smooth', top: newTodoRef.current.offsetTop });
    }
  };



  // Get all the todos registered in database au lancement de la page
  // useEffect (() => {
  //     fetch('http://localhost:3000/api/todos')
  //         .then(response => response.json ())
  //         .then(data => {
  //           // Sort todos by date
  //           data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  //           // Group todos by date
  //           const groupedTodos = {};
  //           data.forEach(todo => {
  //             let date = moment(todo.due_date).format('L');
  //             if (!groupedTodos[date]) {
  //               groupedTodos[date]= [todo];
  //             } else {
  //               groupedTodos[date].push(todo)
  //             }
  //           });
  //         setTodosData(groupedTodos);
  //         })
  // }, []);


  const todos = Object.keys(todosData).map(date =>{
    return (  <div key={date} className='mb-5'>
                {todosData[date].map((data,i) => {
                  return (<Todo key={i} {...data} due_date={date}/>)
                  })}
              </div>);
  });

  // Add a new todo
  const handleAdd = () => {
    console.log('Add todo')
    setIsModal(!isModal);
    scrollToNewTodo(newTodoRef)
  };

  const handleClose = (status) => {
    setIsModal(status)
  }

  return (
    <div className='font-montserrat min-h-screen flex flex-col justify-start items-center bg-sky-500 text-xs font-light p-11'>
        <Header/>
        <Diary/>
        {/* <div className='flex flex-wrap justify-between items-start'>{todos}</div>
      
      {isModal && <NewTodo onRequestClose={handleClose} ref={newTodoRef}/>} */}
    </div>
  );
}

export default Home;