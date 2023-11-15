import DatePicker from 'react-datepicker';
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';

const moment = require('moment');
import 'moment/locale/es';

function Calendar(props) {

    // Format current date to date object
    const formatedDate = moment(props.currentDate, 'DD-MM-YYYY');
    const finalDate = formatedDate.isValid() ? formatedDate.toDate() : null;

    const [date, setDate] = useState(finalDate);

    const handleClose = () => {
        props.onDateChange(date)
        console.log('new date saved', date)
    }
    
    return (
        <div className='flex items-center mb-3'>
            <DatePicker dateFormat={'dd-MM-yyyy'}
                        selected={date}
                        onChange={(newDate) => setDate(newDate)}
                        input={true}
                        onCalendarClose={handleClose}
                        className='appearance-none shadow border rounded p-2 text-slate-400 bg-white'/>
                <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="relative right-6 w-4 h-4 stroke-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
        </div>
    )
};

export default Calendar;
