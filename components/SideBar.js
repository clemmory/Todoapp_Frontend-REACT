import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from './Header';
import Diary from './Diary';
import { useRef } from 'react';
import 'moment/locale/fr';
import moment from 'moment';

function ss() {

  return (
    <div className='font-montserrat min-h-screen flex flex-col justify-start items-center bg-sky-500 text-base font-light p-11'>
        <Header/>
        <Diary/>
    </div>
  );
}

export default Home;
