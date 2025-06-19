import React from 'react'

const AddCourses = () => {
  /*const [courseNmae, setCourseNmae] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [startingDate, setStartingDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [image, setImage] = useState(second)*/
  return (
    <div>
        <form className='form'>
          <h1>Add New Course</h1>
            <input placeholder='Course name' type='text'/>
            <input placeholder='Description' type='text'/>
            <input placeholder='Price' type='number'/>
            <input placeholder='Starting Date(DD-MM-YY)' type='text'/>
            <input placeholder='End Date(DD-MM-YY)' type='text'/>
            <input  type='file'/>
            <button className=''>Submit</button>
        </form>
    </div>
  )
}

export default AddCourses