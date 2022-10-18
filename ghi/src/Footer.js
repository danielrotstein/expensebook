import React from 'react';


function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="container-fluid footer-div">
                    <p>© 2022 | ExpenseBook</p>
                </div>
            </div>
        </>
    )
}


export default Footer;


// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//     const year = new Date().getFullYear();

//     return <footer className="text-center">
//                 {`© 2022 | ExpenseBook ${year}`}
//                 {/* <Link to="/about" className="btn btn-md px-4 gap-3">
//                     About
//                 </Link> */}
//             </footer>;
// };

// export default Footer;
