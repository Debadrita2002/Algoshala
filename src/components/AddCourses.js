import React, { useState }  from 'react'
import '../components/style.css'
import axios from 'axios'
import { toast } from 'react-toastify';


const AddCourses = () => {
  const [courseName, setCourseName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [startingDate, setStartingDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setLoading] = useState('')

const submitHandler=(e)=>{
  e.preventDefault()
  setLoading(true);

  const formData= new FormData();
  formData.append('courseName',courseName)
  formData.append('description',description)
  formData.append('price',price)
  formData.append('startingDate',startingDate)
  formData.append('endDate',endDate)
  formData.append('image',image)

  axios.post('https://learning-management-system-self-delta.vercel.app/course/add-course',formData,{
    headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res=>{
    setLoading(false);
    console.log(res.data);
    toast.success('new course added..')
  })
  .catch(err=>{
    setLoading(false);
    console.log(err)
    toast.error('something is wrong..')
  })
}

  const fileHandler =(e)=>{
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }

  return (
    <div>
        <form onSubmit={submitHandler} className='form'>
          <h1>Add New Course</h1>
            <input onChange={e=>{setCourseName(e.target.value)}} placeholder='Course name' type='text'/>
            <input onChange={e=>{setDescription(e.target.value)}} placeholder='Description' type='text'/>
            <input onChange={e=>{setPrice(e.target.value)}} placeholder='Price' type='number'/>
            <input onChange={e=>{setStartingDate(e.target.value)}} placeholder='Starting Date(DD-MM-YY)' type='text'/>
            <input onChange={e=>{setEndDate(e.target.value)}} placeholder='End Date(DD-MM-YY)' type='text'/>
            <input onChange={fileHandler}  type='file'/>
            {imageUrl && <img className='you-logo' alt='your logo' src={imageUrl}/>}
            <button type='submit' className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
        </form>
    </div>
  )
}

export default AddCourses