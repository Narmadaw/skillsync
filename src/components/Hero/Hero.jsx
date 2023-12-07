import {Link} from 'react-router-dom';
import Banner from './../../assets/images/hero-1.png';
import './Hero.scss';

const Hero = () =>{
    return(
        <>
        <div className="wrapper">
            <div>
                <h1 className='wrapper__head'>
                        Optimize your resume to get more interviews
                </h1>
            </div>
            <div className='wrapper__main'>
            <div className="wrapper__left-pannel">
            <img className='wrapper__hero' src={Banner} alt="banner" />
            </div>
            <div className="wrapper__right-pannel">
                <h1 className='wrapper__pannel-text'>Use the best resume scanner as your guide</h1>
                <p className='wrapper__pannel-text'> Getting that dream job can seem like an impossible task. 
                    We’re here to change that. Give yourself a real advantage with 
                    the best online resume maker: created by experts, 
                    improved by data, trusted by millions of professionals.
                </p>
              <Link to={'/profile'}>
                <button className='wrapper__hero-btn'>Upload Your Resume</button>
              </Link>
            </div>

            </div>
           
        </div>
        
        </>
    );
    

}

export default Hero;