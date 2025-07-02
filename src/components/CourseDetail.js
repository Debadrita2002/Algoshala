import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const CourseDetail = () => {
    const params=useParams();
    const [course,setCourse] = useState(null)
    const [studentList, setStudentList] = useState([])

    const navigate=useNavigate();

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

  const deleteCourse = (courseId)=>{
    alert('Got to deleteCourse')
    if(window.confirm('are you sure you want to delete ?')){
      axios.delete('https://learning-management-system-self-delta.vercel.app/course/'+courseId,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=>{
        console.log(res.data)
        navigate('/dashboard/courses')
      })
      .catch(err=>{
        console.log(err)
        toast.error('something is wrong...')
      })
    }
  }
    
return (
  <div className='course-detail-main-wrapper'>
    {course ? (
      <div>
        <div className='course-detail-wrapper'>
          <img className='course-detail-img' src={course.imageUrl} alt='course thumbnail' />
          <div>
            <h2>{course.courseName}</h2>
            <p>Price:- {course.price}</p>
            <p>Starting date:- {course.startingDate}</p>
            <p>End date:- {course.endDate}</p>
          </div>
          <div className='course-des-box'>
            <div className='btn-container'>
              <button className='primary-btn' onClick={()=>{navigate('/dashboard/update-course/'+course._id,{state:{course}})}} key={course._id} >Edit</button>
              <button className='secondary-btn' key={course._id} onClick={()=>{deleteCourse(course._id)}}>Delete</button>
            </div>
            <h3>Course Description</h3>
            <div className='onn'>
              <p> Description:- {course.description}</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p>Loading course details...</p>
    )}

    {studentList && studentList.length > 0 && (
      <div className='studentlist-container'> 
        <table>
          <thead className='thead-student'>
            <td><p><strong>Student's Photo</strong></p></td>
            <td><p><strong>Student's Name</strong></p></td>
            <td><p><strong>Phone No</strong></p></td>
            <td><p><strong>Email Id</strong></p></td>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr onClick={()=>{navigate('/dashboard/student-detail/'+student._id)}} className='student-row' key={student._id}>
                <td><img className='student-img' src={student.imageUrl} alt={student.fullName} /></td>
                <td><p>{student.fullName}</p></td>
                <td><p>{student.phone}</p></td>
                <td><p>{student.email}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);


}

export default CourseDetail