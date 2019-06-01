import React from "react";
import "./style.css";

function Footer({ children }) {
    return (
        <div className="footer">
            <div style={{textAlign:"center"}} className="container">
                <span className="footerlink" ><a href="https://github.com/stefan-apr/Practice-Engine">Practice Engine <i class="fab fa-github"></i></a></span>
            </div>
        </div>
    )
}
export default Footer;