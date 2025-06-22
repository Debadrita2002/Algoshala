import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const CourseDetail = () => {
    const params=useParams();
    const [course,setCourse] = useState(null)
    const [studentList, setStudentList] = useState([])

    useEffect(() => {
      getCourseDetail()
    }, [])

    const getCourseDetail=()=>{
    axios.get('https://learning-management-system-self-delta.vercel.app/course/course-detail/'+params.id,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>{
      console.log(res.data)
      setCourse(res.data.course)
      setStudentList(res.data.studentList)
    })
    .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
  }
    
  return (
    <div>
        <div className='course-detail-wrapper'>
            
        </div>
    </div>
  )
}

export default CourseDetail