import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from './Header';
import Todo from './Todo';
import NewTodo from './NewTodo';
import 'moment/locale/es';
const moment = require('moment');

function Home() {

  const [todosData, setTodosData] = useState({});
  const [isModal, setIsModal] = useState(false);

  // Get all the todos registered in database au lancement de la page
  useEffect (() => {
      fetch('http://localhost:3000/api/todos')
          .then(response => response.json ())
          .then(data => {
            // Sort todos by date
            data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

            // Group todos by date
            const groupedTodos = {};
            data.forEach(todo => {
              let date = moment(todo.due_date).format('L');
              if (!groupedTodos[date]) {
                groupedTodos[date]= [todo];
              } else {
                groupedTodos[date].push(todo)
              }
            });
          setTodosData(groupedTodos);
          })
  }, []);


  const todos = Object.keys(todosData).map(date => {
    return (  <div key={date} className='mb-5'>
                {todosData[date].map((data,i) => {
                  console.log('data',data)
                  return (<Todo key={i} {...data} due_date={date}/>)
                  })}
              </div>);
  });

  // Add a new todo
  const handleAdd = () => {
    console.log('Add todo')
    setIsModal(!isModal);
  };

  const handleClose = (status) => {
    setIsModal(status)
  }

  return (
    <div className='min-h-screen flex flex-col justify-start items-center  bg-slate-300 text-xs font-light p-11'>
      <Head>
        <title>My todos planner</title>
      </Head>
      <Header/>
      <div className='w-full flex flex-wrap justify-between items-start'>
        {todos}
      </div>
      <div  className='w-10 h-10 mb-11 rounded-full bg-cyan-600 flex justify-center items-center cursor-pointer hover:bg-cyan-500'
            onClick={() => handleAdd()}>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" 
              className="w-6 h-6 stroke-white ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      {isModal && <NewTodo onRequestClose={handleClose}/>}
    </div>
  );
}

export default Home;