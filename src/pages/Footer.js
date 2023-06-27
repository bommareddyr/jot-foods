import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer>
            <p>© 2023 Joy Of Telugu Cuisine. All rights reserved.</p>
            <div className="social-media-links">
                <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
        </footer>
    );
}

export default Footer;
