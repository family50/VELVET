import './footer.css';


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand-area">
                    {/* Brand Identity */}
                    <img src="/______________removed_bg_2026-02-15T01-32-16.png" alt="Family Group Logo" className="footer-logo-img" />
                    <h2 className="brand-name">FAMILY GROUP</h2>
                    <p className="brand-bio">
                        Architecting the digital future with precision. A boutique software house 
                        specializing in bespoke digital solutions, where luxury meets 
                        high-performance technology.
                    </p>
                </div>

             <div className="footer-social-links">
    <span className="social-label">CONNECT WITH US</span>
    <div className="social-icons">
        <a href="https://x.com/FamilyGroup8320" target="_blank" rel="noreferrer" className="social-icon">
            <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/in/family-group-69a419395" target="_blank" rel="noreferrer" className="social-icon">
            <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/family50" target="_blank" rel="noreferrer" className="social-icon">
            <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.tiktok.com/@familygroup974" target="_blank" rel="noreferrer" className="social-icon">
            <i className="fa-brands fa-tiktok"></i>
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=familygroup832005@gmail.com" className="social-icon">
            <i className="fa-solid fa-envelope"></i>
        </a>
    </div>
</div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">
                <div className="footer-copyright">
                    © 2026 FAMILY GROUP | ARCHIVE. ALL RIGHTS RESERVED.
                </div>
                <div className="footer-status">
                    BASED IN EGYPT — GLOBAL OPERATIONS
                </div>
            </div>
        </footer>
    );
}

export default Footer;