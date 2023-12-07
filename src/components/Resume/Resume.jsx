import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

const Resume = ({storedRecords}) =>{


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

  useEffect(() => {
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
    }
  }, [storedRecords]);

  
  if (!storedRecords) {
    return <p>No resume data available.</p>;
  }

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
    return(
        <>

<div>
    <button onClick={downloadAsPDF}>Download PDF</button>
    <button onClick={handleEditClick}>Edit</button>
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
                  className='resume-container__skill-list-item'
                  key={key}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
          <h4 className='resume-container__sub-title'>PROFILE</h4>
            <p contentEditable={isEditing}>{selfSummary}</p>
          </div>

          <div>
            <h4 className='resume-container__sub-title'>SKILLS</h4>
            <ul className='resume-container__skill-list'>
            {skills.map((item, index) => {
                return (
                  <li 
                  contentEditable={isEditing}
                  className='resume-container__skill-list-item'
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
                  className='resume-container__skill-list-item'>
                <p  contentEditable={isEditing}
                    className='resume-container__sub'>{item.title} | {item.company} </p>
                <p>{item.start_date} - {item.end_date}</p>
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
                          className='resume-container__skill-list-item'
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
              <li contentEditable={isEditing} className='resume-container__skill-list-item'></li>
            </ul>
          </div>
         

        </div>

      </div>

    </div>
        
        
        
        
        
        </>

    );

}
export default Resume;