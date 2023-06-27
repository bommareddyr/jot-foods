import React from 'react';
import { useEffect } from 'react';
import '../CSS/ContactUs.css';
import image from '../Images/logo-contact.jpg'

function ContactUs() {

    useEffect(() => {
        document.body.classList.add('no-padding-bottom');
    
        return () => {
          document.body.classList.remove('no-padding-bottom');
        };
      }, []);

  return (
    <>
    <div className ="createnew">
    <div className="contact-us">
        <h1>Contact Us</h1>
        <p>We highly value the feedback and communication from our esteemed customers and vendors. 
            If you have any doubts, questions, or feedback regarding our Telugu food ordering website, please do not hesitate to reach out to us. Our team is committed to providing prompt assistance and addressing any concerns you may have.
            We appreciate your interest and look forward to serving you with delicious Telugu cuisine.</p>
        <div className="columns data-form">
            <div className="column">
            <div class="image-container">
            <img src= {image} alt="Contact" className='image-logo' />
            </div>
            <div className="contact-info">
                <p><i className="fas fa-phone"></i> +1 (123) 456-7890</p>
                <p><i className="fas fa-envelope"></i> jotfoods@example.com</p>
            </div>
            </div>
            <div className="column">
            <div className="form-contact">
                    <form>

                        <div className="form-group">
                            <label htmlFor="name"></label>
                            <input type="text" className="form-control" id="name" placeholder="Name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email-address"></label>
                            <input type="email" className="form-control" id="email-address" placeholder="Email Address" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message"></label>
                            <textarea id="message" className="form-control" placeholder="Message" required />
                        </div>

                        <div className="form-group">
                            <button type="submit"
                            className="btn btn-primary form-control submit-button">
                                Submit
                            </button>
                        </div>
                    </form>
                    </div>
            </div>
        </div>
        </div>
    </div>
    </>
  );
}

export default ContactUs;
