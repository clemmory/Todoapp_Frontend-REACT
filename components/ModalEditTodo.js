import { useState } from "react";
import CalendarPicker from "./CalendarPicker";
// import Tag from "./Tag";
import moment from "moment";
import "moment/locale/es";

function ModalEditTodo(props) {
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.dueDate);
  const [tag, setTag] = useState([]);
  const [error, setError] = useState(null);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  // TODO
  const removeTag = () => {
    console.log("route to remove tag");
  };

  const saveChanges = async () => {
    const formattedDate = moment(
      date,
      ['YYYY-MM-DD", "DD/MM/YYYY'],
      true
    ).isValid()
      ? moment(date).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

    try {
      const response = await fetch(
        `http://localhost:8080/api/todos/${props.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dueDate: formattedDate,
            description,
            tags: tag,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors);
      }
      await response.json();
      props.onClose(false);
      props.fetchtodos();
    } catch (err) {
      setError(err.message);
      ToggleEventErrorMessage();
      console.error(err);
    }
  };

  //Set new date from Calendar component
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleCloseModal = () => {
    props.onClose(false);
  };

  const handleDeleteTodo = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      props.handleDeleteTodo();
    }
  };

  const ToggleEventErrorMessage = () => {
    setIsErrorMessage(!isErrorMessage);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-200 bg-opacity-60 ">
      <div className="w-80 sm:w-96 bg-white shadow-2xl rounded-lg p-5 flex flex-col">
        <div className=" border-b mb-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-base sm:text-xl text-indigo-500">
              Edit your todo
            </h2>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 stroke-indigo-300 hover:stroke-indigo-600 cursor-pointer mr-3"
                onClick={handleDeleteTodo}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-indigo-300 hover:stroke-indigo-600 cursor-pointer"
                onClick={handleCloseModal}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
        <CalendarPicker
          onDateChange={handleDateChange}
          currentDate={date}
          name="calendar"
        />
        <input
          defaultValue={props.description}
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
            className=" w-1/3 text-indigo-300 font-semibold hover:text-indigo-600  text-base mt-5"
            onClick={() => saveChanges()}
          >
            SAVE
          </button>
        </div>
        {isErrorMessage ? (
          <div className="text-red-400 text-sm h-4 mt-5">{error}</div>
        ) : null}
      </div>
    </div>
  );
}

export default ModalEditTodo;
