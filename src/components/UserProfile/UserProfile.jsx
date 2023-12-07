import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
import BotImage from './../../assets/images/bot.png';
import './UserProfile.scss';
import html2pdf from 'html2pdf.js';


const UserProfile = () => {
  const [file, setFile] = useState();
  const [personalData, setPersonalData] = useState({});
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [name, setName] = useState({});
  const [profession, setProfession] = useState('');
  const [address, setAddress] = useState({});
  const [selfSummary, setSelfSummary] = useState('');
  const [objective, setObjective] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phones, setPhones] = useState([]);
  const [mails, setMails] = useState([]);
  const [urls, setUrls] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [resumeRecords, setResumeRecords] = useState(
    JSON.parse(localStorage.getItem('resumeRecords')) || []
  );


  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('resumeRecords'));
    if (storedRecords) {
      setPersonalData(storedRecords.personal_infos);
      setExperience(storedRecords.work_experience.entries);
      setEducation(storedRecords.education.entries);
      setCertificate(storedRecords.certifications);
      setSkills(storedRecords.skills);
      setName(storedRecords.personal_infos.name || {});
      setProfession(storedRecords.personal_infos.current_profession || '');
      setAddress(storedRecords.personal_infos.address || {});
      setSelfSummary(storedRecords.personal_infos.self_summary || '');
      setObjective(storedRecords.personal_infos.objective || '');
      setDateOfBirth(storedRecords.personal_infos.date_of_birth || null);
      setPhones(storedRecords.personal_infos.phones || [0]);
      setMails(storedRecords.personal_infos.mails || [0]);
      setUrls(storedRecords.personal_infos.urls || []);
      console.log(storedRecords);
    }
  }, []); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
   useEffect(() => {
    if(!file){
      console.error('No file selected');
    }
    else{
      handleUpload();
    }
  }, [file]);

  const handleUpload = async () => {
  
    const formData = new FormData();
    formData.append('show_original_response', 'false');
    formData.append('fallback_providers', '');
    formData.append('providers', 'affinda');
    formData.append('file', file);

    const options = {
      method: 'POST',
      url: 'https://api.edenai.run/v2/ocr/resume_parser',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODk4OWEzMjItZjU1OS00NzM5LTg0MTgtMzU2Nzk1MTI5YjYwIiwidHlwZSI6ImFwaV90b2tlbiJ9.T6k_M-v6qqbiHRfnDFv3Woxpe30xFBSJbNr1p68zS5Q', // Replace with your actual API key
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    try {
      const response = await axios(options);
      const extractedData = response.data.affinda.extracted_data;
      localStorage.setItem('resumeRecords', JSON.stringify(extractedData));
        setPersonalData(extractedData.personal_infos);
        setExperience(extractedData.work_experience.entries);
        setEducation(extractedData.education.entries);
        setCertificate(extractedData.certifications);
        setSkills(extractedData.skills);
      
    } catch (error) {
      console.error(error);
    }
  };

  const sendSkillsToServer = async (skills) => {
    try {
      console.log(skills)
      const response = await axios.post('https://skillsyncio-5e3c537e9de3.herokuapp.com/jobs', { resume: skills });
      console.log('Skills sent to server:', response.data);
    } catch (error) {
      console.error('Error sending skills to server:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const downloadAsPDF = () => {
    const element = document.querySelector('.resume');
  
    html2pdf(element, {
      margin: 2,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  return (
    <>
    
    <div className="profile-wrapper">
      <div className="upload-container">
        <div className='upload-container__card'>
          <CloudUploadIcon color="primary" fontSize="large"/>
        </div>
        <div className='upload-container__card'>
          <h1 className='upload-container__title'>Upload your resume to get started</h1>
        </div>
        <div className='upload-container__card'>
          <input className='upload-container__btn-upload' type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
          
          <p className='upload-container__text'>as .pdf | .doc | .docx</p>
        </div>
        <img className='upload-container__image' src={BotImage} alt="bot image" />
      </div>
    </div>

    <div className='button-pannel'>
      <div className='button-pannel__title'>
      <h2 className='button-pannel__title-text'>Your Resume</h2>
      </div>
      
      <div className='button-pannel__card'>
        <Link className='button-pannel__download' to={'/search'}>
          <button className='button-pannel__download'>Job Search</button>
        </Link>
      
        <button className='button-pannel__download' onClick={downloadAsPDF}>Download Resume</button>
        <button className='button-pannel__edit' onClick={handleEditClick}>Edit Resume</button>

      </div>
      
    </div>

    <div className='resume'>
      <div className='resume-container'>
        <div className="resume-container__left">
          <h2>{name.raw_name}</h2>
          <p 
          className={isEditing ? 'resume-container__editable' : 'resume-container__profession'}
          contentEditable={isEditing}>{profession}</p>

          <div>
            <p contentEditable={isEditing}>{mails}</p>
            <p contentEditable={isEditing}> {phones}</p>
            <ul className='resume-container__skill-list'>
              {urls.map((item, key) => (
                <li
                  contentEditable={isEditing}
                  className={isEditing ? 'resume-container__editable' : 'resume-container__skill-list-item'}
                  key={key}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
          <h4 className='resume-container__sub-title'>PROFILE</h4>
            <p 
            className={isEditing ? 'resume-container__editable' : 'resume-container__profile-summary'}
            contentEditable={isEditing}>{selfSummary}</p>
            
          </div>

          <div>
            <h4 className='resume-container__sub-title'>SKILLS</h4>
            <ul className='resume-container__skill-list'>
            {skills.map((item, index) => {
                return (
                  <li 
                  contentEditable={isEditing}
                  className={isEditing ? 'resume-container__editable' : 'resume-container__skill-list-item'}
                  key={index}>{item.name}</li>
                );
              })}
            </ul>
          </div>

        </div>
        <div className='resume-container__v-line'></div>
        <div className="resume-container__right">
          <div>
            <h4 className='resume-container__sub-title'>EXPERIENCE</h4>
            <hr className='resume-container__h-line'/>
            <ul className='resume-container__skill-list'>
            {experience.map((item, index) => {
              return (
              <li 
                  contentEditable={isEditing}
                  key={index}
                  className={isEditing ? 'resume-container__editable' : 'resume-container__skill-list-item'}
                  >
                <p  contentEditable={isEditing}
                    className={isEditing ? 'resume-container__editable' : 'resume-container__sub'}
                    
                    >{item.title} | {item.company} </p>
                <p 
                className={isEditing ? 'resume-container__editable' : 'resume-container__sub'}
                >{item.start_date} - {item.end_date}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className='resume-container__sub-title'>EDUCATION</h4>
            <hr className='resume-container__h-line'/>
            <ul className='resume-container__skill-list'>
            {education.map((item, index) => {
                    return (
                      <li key={index}
                          
                          className={isEditing ? 'resume-container__editable' : 'resume-container__skill-list-item'}
                          contentEditable={isEditing} >
                          
                        <p className='resume-container__sub'>{item.establishment} | {item.accreditation}</p>
                        <p>{item.start_date} - {item.end_date}</p>
                        <p>
                          {education.location?.map((loc, index) => {
                            return (
                              <p key={index}>
                                {loc.city} - {loc.country}
                              </p>
                            );
                          })}
                        </p>
                      </li>
                    );
                  })}
            </ul>
          </div>

          <div>
            <h4 className='resume-container__sub-title'>PROJECTS</h4>
            <hr className='resume-container__h-line'/>
            <ul className='resume-container__skill-list'>
              <li contentEditable={isEditing} className={isEditing ? 'resume-container__editable' : 'resume-container__skill-list-item'}></li>
            </ul>
          </div>
         

        </div>

      </div>

    </div>
    

    </>
  );
};

export default UserProfile;
