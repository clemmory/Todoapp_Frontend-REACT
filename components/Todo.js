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
        setIsDone(!isDone)

        fetch(`http://localhost:8080/api/todos/${props.id}`,{
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
        
    };

    // Delete todo from db
    const handleDelete = () => {
        fetch(`http://localhost:8080/api/todos/${props.id}`,{
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
                <div className="border-b  border-neutral-300 mb-3 mt-3">
                    <div className="flex justify-start items-center mb-3">
                        <div>
                            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor "
                                className={`w-5 h-5 mr-2 sm:w-6 s:h-6 hover:fill-indigo-500 cursor-pointer ${isDone ? 'fill-neutral-300' : 'fill-indigo-300'}`}
                                onClick={() => handleCheck()}>
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div    className= {`text-base ${isDone ? 'line-through text-neutral-300' : 'no-underline text-neutral-600'} font-norma truncate cursor-pointer`}
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

