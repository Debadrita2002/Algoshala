import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Students = () => {
  const [studentList, setStudentList] = useState([])
  const navigate=useNavigate();
  useEffect(()=>{
    getStudentList();
  })

  const getStudentList = () => {
    axios.get('https://learning-management-system-self-delta.vercel.app/student/all-students',{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>{
      console.log(res.data)
      setStudentList(res.data.students)
    })
    .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
  }


  return (
    <div>
      {studentList && studentList.length > 0 && (
        <div className='students-container'> 
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
  )
}

export default Students