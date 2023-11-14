import Head from 'next/head';
import { useEffect, useState } from 'react';

const moment = require('moment');
import 'moment/locale/es';

import Todo from './Todo';


function Home() {

  const [todosData, setTodosData] = useState([]);

  // Get all the todos registered in database au lancement de la page
  useEffect (() => {
      fetch('http://localhost:3000/api/todos')
          .then(response => response.json ())
          .then(data => {
            // Sort data by date
            data.sort((a,b) => {
              let firstDate = new Date(a.due_date),
                  secondDate = new Date(b.due_date);
              if (firstDate < secondDate) return -1;
              if (firstDate > secondDate) return 1;
              return 0;
            })
            setTodosData(data)
          });
  }, []);

  const todos = todosData.map((data,i) => {
    const formatedDate = moment(data.due_date).format('L');
    return <Todo key={i} {...data} due_date={formatedDate}/>;
  });

  // Add a new todo
  const handleAdd = () => {
    console.log('Add todo')
  };

  return (
    <div className='min-h-screen flex flex-col justify-evenly items-center  bg-slate-300 text-xs font-light'>
      <Head>
        <title>My todos planner</title>
      </Head>
        <div className='w-full flex flex-wrap justify-evenly items-start'>
          {todos}
        </div>
        <div  className='w-10 h-10 rounded-full bg-cyan-600 flex justify-center items-center cursor-pointer hover:bg-cyan-500'
              onClick={() => handleAdd()}>
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" 
                className="w-6 h-6 stroke-white ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
    </div>
  );
}

export default Home;
