import { useState } from "react";
import CalendarPicker from './CalendarPicker';
// import Tag from "./Tag";
import moment from "moment";
import 'moment/locale/es';

function ModalTodo(props) {

    const [description, setDescription] = useState(props.description);
    const [date, setDate] = useState(props.due_date);
    const [tag, setTag] = useState('');

    // Remove tag associated with todo
    const removeTag = () => {
        console.log('route to remove tag')
    };

    // Save changes done in db
    const saveChanges = () => {
            fetch(`http://localhost:3000/api/todos/${props.id}`,{
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({due_date: date, description: description, status: props.status})
            })
                . then (response => {
                    if (!response.ok) {
                        throw new Error ('Update error')
                    }
                    console.log('data updated')
                    return response.json();
                })
                props.onClose(false);
      };

    //Set new date from Calendar component
    const handleDateChange = (newdate) => {
        const formatedDate = moment(newdate).format('L');
        setDate(formatedDate)
        console.log('new date received', formatedDate)
    };

    const handleCloseModal = () => {
        props.onClose(false)
    }


        return (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-600 bg-opacity-70 ">
                <div className ='w-96 mb-4 bg-white border shadow rounded-lg p-8 flex flex-col'>
                    <div className = 'flex justify-between items-center mb-5'>
                        <h2 className="font-bold text-2xl text-indigo-600">Edit your todo</h2>
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-6 h-6 stroke-slate-600 hover:stroke-indigo-600 cursor-pointer"
                                onClick={handleCloseModal}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <CalendarPicker onDateChange={handleDateChange} currentDate={date}/>
                    <input  defaultValue = {props.description}
                            onChange={e=> setDescription(e.target.value)}
                            maxLength={50}
                            type = 'text'
                            required
                            className="shadow border rounded p-2 mb-5 text-slate-600 font-bold outline-sky-500"/>
                    <input  placeholder = 'Type to add a new tag' 
                            onChange={()=> setTag()}
                            maxLength={50}
                            type = 'text'
                            className="shadow border rounded p-2 mb-5  stroke-slate-600 outline-sky-500"/>
                    {/* <div className = 'flex items-center mb-3'>
                        <Tag/>
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-3 h-3 ml-1 stroke-slate-600 hover:stroke-red-600 cursor-pointer"
                                onClick={()=> removeTag()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div> */}
                    <div className="flex justify-evenly">
                        <button className=" w-1/3 shadow rounded-lg p-2 bg-indigo-600 hover:bg-indigo-500 text-stone-100 font-bold"
                                onClick={() => saveChanges()}>SAVE</button>
                    </div>
                </div>

            </div>
            
        )

    
  };
  
  export default ModalTodo;

