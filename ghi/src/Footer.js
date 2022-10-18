import React from 'react';


function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            <div className="footer-container">
                <div className="container-fluid footer-div">
                    <p>{`© ${year} | ExpenseBook`}</p>
                </div>
            </div>
        </>
    )
}


export default Footer;
