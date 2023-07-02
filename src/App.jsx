import { useState } from 'react'
import './index.css'


function App() {
  const [inputs,setInputs]=useState({name:"",author:""});

  const handleChange=(e)=>{

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const [tableData,setTableData]=useState([]);


  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
    if(editclick){
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex],inputs)
      setTableData([...tempTableData])

    }else{
      setTableData([...tableData,inputs]);
      setInputs({name:"",author:""})
    }
    
  }

  const handleDelete=(index)=>{
    const filterData = tableData.filter((item,i)=> i != index);
    setTableData(filterData);
  }

  const [editclick,setEditClick]=useState(false);
  const [editIndex,setEditIndex]=useState("")

  const handleEdit=(index)=>{
    const tempData=tableData[index];
    setInputs({
      name: tempData.name,
      author: tempData.author
    })
    setEditClick(true);
    setEditIndex(index);

  }

  return (
    <>

    <div className='item'>
      <h1 >Basic Book Management With CRUD</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div >
            <label >Book Name</label>
            <br />
            <input name="name" value={inputs.name} onChange={handleChange} required/>
          </div>
          <br />
          <div>
            <label>Author</label><br />
            <input name="author" value={inputs.author} onChange={handleChange} required/>
          </div>
          <br />
          <button type='submit' className='btn'>{editclick ? "update" : "ADD"}</button>
          
        </form>
      </div>
      <div>
        <table className='table'>
          <thead>
            <tr >
              <th >Book Name</th>
              <th >Author</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            tableData.map((item,i)=>(
              <tr>
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>
                <button onClick={()=>handleEdit(i)}>Edit</button>
                <button onClick={()=>handleDelete(i)}>Delete</button>
              </td>
            </tr>

            ))
          }
          </tbody>
        </table>
      </div>
    </div>
     
    </>
  )
}

export default App
