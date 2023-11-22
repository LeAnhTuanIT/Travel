import React from 'react'
// import "@/css/footer.scss"
const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-container container">
        <div className="footer-container-sub">
            <span className="footer-content">Phone Support</span>
            <span className="footer-sub">24 HOURS A DAY</span>
            <span className="footer-contact">+ 01 345 647 745</span>
        </div>

        <div className="footer-container-sub">
             <span className="footer-content">Connect With Us</span>
            <span className="footer-sub">SOCIAL MEDIA CHANNELS</span>
            <div className="footer-social">
               <a href="" className="footer-social-icon "> <span className="ti-instagram"></span> </a>
              <a href="" className="footer-social-icon ">  <span className="ti-twitter-alt"></span> </a>
             <a href="https://www.facebook.com/ta.loi.9235/" className="footer-social-icon ">  <span className="ti-facebook"></span> </a>
               <a href="" className="footer-social-icon " >  <span className="ti-pinterest"></span></a>
              <a href="" className="footer-social-icon ">  <span className="ti-youtube"></span> </a>
            </div>
        </div>

        <div className="footer-container-sub">
              <span className="footer-content">Newsletter</span>
            <span className="footer-sub">SIGN UP FOR SPECIAL OFFERS</span>

             <div className= "footer-subscribe">
                <input type="email" className="footer-subscribe-email" placeholder="Email"/>
                <button className="footer-subscribe-btn">Subscribe</button>
            </div>
        </div>
    </div>

</footer>
  )
}

export default Footer