import React, { useEffect, useState } from 'react';
import moment from "moment";
import Todo from "./Todo";
import ModalNewTodo from "./ModalNewTodo";

function Diary() {

    const [currentDate, setCurrentDate] = useState(moment().startOf('month'));
    const [todosData, setTodosData] = useState([]);
    const [today, setToday]= useState(new Date());
    const [isModalNewTodo, setIsModalNewTodo] = useState(false);
    const [selectedDate, setSelectedDate] = useState( new Date ());

    const fetchtodos = () => {
        fetch('http://localhost:3000/api/todos')
                .then(response => response.json ())
                .then(data => {
                    // Sort todos by date
                    data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                    setTodosData(data);
                })
                .catch(error => {
                    console.log('error getting datas', error)
                })
        };
    
    // Get all the todos registered in database au lancement de la page
    useEffect (() => {
        fetchtodos();
    }, [])
    
    // Verifier si le mois precedent est decembre de l'annee precedente.
    const handlePrevMonth = () => {
        const prevMonth = currentDate.clone().subtract(1,'month');
        if (prevMonth.month() === 12){
            setCurrentDate(currentDate.clone().subtract(1,'year').endOf('year'));
        }else{
            setCurrentDate(prevMonth)
        }
    };

    // Verifier si le mois suivant est janvier de l'annee suivante.
    const handleNextMonth = () => {
        const nextMonth = currentDate.clone().add(1,'month');
        if (nextMonth.month() === 0){
            setCurrentDate(currentDate.clone().add(1,'year').startOf('year'));
        }else{
            setCurrentDate(nextMonth)
        }
    };

    // Affichage calendrier
    const generateTwoWeeksCalendar = () => {

        const startOfMonth = currentDate.clone().startOf('month').startOf('week');
        const endOfMonth = currentDate.clone().endOf('month').endOf('week');
        const calendar = [];
        let week = [];

        for (let day = startOfMonth.clone(); day.isBefore(endOfMonth); day.add(1, 'day')) {
            const isInCurrentMonth = day.isSame(currentDate, 'month');
            const isCurrentDate = day.isSame(today,'day')

            week.push({
                date:day.clone(), 
                isInCurrentMonth: isInCurrentMonth,
                isCurrentDate : isCurrentDate,
                todos: [],});

            if (week.length === 7 || day.isSame(endOfMonth, 'day')) {
                calendar.push(week);
                week = [];
          }
        };

        // Associer les todos correspondantes a chaque jour du calendrier
        calendar.forEach((week, weekIndex) => {
            for (let items of week) {
                const formatedDate = items.date.format('L')
                const todosForDay = todosData.filter(e => moment(e.due_date).format('L') === formatedDate);
                if (todosForDay.length > 0) {
                    items.todos= todosForDay.map(todo => ({
                        id:todo.id,
                        description:todo.description, 
                        status:todo.status,
                        due_date:todo.due_date,
                    }))
                }  
            } 
        })
        return calendar;
    };

    const calendar = generateTwoWeeksCalendar();



    const handleClose = (status) => {
        setIsModalNewTodo(status)
    };

    const calendarDisplay = calendar.map((week,weekIndex) => {
        return (
            <React.Fragment key={weekIndex}>
                {week.map((dayInfo,dayIndex) => { 
                    const {date, isInCurrentMonth, isCurrentDate, todos} = dayInfo;
                    let todosToDisplay;

                    const handleAddTodo = () => {
                        setIsModalNewTodo(!isModalNewTodo);
                        console.log('dayinfo', dayInfo.date)
                        setSelectedDate( dayInfo.date)
                    };

                    // Display todos for the day
                    if (todos.length > 0) {
                        todosToDisplay = todos.map((todo, todoIndex) => {
                        return ( <Todo key={todoIndex} description={todo.description} {...todo} fetchtodos={fetchtodos}/>);
                        });
                    }
                    // Display empty lines 
                    const emptyLines = Array.from({length: (3-todos.length)}).map((_, index) => {
                        return ( <div className = 'flex justify-start items-center border-b border-slate-200 mb-3 mt-3' key={index}>
                                    <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" 
                                            className="w-4 h-4 mb-3 stroke-slate-200 hover:cursor-pointer hover:stroke-sky-500"
                                            onClick={() => handleAddTodo()}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>)
                    });
                    return (
                        <div key={dayIndex}>
                            <div className={`flex justify-between text-xl border-b-2 ${isCurrentDate ? 'border-b-2 border-indigo-600' : isInCurrentMonth ? 'text-slate-600  border-slate-600' : 'text-gray-400'}`}>
                                <p className={`font-bold  mr-4 mb-2 ${isCurrentDate ? 'text-indigo-600 border-indigo-600' : ''}`}>{date.format('DD')}.</p>
                                <p className={` ${isCurrentDate ? 'text-indigo-600' : ''}`}>{date.format('dddd')}</p>
                            </div>
                            {todosToDisplay}
                            {emptyLines}
                        </div>
                        )
                })}
            </React.Fragment> 
        )});
    
    return (
        <div className="bg-white rounded-lg p-8 min-w-full">
            <div className="flex justify-start items-center mb-8">
                <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-indigo-600 mr-4  hover:stroke-slate-500 cursor-pointer"
                        onClick={()=>handlePrevMonth()} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <h2 className=" font-bold text-3xl text-indigo-600">{currentDate.format('MMMM YYYY')}</h2>
                <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-indigo-600 ml-4 hover:stroke-slate-500 cursor-pointer"
                        onClick={()=>handleNextMonth()}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <div className='grid grid-cols-7 gap-4'>
                {calendarDisplay}
            </div>
            <div>
                {isModalNewTodo ? <ModalNewTodo onClose = {handleClose} due_date = {selectedDate} fetchtodos={fetchtodos}/> : null}
            </div>
        </div>
    );
  }
  
  export default Diary;
  
