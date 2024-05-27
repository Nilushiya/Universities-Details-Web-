import React, { useEffect, useState } from 'react'
import {friend} from './Style'
import CustomNavbar from './CustomNavbar'
import { decodeToken, downloadPdf, fetchAllDetails, fetchByCourse, fetchByLanguage, fetchbyYear } from '../Context/UserContext'
const Friend = () => {
  const [year , setYear] = useState('')
  const[uni , setUni] = useState('')
  const [course , setCourse] = useState('')
  const[language , setLanguage] = useState('')
  const [user, setUser1] = useState([]);
  const [user1, setUser2] = useState([]);
  const[stu_id , setStu_id] = useState('');
  const[customerName , setName] = useState('');

  const [friendData , setFrienddata] = useState('accedemicYear')
  const[friendByYear, setFriendByYear] = useState([])
  const[friendByLanguage, setFriendByLanguage] = useState([])
  const[friendByCourse,setFriendByCourse] = useState([])
  useEffect(() => {
    const fetchDetails = async (stu_id) => { 
      try {
        const response = await fetchAllDetails(stu_id);  
        setUser1(response.data[0][0]);
        setUser2(response.data[0][1]);

        setYear(response.data[0][0].academic_year)
        setUni(response.data[0][0].selected_university)
        setCourse(response.data[0][0].selected_course)
        setLanguage(response.data[0][0].language)
      } catch (error) {
        console.error('There was an error fetching the user details!', error);
      }
    };
    if (stu_id) {  
      fetchDetails(stu_id);
    }
  }, [stu_id]);


  const fetchFriendByLanguage = async() => {
    try{
      setFrienddata("friLanguage")
      const response = await fetchByLanguage(uni , year , language);
      console.log("Language  : ",response.data)
      setFriendByLanguage(response.data)
    }
    catch(err){
      console.log("Error in fetch Friends by language ", err);
    }
  }

  const fetchFriendByCourse = async() => {
    try{
      setFrienddata("friCourse")
      const response = await fetchByCourse(uni , year , language , course);
      console.log("Course  : ",response.data)
      setFriendByCourse(response.data)
      setFrienddata("selectCourse")
    }
    catch(err){
      console.log("Error in fetch Friends by course ", err);
    }
  }

  const pdfDownload = async(studentinfo_id) => {
    try{
      const response =await downloadPdf(studentinfo_id)
      // console.log("respo :",response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_info.pdf');
      document.body.appendChild(link);
      link.click();
    }
    catch(err){
      console.log("Error in download " , err)
    }
  }
  const fetchFriend_year = async() => {
    setFrienddata("accedemicYear")
  }
  useEffect(() => {
    const fetchFriens_year =async(uni , year) => {
      // console.log("Year frined")
      try{
        const response =await fetchbyYear(uni , year)
        // console.log("year responses  : ", response.data[0][0])
        setFriendByYear(response.data)
      }
      catch(err){
        console.log("Error in fetch Friends by year ", err);
      }
    }
    
      fetchFriens_year(uni , year)
  
  },[uni , year])

  useEffect(() => {
    const decode = decodeToken();
      const user = decode.studentId;
      const userName = decode.name;
      setName(userName)
      setStu_id(user);
  },[])

  return (
    <div className='friend'>
        <CustomNavbar />
        <div className="buttonGroup">
            <button onClick={fetchFriend_year}>Year</button>
            <button onClick={fetchFriendByLanguage}>Language</button>
            <button onClick={fetchFriendByCourse}>Course</button>
        </div>
        <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Friend Name</th>
            <th>Email </th>
            <th>Address </th>
            <th>PDF File</th>
          </tr>
        </thead>
        <tbody>
        {friendData === "accedemicYear" ? (
  friendByYear.map((item, index) => (
    <tr key={index}>
      <td>{item[1].name}</td>
      <td>{item[1].email}</td>
      <td>{item[0].address}</td>
      <td>
      <button onClick={() => pdfDownload(item[0].studentinfo_id)}>Download PDF</button>
        {/* <a href={item[0].image} className="download-button" download>
          Download PDF
        </a> */}
      </td>
    </tr>
  ))
) : friendData === "friLanguage" ? (
  friendByLanguage.map((item, index) => (
    <tr key={index}>
      <td>{item[1].name}</td>
      <td>{item[1].email}</td>
      <td>{item[0].address}</td>
      <td>
      <button onClick={() => pdfDownload(item[0].studentinfo_id)}>Download PDF</button>
        {/* <a href={item[0].image} className="download-button" download>
          Download PDF
        </a> */}
      </td>
    </tr>
  ))
) : friendData === "selectCourse" ? (
  friendByCourse.map((item, index) => (
    <tr key={index}>
      <td>{item[1].name}</td>
      <td>{item[1].email}</td>
      <td>{item[0].address}</td>
      <td>
        <button onClick={() => pdfDownload(item[0].studentinfo_id)}>Download PDF</button>
        {/* <a href={item[0].image} className="download-button" download>
          Download PDF
        </a> */}
      </td>
    </tr>
  ))
) : null}


        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Friend