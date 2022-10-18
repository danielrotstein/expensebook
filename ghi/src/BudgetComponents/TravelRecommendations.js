import ErrorNotification from '../ErrorNotification';
import Notification from '../Notification';
import Moment from 'moment';


function TravelRecommendations(props) {
    const handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    if (props.categories === []) {
        return (
          <div className="container">
            <Notification type="info">Loading...</Notification>
          </div>
        );
    } else { 
        return (
            <>
                <div className="container">       
                    <p className="dashboard-title">Travel Recommendations that Fit Your Budget</p>
                </div>
                <div className="container filters-div">
                    <div className="d-flex">
                        <div className="d-flex filters-sub-div">
                            <select onChange={handleChange} value="" name="date" id="date" className="form-select filter">
                                <option value="">Filter by Price</option>
                            </select>
                            <select onChange={handleChange} value="" name="category" id="category" className="form-select filter">
                                <option value="">Filter by Category</option>
                                    {
                                        props.categories.map(category => {
                                            return <option key={category.id} value={category.id}>{category.title}</option>
                                        })
                                    }
                            </select>
                        </div>
                        <button className="btn btn-primary add-expense-cta">Shuffle</button>
                    </div>
                </div>
                <div className="container">
                    <br />
                    <div className="d-flex metrics-div">
                        
                    </div>
                    <br />
                </div>
            </>
        )
    }
}


export default TravelRecommendations;
