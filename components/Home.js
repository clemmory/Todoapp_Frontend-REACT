import Head from 'next/head';
import Header from './Header';
import Diary from './Diary';
import Footer from './Footer';


function Home() {

  return (
    <div className='custom-gradient font-title flex flex-col h-screen justify-between items-center text-base font-light p-5  xl:p-11'>
        <Header/>
        <Diary/>
        {/* <Footer/> */}
    </div>
  );
}

export default Home;

