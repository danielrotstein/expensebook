import React from 'react';

class NotFoundPage extends React.Component{
    render(){
        return (
            <div className='home-div'>
                <div className='col-12 p-3'>
                    <img className='home-image' src='https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='lost_img' />
                    <h1 className='carousel-caption text-center text-dark'>The page you are looking for does not exist..</h1>
                </div>
            </div>
        );
    }
}
export default NotFoundPage;
