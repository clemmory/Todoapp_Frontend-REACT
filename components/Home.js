import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from './Header';
import Diary from './Diary';
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
    </div>
  );
}

export default Home;

