import { useState } from "react";

function SideBar (props) {


  const handleClose = ()=> {
    console.log('click')
    props.onClose()
  }


  return (
    <div className= 'fixed top-0 left-0 h-full w-64 p-10 bg-indigo-600 text-white flex flex-col justify-start'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My tags</h2>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-6 h-6 stroke-white hover:stroke-red-600 cursor-pointer"
                    onClick={()=>handleClose()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div>
        <p>Tag 1</p>
        <p>Tag 2</p>
      </div>

    </div>
  );
};

export default SideBar;

// z-50 transform transition-transform duration-300
