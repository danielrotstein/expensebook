import { Link, NavLink } from 'react-router-dom';

function MainPage() {
    return (
        <div className="home-div">
            <img className="home-image" src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2021/03/landscape-photography-tips-4.jpg?resize=1500%2C908&ssl=1" alt="traveler"/>
            <div className="home">
                <div className="forward-div">
                    <div>
                        <p className="home-title">ExpenseBook</p>
                        <p className="home-sub-title">Enjoy your travels without sweating your budget.</p>
                        <p>ExpenseBook makes it easy to create and manage a budget, track and convert expenses, and stay on top of your finances while you trot around the world.</p>
                        <div className="d-flex home-cta-div">
                            <Link className="btn btn-primary home-cta" to="/signup">Create an Account</Link>
                            <Link className="btn btn-primary home-cta" to="$converter">Free Currency Converter</Link>
                        </div>



                       




                    </div>
                </div>
            </div>
        </div>    
    )
}

export default MainPage;
