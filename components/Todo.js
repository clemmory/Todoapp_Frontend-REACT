import { useState } from "react";
import moment from "moment";
import 'moment/locale/es';
import ModalTodo from "./ModalTodo";

function Todo(props) {

    const [isDone, setIsDone] = useState(props.status);
    const [isModal, setIsModal] = useState(false);
    const fetchtodos = props.fetchtodos;
    
    // Change status of todo (change status to true or false)
    const handleCheck = () => {
        fetch(`http://localhost:3000/api/todos/${props.id}`,{
            method: 'PUT',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({  due_date: moment(props.due_date).format('L'),
                                    description: props.description,
                                    status: !isDone})
        })
        . then (response => {
            if (!response.ok) {
                throw new Error ('Update error')
            }
        })
        .then (() => {
            fetchtodos();
        })
        setIsDone(!isDone)        
    };

    // Delete todo from db
    const handleDelete = () => {
        fetch(`http://localhost:3000/api/todos/${props.id}`,{
            method: 'DELETE',
        })
        .then (() => {
            fetchtodos();
        })
        setIsModal(false) 
    };

    // Show editable fields
    const handleEdit = () => {
        console.log('click edit todo')
        setIsModal(!isModal)
    };

    const handleClose = (status) => {
        setIsModal(status)
    };

    if (isModal) {
        return ( <ModalTodo due_date = {moment(props.due_date).format('L')} description={props.description} onClose={handleClose} id={props.id} handleDeleteTodo={handleDelete} fetchtodos={fetchtodos} status={props.status}/>)

    };
        return (
            <div>
                <div className="border-b  border-slate-200 mb-3 mt-3">
                    <div className="flex justify-start items-center mb-3">
                        <div>
                            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor "
                                className={`w-5 h-5 mr-2 sm:w-6 s:h-6 hover:fill-green-500 cursor-pointer ${isDone ? 'fill-slate-300' : 'fill-slate-600'}`}
                                onClick={() => handleCheck()}>
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div    className= {`text-base sm:text-lg ${isDone ? 'line-through text-slate-300' : 'no-underline text-slate-600'} font-norma truncate cursor-pointer`}
                                onClick={() => handleEdit()} >
                                {props.description}
                        </div>
                    </div>
                </div>
                {isModal}
            </div>
            
        )

    
  };
  
  export default Todo;


//   <div className="flex items-center">
//   <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
//       className="w-4 h-4 stroke-slate-300 mr-2 hover:stroke-sky-600 cursor-pointer"
//       onClick={() => handleEdit()}>
//       <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
//   </svg>
//   <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
//       className="w-4 h-4 stroke-slate-300 hover:stroke-red-600 cursor-pointer"
//       onClick={() => handleDelete()}>
//       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//   </svg>
// </div>