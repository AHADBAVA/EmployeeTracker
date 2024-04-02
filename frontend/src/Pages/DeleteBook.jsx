import React, { useState } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  const {enqueueSnackbar} = useSnackbar();
  const handleDeleteBook = () =>{
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(() =>{
      setLoading(false);
      enqueueSnackbar("Book Deleted successfully",{variant:'success'})
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false); 
      enqueueSnackbar("Error",{variant:'error'});
      console.log(error)
    })
  };
  return (
    <div className='p-4'>
  <BackButton/>
  <h1 className='text-3xl my-4'>Delete Employee Data</h1>
  {loading ? <Spinner/> : ""}
  <div className='flex flex-col item-center border-2 border-sky-400 rounded-xl mx-auto sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] p-8'>
    <h3 className='text-2xl'>Are you sure want to delete this Data ?</h3>
    <button 
      onClick={handleDeleteBook}
      className='p-4 bg-red-600 text-white mt-8'
    >
      Yes, Delete it
    </button>
  </div>
</div>

  )
}

export default DeleteBook
