import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../Components/home/BooksTable';
import BooksCard from '../Components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table'); // Changed setshowType to setShowType

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4 bg-gray-800 h-[auto] text-white' style={{fontWeight:"400"}}>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-white text-black hover:bg-gray-200 px-4 rounded-lg'
          onClick={() => setShowType('table')} // Changed showType to setShowType
        >
          Table
        </button>
        <button
          className='bg-white text-black hover:bg-gray-200 px-4 rounded-lg'
          onClick={() => setShowType('card')} // Changed showType to setShowType
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Employ Status</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className='text-sky-8000 text-4xl' />
        </Link>
      </div>
      {loading ? <Spinner /> : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)}
    </div>
  );
};

export default Home;
