import './Footer.css';
import CookieConsent from "react-cookie-consent";


function Footer() {
	return (
		<>
      <div className="site-footer-wrapper">
			<div className="footer-copyright">
				<p className="text-center">© Movie List, 2023. All rights reserved</p>
			</div>
		</div>
    <CookieConsent
      buttonClasses="btn btn-sm"
      buttonText="I agree"
    >
      <p className="m-0 text-center small">Cookies help us deliver the best experience on our website. By using our website, you agree to the use of cookies.</p>
    </CookieConsent>
    </>
	);
}

export default Footer;