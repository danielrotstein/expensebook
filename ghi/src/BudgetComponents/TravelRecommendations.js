import { useEffect, useState } from 'react';
import ErrorNotification from '../ErrorNotification';
import Notification from '../Notification';
import { useGetRecommendationsQuery } from '../store/recommendationsApi';
import { useGetBudgetsQuery } from '../store/budgetsApi';


function TravelRecommendations(props) {
    const { 
        data: recData, 
        error: recError, 
        isLoading: recIsLoading 
    } = useGetRecommendationsQuery();
    const {
        data: budgetData, 
        error: budgetError, 
        isLoading: budgetIsLoading
    } = useGetBudgetsQuery();


    const [recommendations, setRecommendations] = useState([]);
    const [filteredRecs, setFilteredRecs] = useState([]);

    
    useEffect(() => {
        if (!(budgetIsLoading || recIsLoading)) {
            let currentBudget = {};
            budgetData.map(budget => {
                if (budget.id === parseInt(props.budget)) {
                    currentBudget = budget
                }
            });
            const tempRecs = [];
            recData.map(rec => {
                if (rec.country === currentBudget.destination_country) {
                    tempRecs.push(rec);
                }
            });
            setRecommendations(tempRecs);
            setFilteredRecs(tempRecs); 
        }
    }, [budgetIsLoading, recIsLoading]);


    const handlePriceChange = event => {
        const value = event.target.value;
        const priceRange = {
            "1": [0, 50],
            "2": [51, 100],
            "3": [101, 200],
            "4": [201, 500],
            "5": [501, 1000000],
        }
        const priceRecs = [];

        if (value === "") {
            setFilteredRecs(recommendations);
        } else {
            recommendations.map(rec => {
                if (rec.price.toString() >= priceRange[value][0] && rec.price.toString() <= priceRange[value][1]) {
                    priceRecs.push(rec);
                }
                return;
            });
            setFilteredRecs(priceRecs);
        }
    }


    const handleCategoryChange = event => {
        const value = event.target.value;
        const categoryRecs = [];

        if (value === "") {
            setFilteredRecs(recommendations);
        } else {
            recommendations.map(rec => {
                if (rec.category_id.toString() === value) {
                    categoryRecs.push(rec);
                }
                return;
            });
            setFilteredRecs(categoryRecs);
        }
    }


    if (props.categories === [] || recIsLoading || budgetIsLoading) {
        return (
          <div className="container">
            <Notification type="info">Loading...</Notification>
          </div>
        );
    } else { 
        return (
            <>
                <div className="container">
                    <ErrorNotification error={recError} />    
                    <p className="dashboard-title">Travel Recommendations that Fit Your Budget</p>
                </div>
                <div className="container filters-div">
                    <div className="d-flex">
                        <div className="d-flex filters-sub-div">
                            <select onChange={handlePriceChange} name="date" id="date" className="form-select filter">
                                <option value="">Filter by Price</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </select>
                            <select onChange={handleCategoryChange} name="category" id="category" className="form-select filter">
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
                    {filteredRecs.map(rec => {
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