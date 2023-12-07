//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.scss'

const Footer = () =>{
    return (
        <>
        <footer class="footer-distributed">

<div class="footer-left">

  <h3>skillsync.io</h3>

  <p class="footer-links">
    <a href="#" class="link-1">Home</a>
    
    <a href="#">Sign In</a>
  
    <a href="#">Sign Up</a>
  
    <a href="#">About</a>
    
    <a href="#">Contact</a>
  </p>

  <p class="footer-company-name">skillsync.io © 2023</p>
</div>

<div class="footer-center">

  <div>
    <i class="fa fa-map-marker"></i>
    <p>356 Granville Street, Vancouver</p>
  </div>

  <div>
    <i class="fa fa-phone"></i>
    <p>+1 778 223 3427</p>
  </div>

  <div>
    <i class="fa fa-envelope"></i>
    <p><a href="mailto:support@company.com">support@skillsync.io</a></p>
  </div>

</div>

<div class="footer-right">

  <p class="footer-company-about">
    <span>About the company</span>
    skillsync.io AI-powered resume checker optimizes your resume for any job, highlighting the key experience and skills recruiters need to see.
  </p>

  <div class="footer-icons">
  {/* <FontAwesomeIcon icon={faLinkedin} /> */}
  
    <a href="#"><i class="fa fa-facebook"></i><FacebookIcon /></a>
    <a href="#"><i class="fa fa-twitter"></i><TwitterIcon/></a>
    <a href="#"><i class="fa fa-linkedin"></i><LinkedInIcon /></a>
    <a href="#"><i class="fa fa-github"></i><GitHubIcon/></a>

  </div>

</div>

</footer>
        </>
    );

}
export default Footer;