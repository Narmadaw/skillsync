import React, { useState } from 'react';
import './SignUpModal.scss';
const SignUpModal = ({ isOpen, onClose }) =>{
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        onClose();
      };

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <div className='card'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              
              <div>
                <input className='card__input' type="email" name="email" onChange={handleChange} placeholder='Email' />
              </div>
              <div>
              <input className='card__input' type="password" name="password" onChange={handleChange} placeholder='Password'/>
              </div>
              <div>
              <input className='card__input' type="password" name="password" onChange={handleChange} placeholder='Confirm Password' />
              </div>
              <button className='card__btn-submit' type="submit">Sign Up</button>
            </form>

            </div>
            
          </div>
        </div>
      );

}

export default SignUpModal;