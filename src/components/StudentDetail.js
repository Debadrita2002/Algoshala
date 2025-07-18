import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const StudentDetail = () => {
  const [student, setStudent] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [course, setCourse] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStudentDetail();
  }, []);

  const getStudentDetail = () => {
    axios
      .get(
        "https://learning-management-system-self-delta.vercel.app/student/student-detail/" +
          params.id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setStudent(res.data.studentDetail);
        setPaymentList(res.data.feeDetail);
        setCourse(res.data.courseDetail);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong...");
      });
  };

  const deleteStudent = (studentId)=>{
    alert('Got to deleteCourse')
    if(window.confirm('are you sure you want to delete ?')){
      axios.delete('https://learning-management-system-self-delta.vercel.app/student/'+studentId,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=>{
        console.log(res.data)
        navigate('/dashboard/course-detail/'+course._id)
        toast.success('student data is deleted')
      })
      .catch(err=>{
        console.log(err)
        toast.error('something is wrong...')
      })
    }
  }
  return (
    <div className="student-detail-main-wrapper">
      <div className="student-detail-wrapper">
        <div className="student-detail-header">
          <h2>Student Full Detail</h2>
          <div className="sd-btn-container">
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/dashboard/update-student/" + student._id, {
                  state: { student },
                });
              }}
            >
              Edit
            </button>
            <button className="secondary-btn" onClick={()=>{deleteStudent(student._id)}}>Delete</button>
          </div>
        </div>
        <div className="sd-detail">
          <img alt="student-pic" src={student.imageUrl} />
          <div>
            <h3>{student.fullName}</h3>
            <p>Phone :- {student.phone}</p>
            <p>Email:- {student.email}</p>
            <p>Adress:- {student.address}</p>
            <h4>Course Name:- {course.courseName}</h4>
          </div>
        </div>
      </div>
      <br />
      <h2 className="payment-history-title">Payment History</h2>
      <div className="fee-detail-wrapper">
        <table>
          <thead>
            <th>Date & Time</th>
            <th>Amount</th>
            <th>Remark</th>
          </thead>
          <tbody>
            {paymentList.map((payment) => (
              <tr key={payment._id}>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                <td>{payment.amount}</td>
                <td>{payment.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetail;
