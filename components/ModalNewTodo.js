import { useState } from "react";
// import Tag from "./Tag";
import CalendarPicker from "./CalendarPicker";
import moment from "moment";
import "moment/locale/es";

function ModalNewTodo(props) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(props.dueDate || "");
  const [tag, setTag] = useState([]);

  // Create todo when pressing button SAVE
  const createTodo = () => {
    fetch(`http://localhost:8080/api/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dueDate: moment(date, "DD/MM/YYYY").format("YYYY-MM-DD"),
        description: description,
        tags: tag,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Update error");
        }
        return response.json();
      })
      .then(() => {
        console.log("Todo created:");
        props.onClose(false);
        props.fetchtodos();
      })
      .catch((error) => {
        console.log("Error creating todo", error);
      });
  };

  //Set new date from Calendar component
  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log("new date received", newDate);
  };

  // Close newTodo window
  const handleClose = () => {
    props.onClose(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-300 bg-opacity-60 ">
      <div className="w-80 sm:w-96 bg-white shadow-2xl rounded-lg p-5 flex flex-col">
        <div className=" border-b mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-base sm:text-xl text-indigo-500">
              Create a new todo
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6  stroke-neutral-500 hover:stroke-indigo-600 cursor-pointer"
              onClick={() => handleClose()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <CalendarPicker
          onDateChange={handleDateChange}
          currentDate={date}
          name="calendar"
        />
        <input
          placeholder="Type your todo's description"
          onChange={(e) => setDescription(e.target.value)}
          maxLength={50}
          type="text"
          required
          name="todo description"
          className="border  rounded p-2 mb-5  text-neutral-600  outline-indigo-500 text-base"
        />
        <input
          placeholder="Type to add a new tag"
          onChange={() => setTag()}
          maxLength={50}
          type="text"
          name="tag names"
          className="border rounded p-2  text-neutral-600  outline-indigo-500 text-base"
        />
        <div className="flex justify-evenly">
          <button
            className=" w-1/3 text-indigo-500 font-semibold hover:text-indigo-600  text-base mt-8"
            onClick={() => createTodo()}
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalNewTodo;
