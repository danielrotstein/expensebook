import { Link, NavLink } from 'react-router-dom';

function MainPage() {
    return (
        <div className="home-div">
            <img className="home-image" src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2021/03/landscape-photography-tips-4.jpg?resize=1500%2C908&ssl=1" alt="traveler"/>
            <div className="home">
                <div className="forward-div">
                    <div>
                        <p className="home-title">Expense Book</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="d-flex home-cta-div">
                            <Link className="btn btn-primary home-cta" to="/signup">Create an Account</Link>
                            <Link className="btn btn-primary home-cta" to="$converter">Currency Converter</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default MainPage;
