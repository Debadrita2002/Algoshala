import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const [totalCourse,setTotalCourse]= useState(0)
  const [totalStudents,setTotalStudents]= useState(0)
  const [students, setStudents] = useState([])
  const [fees, setFees] = useState([])
  const [totalAmount, setAmount] = useState(0)
  useEffect(()=>{
    getHomeDetails();
  },[])
  const navigate=useNavigate()
  const getHomeDetails=()=>{
    axios.get('https://learning-management-system-self-delta.vercel.app/course/home',{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>{
      console.log(res.data)
      setTotalCourse(res.data.totalCourse)
      setTotalStudents(res.data.totalStudent)
      setStudents(res.data.students)
      setFees(res.data.fees)
      setAmount(res.data.totalAmount)
    })
    .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
  }
  return (
    <div className='home-wrapper'>
      <div className='count-box-wrapper'>
        <div className='box1'>
          <h2>{totalCourse}</h2>
          <p>Courses</p>
        </div>
        <div className='box2'>
          <h2>{totalStudents}</h2>
          <p>Students</p>
        </div>
        <div className='box3'>
          <h2>{totalAmount}</h2>
          <p>Total Transaction</p>
        </div>
      </div>
      <div className='list-container'>
        <div className='table-container'>
          {
            students.length>0 ?
            <table>
          <thead className='thead-student'>
            <td><p><strong>Student's Photo</strong></p></td>
            <td><p><strong>Student's Name</strong></p></td>
            <td><p><strong>Phone No</strong></p></td>
            <td><p><strong>Email Id</strong></p></td>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr onClick={()=>{navigate('/dashboard/student-detail/'+student._id)}} className='student-row' key={student._id}>
                <td><img className='student-img' src={student.imageUrl} alt={student.fullName} /></td>
                <td><p>{student.fullName}</p></td>
                <td><p>{student.phone}</p></td>
                <td><p>{student.email}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
        : <p>No students found</p>
          }
          
        </div>
        <div className='table-container'>
          {
           fees.length >0 ?
           
           <table>
        <thead>
          <tr><th>Student's Name</th>
          <th>Date & Time</th>
          <th>Amount</th>
          <th>Remark</th></tr>
        </thead>
        <tbody>
          {
            fees.length > 0 ? (
              fees.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.fullName}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.remark}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No payment history found.</td>
              </tr>
            )
          }
        </tbody>
      </table>
      : <p>no payment history</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Home