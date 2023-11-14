import { useState } from "react";
import Tag from "./Tag";
import Calendar from './Calendar';

const moment = require('moment');


function Todo(props) {

  const [isDone, setIsDone] = useState(props.status);
  const [isEdited, setIsEdited] = useState(false);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.due_date)
  const [tag, setTag] = useState('');

// Delete todo from db

  const handleDelete = () => {
    console.log('click bin')
    fetch(`http://localhost:3000/api/todos/${props.id}`,{
      method: 'DELETE',
    })
    .then (console.log('Delete successful'))
  };
  
// Change status of todo (change status to true or false)

  const handleCheck = () => {
    console.log('click check')
    fetch(`http://localhost:3000/api/todos/${props.id}`,{
      method: 'PUT',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({due_date: props.due_date,
                            description: props.description,
                            status: !isDone})
    })
    . then (response => {
      if (!response.ok) {
        throw new Error ('Update error')
      }
      setIsDone(!isDone)
      console.log('data updated')
      return response.json();
    })
  };

//Set new date from Calendar component

  const handleDateChange = (newDate) => {
    setDate(newDate)
    console.log('new date received', newDate)
  };

  // Show editable fields

  const handleEdit = () => {
    console.log('click edit todo')
    setIsEdited(!isEdited);
  }
// Remove tag associated with todo

  const removeTag = () => {
    console.log('route to remove tag')
  };

  // Save changes done in db

  const saveChanges = () => {
    console.log('click save button')
    fetch(`http://localhost:3000/api/todos/${props.id}`,{
      method: 'PUT',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({due_date: date,
                            description: description,
                            status: props.status})
    })
    . then (response => {
      if (!response.ok) {
        throw new Error ('Update error')
      }
      console.log('data updated')
      return response.json();
    })
    setIsEdited(!isEdited);
  }

// Display todo when being edited

  if(isEdited) {
    return (
      <div className ='w-64 mb-4 bg-stone-100 border border-slate-500/75 rounded-lg p-5 flex flex-col justify-between'>
      <div className = 'flex justify-between items-center mb-3'>
        <Calendar onDateChange={handleDateChange} currentDate={date}/>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className="w-4 h-4 stroke-slate-500 hover:stroke-red-600 cursor-pointer"
              onClick={()=> setIsEdited(!isEdited)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <input  defaultValue = {props.description}
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
                onClick={() => saveChanges()}>SAVE</button>
      </div>
    </div>
    )
    // Display todo component
  }else {
    return (
      <div className ='w-64 h-24 mb-4 bg-stone-100 border border-slate-500/75 rounded-lg p-3 flex flex-col justify-between'>
        <div className = 'flex justify-between items-center'>
          <p className="font-bold text-slate-500">{props.due_date}</p>
          <div className='flex'>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-4 h-4 stroke-slate-400 mr-2 hover:stroke-slate-600 cursor-pointer"
                  onClick={() => handleEdit()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-4 h-4 stroke-slate-400 hover:stroke-red-600 cursor-pointer"
                  onClick={() => handleDelete()}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          </div>
        </div>
        <div className = 'flex justify-start items-center'>
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor "
                className={`w-5 h-5 mr-2  hover:fill-green-800 cursor-pointer ${isDone ? 'fill-green-800' : 'fill-slate-300'}`}
                onClick={() => handleCheck()}>
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
          <p className={isDone ? 'line-through' : 'no-underline'}>{props.description}</p>
        </div>
        <Tag/>
      </div>
    )
  };
};

export default Todo;

