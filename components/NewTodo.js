import { useState } from "react";
import Tag from "./Tag";
import Calendar from './Calendar';

function NewTodo(props) {

    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

// Create todo when pressing button SAVE
    const createTodo = () => {
        console.log('click save button')
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
        <div className ='w-64 bg-white border border-slate-500/75 rounded-lg p-5 flex flex-col justify-between'>
        <div className = 'flex justify-between items-center mb-3'>
          <h2 className="font-bold text-slate-500">ADD A TODO</h2>
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-4 h-4 stroke-slate-500 hover:stroke-red-600 cursor-pointer"
                onClick={()=>handleClose()}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <Calendar onDateChange={handleDateChange} currentDate={date}/>
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
        <button className=" w-1/3 shadow rounded-full p-2 bg-cyan-600 hover:bg-cyan-800 text-stone-100 font-bold"
                onClick={() => createTodo()}>SAVE</button>
      </div>
    </div>
    );
  }
  
  export default NewTodo;
  