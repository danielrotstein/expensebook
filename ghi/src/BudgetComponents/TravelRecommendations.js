import ErrorNotification from '../ErrorNotification';
import Notification from '../Notification';
import { useGetRecommendationsQuery } from '../store/recommendationsApi';


function TravelRecommendations(props) {
    const { data, error, isLoading } = useGetRecommendationsQuery();
    
    
    const handlePriceChange = event => {
        return null;
    }


    const handleCategoryChange = event => {
        return null;
    }


    if (props.categories === [] || isLoading) {
        return (
          <div className="container">
            <Notification type="info">Loading...</Notification>
          </div>
        );
    } else { 
        return (
            <>
                <div className="container">
                    <ErrorNotification error={error} />    
                    <p className="dashboard-title">Travel Recommendations that Fit Your Budget</p>
                </div>
                <div className="container filters-div">
                    <div className="d-flex">
                        <div className="d-flex filters-sub-div">
                            <select onChange={handlePriceChange} value="" name="date" id="date" className="form-select filter">
                                <option value="">Filter by Price</option>
                            </select>
                            <select onChange={handleCategoryChange} value="" name="category" id="category" className="form-select filter">
                                <option value="">Filter by Category</option>
                                    {
                                        props.categories.map(category => {
                                            return <option key={category.id} value={category.id}>{category.title}</option>
                                        })
                                    }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <br />
                    {data.map(rec => {
                        return <div key={rec.id} className="d-flex recs-div">
                            <img src={rec.image} className="rec-image"></img>
                            <div className="rec-details">
                                <p className="rec-title">{rec.title}</p>
                                <p>{rec.description}</p>
                            </div>
                            <div className="rec-cta-div">
                                <p className="rec-price">${rec.price.toLocaleString()}</p>
                                <a href={`//${rec.url}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary rec-url" id={props.remaining < 0 ? "over-budget" : null}>Learn More</a>
                            </div>
                        </div>
                    })}
                    <br />
                </div>
            </>
        )
    }
}


export default TravelRecommendations;
