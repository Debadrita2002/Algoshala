import React, {useEffect,  useState }  from 'react'
import '../components/style.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AddStudent = () => {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [courseId, setCourseId] = useState('')
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setLoading] = useState('')
  const [courseList, setCourseList] = useState([])

  const navigate=useNavigate();

  useEffect(()=>{
    getCourses();
  },[])

  const getCourses=()=>{
    axios.get('https://learning-management-system-self-delta.vercel.app/course/all-courses',{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>{
      console.log(res.data.courses)
      setCourseList(res.data.courses)
    })
    .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
  }

const submitHandler=(e)=>{
  e.preventDefault()
  setLoading(true);

  const formData= new FormData();
  formData.append('fullName',fullName)
  formData.append('email',email)
  formData.append('phone',phone)
  formData.append('adress',address)
  formData.append('courseId',courseId)
  formData.append('image',image)

  axios.post('https://learning-management-system-self-delta.vercel.app/student/add-student',formData,{
    headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res=>{
    setLoading(false);
    console.log(res.data);
    toast.success('new student added..')
    navigate('/dashboard/courses')
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
          <h1>Add New Student</h1>
            <input onChange={(e)=>{setFullName(e.target.value)}} required placeholder='Student name' type='text'/>
            <input onChange={(e)=>{setEmail(e.target.value)}} required placeholder='Email' type='text'/>
            <input onChange={(e)=>{setPhone(e.target.value)}} required  placeholder='Phone no' type='number'/>
            <input onChange={(e)=>{setAddress(e.target.value)}} required placeholder='Full adress' type='text'/>
            <select onChange={(e)=>{setCourseId(e.target.value)}}>
              <option>Select course</option>
              {
                courseList.map((course)=>(
                  <option value={course._id}>{course.courseName}</option>
                ))
              }
            </select>
            <input required onChange={fileHandler}  type='file'/>
            {imageUrl && <img className='you-logo' alt='Student-pic' src={imageUrl}/>}
            <button type='submit' className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
        </form>
    </div>
  )
}

export default AddStudent