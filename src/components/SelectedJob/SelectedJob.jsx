import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import DonutChart from 'react-donut-chart';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import './SelectedJob.scss';

const SelectedJob = ()=>{
    const [selectedJob, setSelectedJob] = useState([]);
    const [resumeSkills, setResumeSkills] = useState([]);
    const [jobSkills, setJobSkills] = useState([]);
    const [machingScore, setMatchingScore] = useState('');
    const {id} = useParams();
    const {title} = useParams();
    const {company} = useParams();

    useEffect(()=>{
        const getJobDetails = async()=>{
            try{
                const response = await axios.get(`https://skillsyncio-5e3c537e9de3.herokuapp.com/jobs/${id}`);
                if(response.data.jobDescription){
                    setSelectedJob(response.data.jobDescription);
                    setResumeSkills(response.data.resumeSkills);
                    setJobSkills(response.data.jobDescriptionSkills);
                    setMatchingScore(response.data.matchingPercentage);
                }else{
                    alert("no data");
                }

                
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        getJobDetails();
    },[id]);

    const handleClick = (e) => {
        e.preventDefault();
        window.history.go(-1)
      };


    const score = parseInt(machingScore);
    const matchingSkills = jobSkills.filter(jobSkill => resumeSkills.includes(jobSkill));
    const missingSkills = jobSkills.filter(jobSkill => !resumeSkills.includes(jobSkill));
    const orderedSkills = matchingSkills.concat(missingSkills);

    const renderIcon = (isMatching) => {
        if (isMatching) {
            return <CheckCircleIcon className="container__icon" />;
        } else {
            return <CancelIcon className="container__icon" />;
        }
    }
    return(
        <>
        <div className="selected-job-wrapper">
            <div className="container">
                <div className="container__header">
                    <h1 className="container__header-title">
                            {title} - {company}
                    </h1>
                    
                </div>
                <div className="container__chart">
                    <div className="container__chart-box">
                        <DonutChart className="donutchart"
                            data={[
                                    {   label:"Match Rate",
                                        value: score,
                                    },
                                    {
                                        value: 10,
                                        isEmpty: true,
                                    },
                            ]}
                        />
                        <div className="container__chart-btn-pannel">
                            <Link to={'/profile'} >
                                <button className="container__btn-edit">Edit Resume</button>
                            </Link>
                            
                            <button className="container__btn-back" onClick={handleClick}>Back to Job Search</button>
                        </div>
                        
                    </div>
                    <div className="container__job-description">
                        <h2 className="container__s-text">Job Description</h2>
                        <hr/>
                        {selectedJob.map((jobDescription, index) => (
                            <p className="container__text" key={index}>{jobDescription}</p>
                        ))}
                    </div>
                </div>
                


                <div className="container__skills-pannel">
                        <div className="container__skills">
                            <h2 className="container__sub-header">Your Skills</h2>
                            <div className="container__horizontal">
                            {resumeSkills.map((skil, index) => (
                                    <p className="container__your-skills" key={index}>{skil}</p>
                                ))}
                            </div>
                                
                        </div>
                        <div className="container__skills">
                            <div>
                                <h2 className="container__sub-header">Required Skills</h2>
                            </div>
                            <div className="container__horizontal">
                            {orderedSkills.map((jobSkill, index) => (
                                <p  key={index}
                                    className={matchingSkills.includes(jobSkill) ? 'container__matching' : 'container__missing'}>
                                    {jobSkill} {renderIcon(matchingSkills.includes(jobSkill))}
                                </p>
                            ))} 
                            </div>                                   
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}

export default SelectedJob;