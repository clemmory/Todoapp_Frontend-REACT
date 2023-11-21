import { useState } from "react";
// import Tag from "./Tag";
import CalendarPicker from './CalendarPicker';

function ModalNewTodo (props) {

    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

// Create todo when pressing button SAVE
    const createTodo = () => {
        fetch(`http://localhost:3000/api/todos`,{
          method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify({due_date: date,
                                description: description,
                                status: false})
        })
        . then (response => {
          if (!response.ok) {
            throw new Error ('Update error')
          }
          console.log('todo created')
          return response.json();
        })
        setDescription('');
        setDate(new Date());
        props.onRequestClose(false)
      };

//Set new date from Calendar component
    const handleDateChange = (newDate) => {
        setDate(newDate)
        console.log('new date received', newDate)
    };

// Close newTodo window
    const handleClose = () => {
        props.onRequestClose(false)
        console.log('click close')
    };

    return (
        <div ref={ref} className ='w-64 mb-11 border border-indigo-600 rounded-lg p-5 flex flex-col justify-between'>
        <div className = 'flex justify-between items-center mb-3'>
          <h2 className="font-bold text-slate-500">Fill up to create a new todo</h2>
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-4 h-4 stroke-slate-500 hover:stroke-red-600 cursor-pointer"
                onClick={()=>handleClose()}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <CalendarPicker onDateChange={handleDateChange} currentDate={date}/>
      <input  placeholder = "Type your todo's description"
              onChange={e=> setDescription(e.target.value)}
              maxLength={50}
              type = 'text'
              required
              className="shadow border rounded p-2 mb-3"/>
      <input  placeholder = 'Type to add a new tag' 
              onChange={()=> setTag()}
              maxLength={50}
              type = 'text'
              className="shadow border rounded p-2 mb-3"/>
      <div className = 'flex items-center mb-3'>
        <Tag/>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-3 h-3 ml-1 stroke-slate-500 hover:stroke-red-600 cursor-pointer"
                onClick={()=> removeTag()}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="flex justify-evenly">
        <button className=" w-1/3 shadow rounded-full p-2 bg-indigo-600 hover:bg-indigo-800 text-stone-100 font-bold"
                onClick={() => createTodo()}>SAVE</button>
      </div>
    </div>
    );
  };
  
  export default ModalNewTodo;
  