import { useState } from "react";

function TodoTest(props) {

    const [isDone, setIsDone] = useState(false);

    
    // Change status of todo (change status to true or false)
    const handleCheck = () => {
        console.log('click check')
        setIsDone(!isDone)
        // fetch(`http://localhost:3000/api/todos/${props.id}`,{
        //     method: 'PUT',
        //     headers: { 'Content-Type' : 'application/json'},
        //     body: JSON.stringify({  due_date: props.due_date,
        //                             description: props.description,
        //                             status: !isDone})
        //     })
        // . then (response => {
        //     if (!response.ok) {
        //         throw new Error ('Update error')
        //     }
        // setIsDone(!isDone)
        // console.log('data updated')
        // return response.json();
        // })
    };
    if (props.description) {

        return (
            <div>
                <div className = 'flex justify-start items-center mb-2 border-b border-slate-200'>
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor "
                        className={`w-4 h-4 mr-2  hover:fill-green-500 cursor-pointer ${isDone ? 'fill-green-600' : 'fill-slate-300'}`}
                        onClick={() => handleCheck()}>
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <p className= {`text-xs mb-2 ${isDone ? 'line-through' : 'no-underline'}`}>{props.description}</p>
                </div>
            </div>
            
        )

    } else {
        const emptyLines = [];
        for (let i=0; i<5; i++) {
            emptyLines.push (
                <div className = 'flex justify-start items-center border-b border-slate-200 mb-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mb-2 stroke-slate-200 hover:cursor-pointer hover:stroke-cyan-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            )
         } return (
            <div>
                {emptyLines}
            </div>
         )
    }
  };
  
  export default TodoTest;


