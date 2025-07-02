import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PaymentHistory = () => {
  const [paymentList, setPaymentList] = useState([])

  useEffect(()=>{
    getPaymentHistory()
  },[])

  const getPaymentHistory=()=>{
    axios.get('https://learning-management-system-self-delta.vercel.app/fee/payment-history',{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>{
      console.log(res.data)
      setPaymentList(res.data.paymentHistory.reverse())
    })
    .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
  }
  
  return (
    <div className='payment-history-wrapper'>
      <h2>PaymentHistory</h2>
      <table>
        <thead>
          <tr><th>Student's Name</th>
          <th>Date & Time</th>
          <th>Amount</th>
          <th>Remark</th></tr>
        </thead>
        <tbody>
          {
            paymentList.length > 0 ? (
              paymentList.map((payment) => (
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
    </div>
  )
}

export default PaymentHistory