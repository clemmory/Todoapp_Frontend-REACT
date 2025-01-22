import React, { useEffect, useState, useRef } from 'react';
import moment from "moment";
import 'moment/locale/es';
import Todo from "./Todo";
import ModalNewTodo from "./ModalNewTodo";


function Diary() {

    const [currentDate, setCurrentDate] = useState(moment().startOf('month'));
    const [todosData, setTodosData] = useState([]);
    const [today, setToday]= useState(new Date());
    const [isModalNewTodo, setIsModalNewTodo] = useState(false);
    const [selectedDate, setSelectedDate] = useState( new Date ());
    const [startOfMonth, setStartOfMonth] = useState(currentDate.clone().startOf('month').startOf('week'));
    const [endOfMonth, setEndOfMonth] = useState(currentDate.clone().endOf('month').endOf('week'));

    const topOfCalendarRef = useRef(null);

    const fetchtodos = () => {
        fetch('http://localhost:8080/api/todos/')
                .then(response => response.json ())
                .then(data => {
                    // Sort todos by date
                    data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                    setTodosData(data);
                    console.log(data)

                })
                .catch(error => {
                    console.log('error getting datas', error)
                })
        };

    useEffect(() => {

        // Function to update startOfMonth and endOfMonth based on currentDate
        const updateStartAndEndOfMonth = () => {
          let newStartOfMonth = currentDate.clone().startOf('month').startOf('week');
          let newEndOfMonth = currentDate.clone().endOf('month').endOf('week');
    
          if (window.matchMedia('(max-width:1023px)').matches) {
            newStartOfMonth = currentDate.clone();
            newEndOfMonth = currentDate.clone().endOf('month');
          }
    
          setStartOfMonth(newStartOfMonth);
          setEndOfMonth(newEndOfMonth);
        };

        // Get all the todos registered in database au lancement de la page
        fetchtodos();
        updateStartAndEndOfMonth();

        // Scroll to the current month after updating startOfMonth and endOfMonth
        if (topOfCalendarRef.current) {
            setTimeout(() => {
                const todayElement = topOfCalendarRef.current.querySelector('.today');
                if (todayElement) {
                    todayElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    topOfCalendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        };
      }, [currentDate]); 

    
    // Verifier si le mois precedent est decembre de l'annee precedente.
    const handlePrevMonth = () => {
        const prevMonth = currentDate.clone().subtract(1,'month');
        if (prevMonth.month() === 11){
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

        // Affichage calendrier ecrans lg to 2xl (>1024px)
        const generateCalendar = () => {
            const calendar = [];
            let week = [];
    
            for (let day = startOfMonth.clone(); day.isBefore(endOfMonth); day.add(1, 'day')) {
                const isInCurrentMonth = day.isSame(currentDate, 'month');
                const isCurrentDate = day.isSame(today,'day')
                const isBeforeToday = day.isBefore(today,'day')
    
                week.push({
                    date:day.clone(), 
                    isInCurrentMonth: isInCurrentMonth,
                    isCurrentDate : isCurrentDate,
                    isBeforeToday : isBeforeToday,
                    todos: [],});
    
                if (week.length === 7 || day.isSame(endOfMonth, 'day')) {
                    calendar.push(week);
                    week = [];
              }
            };
    
            // Associate todos with respective calendar days
            calendar.forEach((week, weekIndex) => {
                for (let items of week) {
                    const formatedDate = items.date.format('L')
                    const todosForDay = todosData.filter(e => moment(e.dueDate).format('L') === formatedDate);
                    if (todosForDay.length > 0) {
                        items.todos= todosForDay.map(todo => ({
                            id:todo.id,
                            description:todo.description, 
                            status:todo.status,
                            due_date:todo.dueDate,
                        }))
                    }  
                } 
            })
            return calendar;
        };

    const calendar = generateCalendar();

    const handleClose = (status) => {
        setIsModalNewTodo(status)
    };

    const handleScrollUp = () => {
        console.log('click')
        if (topOfCalendarRef.current){
        topOfCalendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


    const calendarDisplay = calendar.map((week,weekIndex) => {
        return (
            <React.Fragment key={weekIndex}>
                {week.map((dayInfo,dayIndex) => { 
                    const {date, isInCurrentMonth, isCurrentDate, isBeforeToday, todos} = dayInfo;
                    let todosToDisplay;

                    const todayClass = isCurrentDate ? 'today' : '';

                    const handleAddTodo = () => {
                        setIsModalNewTodo(!isModalNewTodo);
                        setSelectedDate( dayInfo.date)
                    };

                    // Display todos for the day
                    if (todos.length > 0) {
                        todosToDisplay = todos.map((todo, todoIndex) => {
                        return ( <Todo key={todoIndex} description={todo.description} id={todo.id} status={todo.status} {...todo} fetchtodos={fetchtodos}/>);
                        });
                    }
                    // Display empty lines 
                    const emptyLines = Array.from({length: (3-todos.length)}).map((_, index) => {
                        return ( <div className = 'flex justify-start items-center border-b border-neutral-300 mb-3 mt-3' key={index}>
                                    <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" 
                                            className="w-6 h-6 mb-3 stroke-neutral-300 hover:cursor-pointer hover:stroke-indigo-500"
                                            onClick={() => handleAddTodo()}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>)
                    });

                    return (
                        <div key={dayIndex} className={todayClass}>
                            <div className={`flex justify-start text-lg xs:text-xl lg:justify-between border-b-2 font-regular ${isCurrentDate && isInCurrentMonth ?' border-indigo-500': isBeforeToday ? 'text-neutral-300' : isInCurrentMonth ? 'text-neutral-600  border-neutral-600'  : 'text-neutral-300'}`}>
                                <p className={` mr-4 mb-2 font-semibold ${isInCurrentMonth && isCurrentDate ? ' text-indigo-500' : ''}`}>{date.format('DD')}.</p>
                                <p className={`lg:max-2xl:hidden ${isInCurrentMonth && isCurrentDate ? 'text-indigo-500 font-medium' : ''}`}>{date.format('dddd')}</p>
                                <p className={`hidden lg:max-2xl:inline ${isInCurrentMonth && isCurrentDate ? 'text-indigo-500 font-medium' : ''}`}>{date.format('ddd')}</p>

                            </div>
                            {todosToDisplay}
                            {emptyLines}
                        </div>
                        )
                })}
            </React.Fragment> 
        )});
    
    return (
        <div className=" bg-white shadow-2xl p-5 lg:pt-10 min-w-full h-full  flex flex-col justify-between ">
            <div className="flex justify-center items-center mb-5 lg:mb-11 ">
                <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-8 lg:h-8 stroke-indigo-500 mr-5  hover:stroke-indigo-600 cursor-pointer"
                        onClick={()=>handlePrevMonth()} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <h2 className=" font-medium text-xl sm:text-2xl lg:text-3xl text-indigo-500">{(currentDate.format('MMMM YYYY')).charAt(0).toUpperCase()+(currentDate.format('MMMM YYYY')).slice(1)}</h2>
                <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-8 lg:h-8 stroke-indigo-500 ml-5 hover:stroke-indigo-600 cursor-pointer"
                        onClick={()=>handleNextMonth()}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <div className='overflow-y-auto h-96 grow ::webkit-scrollbar' >
                <div className='grid gap-4 grid-cols-1 lg:grid-cols-7 sm:gap-8' ref={topOfCalendarRef}>
                        {calendarDisplay}
                </div>
            </div>
            <div className='flex justify-end'>
                <div className='rounded-full bg-indigo-500 w-10 h-10 flex justify-center items-center lg:hidden'>
                    <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
                            className="w-6 h-6 stroke-white"
                            onClick={() => handleScrollUp()}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
            </div>
            <React.Fragment>
                {isModalNewTodo ? <ModalNewTodo onClose = {handleClose} dueDate = {selectedDate} fetchtodos={fetchtodos}/> : null}
            </React.Fragment>
        </div>
    );
  }
  
  export default Diary;
  
