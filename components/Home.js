import Head from 'next/head';
import Header from './Header';
import Diary from './Diary';
import Footer from './Footer';


function Home() {

  return (
    <div className='font-montserrat flex flex-col h-screen justify-between items-center bg-sky-500 text-base font-light p-5  xl:p-11'>
        <Header/>
        <Diary/>
        <Footer/>
    </div>
  );
}

export default Home;

