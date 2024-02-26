import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageURL, setLink] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      imageURL,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-red-500'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-8 border-amber-500 rounded-xl w-[600px] p-10 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-red-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-amber-500 px-4 py-2 w-full'
            style={{ color: 'rgb(8 145 178)' }}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-red-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-amber-500 px-4 py-2  w-full '
            style={{ color: 'rgb(8 145 178)' }}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-red-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-amber-500 px-4 py-2  w-full '
            style={{ color: 'rgb(8 145 178)' }}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-red-500'>imageURL</label>
          <input
            type='text'
            value={imageURL}
            onChange={(e) => setLink(e.target.value)}
            className='border-2 border-amber-500 px-4 py-2  w-full '
            style={{ color: 'rgb(8 145 178)' }}
          />
        </div>
        <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-3xl px-5 py-3 text-center me-2 mb-2 mt-10" onClick={handleSaveBook}>
           Save
        </button>
      </div>
    </div>
  );
}

export default CreateBooks