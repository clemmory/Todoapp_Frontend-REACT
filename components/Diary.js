import React, { useEffect, useState } from 'react';
import moment from "moment";
import TodoTest from "./TodoTest";

function Diary() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(moment().startOf('month'));
    const [todosData, setTodosData] = useState([]);

    // Get all the todos registered in database au lancement de la page
    useEffect (() => {
        fetch('http://localhost:3000/api/todos')
            .then(response => response.json ())
            .then(data => {
            // Sort todos by date
            data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
            setTodosData(data);
            })
    }, []);
    
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

    const handleSelectionDate = () => {
        console.log('selected date', selectedDate)
    };

    const generateCalendar = () => {
        const startOfMonth = currentDate.clone().startOf('month').startOf('week');
        const endOfMonth = currentDate.clone().endOf('month').endOf('week');
        const calendar = [];
        let week = [];

        for (let day = startOfMonth.clone(); day.isBefore(endOfMonth); day.add(1, 'day')) {
            const isInCurrentMonth = day.isSame(currentDate, 'month');

            week.push({
                date:day.clone(), 
                isInCurrentMonth: isInCurrentMonth, 
                todos: [],});

            if (week.length === 7 || day.isSame(endOfMonth, 'day')) {
            calendar.push(week);
            week = [];
          }
        }

        calendar.forEach((week, weekIndex) => {
                for (let items of week) {
                    const formatedDate = items.date.format('DD MM YYYY')
                    const todosForDay = todosData.find(e => moment(e.due_date).format('DD MM YYYY') === formatedDate);
                    if (todosForDay) {
                        items.todos = {
                            id:todosForDay.id, 
                            description:todosForDay.description, 
                            status:todosForDay.status,
                            due_date:todosForDay.due_date,
                        }
                        console.log('test',items)
                    }                     
                }
        })

        return calendar;
    };

    const calendar = generateCalendar();


    const calendarDisplay = calendar.map((week,weekIndex) => {
        return (
            <React.Fragment key={weekIndex}>
                {week.map((dayInfo,dayIndex) => { 
                    const {date, isInCurrentMonth, todos} = dayInfo;
                    return (
                        <div key={dayIndex}>
                            <div className={`flex justify-between text-base border-b mb-2 ${isInCurrentMonth ? 'text-slate-600  border-slate-600 cursor-pointer hover:border-indigo-600 hover:text-indigo-600 hover:border-b-2' : 'text-gray-400'}`}>
                                <p className="font-bold  mr-4 mb-2" onClick={()=> handleSelectionDate()}>{date.format('DD')}.</p>
                                <p className="">{date.format('dddd')}</p>
                            </div>
                            <TodoTest description={todos.description} {...dayInfo}/>
                        </div>
                        )
                })}
            </React.Fragment> 
        )});
    

    return (
    <div className="bg-white rounded-lg p-5 min-w-full">
        <div className="flex justify-start items-center mb-5">
            <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 stroke-indigo-600 mr-4  hover:stroke-slate-500 cursor-pointer"
                    onClick={()=>handlePrevMonth()} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <h2 className=" font-bold text-xl text-indigo-600">{currentDate.format('MMMM YYYY')}</h2>
            <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 stroke-indigo-600 ml-4 hover:stroke-slate-500 cursor-pointer"
                    onClick={()=>handleNextMonth()}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
      </div>
      <div className='grid grid-cols-7 gap-4'>
        {calendarDisplay}
      </div>
      </div>
    );
  }
  
  export default Diary;
  