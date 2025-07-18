import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Courses = () => {

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
  return (
    <div className='course-wrapper'>
      {
        courseList.map((course)=>(
          <div onClick={()=>{navigate('/dashboard/course-detail/'+course._id)}} className='course-box' key={course._id}>
            <img alt='thumbnail' className='course-thumbnail' src={course.imageUrl}/>
            <h5 className='coursee-name'>{course.courseName}</h5>
            <p className='coursee-rs'>Rs. {course.price} only</p>
          </div>
        ))
      }
    </div>
  )
}

export default Courses