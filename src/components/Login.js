import React, { useState }  from 'react'
import '../components/style.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate();

  const submitHandler = (event)=>{
    event.preventDefault();
    setLoading(true);
    
    axios.post('https://learning-management-system-self-delta.vercel.app/user/login',{
      email:email,
      password:password
    })
    .then(res=>{
      setLoading(false);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('fullName',res.data.fullName)
      localStorage.setItem('imageUrl',res.data.imageUrl)
      localStorage.setItem('imageId',res.data.imageId)
      localStorage.setItem('email',res.data.email) 
      navigate('/dashboard')
      console.log(res.data)
    })
    .catch(err=>{
      setLoading(false);
      toast.error('Invalid credentials')
      console.log(err)
    })
  }

  return (
  <div className='signup-wrapper'>
    <div className='signup-box'>
      <div className='signup-left'>
        <img alt='book-logo'src={require('../assets/imu.png')}/>
        <h1 className='signup-left-heading'>AlgoShala</h1>
        <p className='signup-left-para'>What you learn, you earn.</p>
      </div>
      <div className='signup-right '>
        <hr/>
        <form onSubmit={submitHandler} className='form'>
          <h1>Sign in your account</h1>
          <input required onChange={e=>{ setEmail(e.target.value)}} type='email' placeholder='Email'/>
          <input required onChange={e=>{ setPassword(e.target.value)}} type='password' placeholder='Password'/>
          <button type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
          <Link className='link' to='/signup'>Create your account</Link>
        </form>
      </div>
    </div>
  </div>
  )
}
export default Login;