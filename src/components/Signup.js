import React, { useState }  from 'react'
import '../components/style.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [fullName, setFullName] = useState(' ')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate();

  const submitHandler = (event)=>{
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('fullName',fullName)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('password',password)
    formData.append('image',image)
    
    axios.post('https://learning-management-system-self-delta.vercel.app/user/signup',formData)
    .then(res=>{
      setLoading(false);
      toast.success('your account created succesfully')
      navigate('/login')
      console.log(res)
    })
    .catch(err=>{
      setLoading(false);
      toast.error('something is wrong')
      console.log(err)
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
          <h1>Create your account</h1>
          <input required onChange={e=>{ setFullName(e.target.value)}} type='text' placeholder='Institute name'/>
          <input required onChange={e=>{ setEmail(e.target.value)}} type='email' placeholder='Email'/>
          <input required onChange={e=>{ setPhone(e.target.value)}} type='number' placeholder='Phone no'/>
          <input required onChange={e=>{ setPassword(e.target.value)}} type='password' placeholder='Password'/>
          <input required onChange={fileHandler} type='file'/>
          <img className='you-logo' alt='your logo' src={imageUrl}/>
          <button type='submit'>Submit</button>
          <Link className='{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}link' to='/login'>Sign in</Link>
        </form>
      </div>
    </div>
  </div>
  )
}
export default Signup;
