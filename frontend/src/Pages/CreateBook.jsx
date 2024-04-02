import React, {useState} from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setpublishyear] = useState("");
  const [workdetails, setworkdetails] = useState("");
  const [signintime,setsignintime ] = useState("");
  const [signouttime, setsignouttime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const handleSaveBook = () =>{
    const data = {
      title,
      author,
      publishyear,
      workdetails,
      signintime,
      signouttime,
      
    };
    setLoading(true);
    axios
    .post('http://localhost:5555/books', data)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar("Employee Signed In Successfully",{variant:'success'});
      navigate('/')
    })
    .catch((error) =>{
      setLoading(false);
      enqueueSnackbar("Error",{variant:'error'})
      console.log(error);
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>New Attends</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Status</label>
          <select name="" id=""
          type='text'
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          >
            <option className='bg-green-400'>Working</option>
            <option className='bg-red-300'>Leave</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input 
          type='text'
          value={author}
          onChange={(e)=> setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date</label>
          <input 
          type='text'
          value={publishyear}
          onChange={(e)=> setpublishyear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Project Details</label>
          <input 
          type='text'
          value={workdetails}
          onChange={(e)=> setworkdetails(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Sign In Time</label>
          <input 
          type='text'
          value={signintime}
          onChange={(e)=> setsignintime(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>SignOut Time</label>
          <input 
          type='text'
          value={signouttime}
          onChange={(e)=> setsignouttime(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBook
