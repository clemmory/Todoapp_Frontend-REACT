import { useState } from "react";
// import Tag from "./Tag";
import CalendarPicker from './CalendarPicker';
import moment from "moment";
import 'moment/locale/es';


function ModalNewTodo (props) {

    const [description, setDescription] = useState('');
    const [date, setDate] = useState(props.due_date);

// Create todo when pressing button SAVE
    const createTodo = () => {
        fetch(`http://localhost:3000/api/todos/`,{
          method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify({due_date: moment(date).format('L'),
                                description: description,
                                status: false})
        })
        . then (response => {
          if (!response.ok) {
            throw new Error ('Update error')
          }
          return response;
        })
        .then (() => {
          props.onClose(false);
          props.fetchtodos();
          })
          .catch (error => {
              console.log('Error updating todo',error)
          });
      };

//Set new date from Calendar component
    const handleDateChange = (newDate) => {
        setDate(newDate)
        console.log('new date received', newDate)
    };

// Close newTodo window
    const handleClose = () => {
        props.onClose(false);
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-600 bg-opacity-70 ">
        <div className ='w-80 sm:w-96 mb-4 bg-white border shadow rounded-lg p-8 flex flex-col'>
          <div className = 'flex justify-between items-center mb-5'>
            <h2 className="font-bold text-xl sm:text-2xl text-indigo-600">Create a new todo</h2>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-6 h-6 stroke-slate-500 hover:stroke-red-600 cursor-pointer"
                  onClick={()=>handleClose()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <CalendarPicker onDateChange={handleDateChange} currentDate={date} name='calendar'/>
          <input  placeholder = "Type your todo's description"
                  onChange={e=> setDescription(e.target.value)}
                  maxLength={50}
                  type = 'text'
                  required
                  name = 'todo description'
                  className="shadow border rounded p-2 mb-5  stroke-slate-600 font-bold outline-sky-500"/>
          <input  placeholder = 'Type to add a new tag' 
                  onChange={()=> setTag()}
                  maxLength={50}
                  type = 'text'
                  name = 'tag names'
                  className="shadow border rounded p-2 mb-5 text-slate-600 font-bold outline-sky-500"/>
          <div className="flex justify-evenly">
            <button className=" w-1/3 shadow rounded-full p-2 bg-indigo-600 hover:bg-indigo-800 text-stone-100 font-bold text-base"
                    onClick={() => createTodo()}>SAVE</button>
          </div>
        </div>
    </div>

    );
  };
  
  export default ModalNewTodo;
  