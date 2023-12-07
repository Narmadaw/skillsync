import {Link} from 'react-router-dom';
import Hero from "../../components/Hero/Hero";
import './HomePage.scss';
import ScoreImage from './../../assets/images/score.png';
import Skills from './../../assets/images/skills-img.png';
import BottomImage from './../../assets/images/get-hired.png';


const HomePage = () =>{
    
    return (
        <>
            <Hero/>

            <div className="section">
                <div className="section__right-pannel">
                    <h2>Rate your resume</h2>
                    <p> Is your resume a good match for what a recruiter is looking for? If it’s not, you might miss out on interviews for jobs you feel qualified for. Jobscan’s proprietary AI analyzes your resume and compares it to the job listing using AI technology. Use your match rate report to see how to optimize your resume to get more interviews.
                    </p>
                <Link to={'/profile'}>
                    <button className='wrapper__hero-btn'>Get Your Score</button>
                </Link>
                </div>
                <div className="section__left-pannel">
                <img className='section__image' src={ScoreImage} alt="score chart" />
                </div>
            </div>

            <div className="section-2">
            <div className="section-2__left-pannel">
                <img className='section-2__image' src={Skills} alt="score chart" />
                </div>
                <div className="section-2__right-pannel">
                    <h2>See your missing resume skills</h2>
                    <p>Jobscan matches hard skills, soft skills, and keywords from the job listing to your resume. The AI-powered system will show you how to tailor your resume so that you highlight the skills and experience recruiters are searching for.
                    </p>
                <Link to={'/profile'}>
                    <button className='wrapper__hero-btn'>See your Skills</button>
                </Link>
                </div>
               
            </div>

            
        </>
    );
}
export default HomePage;