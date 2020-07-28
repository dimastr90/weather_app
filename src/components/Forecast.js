import React from "react";
import {connect} from "react-redux";
import {setFavorites} from "../redux/mainReducer";
import M from "materialize-css";

const Forecast = (props) => {

    const convertTemp = (tempInCalvin, currentSystem = 'celsius') => {
        if (currentSystem === "celsius") {
            return (tempInCalvin - 273.15).toFixed(1) + String.fromCharCode(176);
        }
    };

    const getTimeFromTimestamp = (timestamp) => {
        const data = new Date(timestamp * 1000);
        return ("0" + data.getHours()).slice(-2) + ":" + ("0" + data.getMinutes()).slice(-2);
    };

    const getDateFromTimestamp = (timestamp) => {
        const data = new Date(timestamp * 1000);
        return ("0" + data.getDay()).slice(-2) + "." + ("0" + data.getMonth()).slice(-2);
    };

    const addRemoveFavorite = () => {
        const favorites = props.favorites;
        const currentCity = props.currentCity;
        if (favorites.includes(currentCity)) {
            favorites.splice(favorites.indexOf(currentCity), 1);
            M.toast({html: `${currentCity} is removed from favorites`})
        } else {
            favorites.push(currentCity);
            M.toast({html: `${currentCity} added to favorites`})
        }

        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        props.setFavorites(favorites);
    };


    return (
        <>
            <div className='row'>
                <span
                    className='forecastCityName'>{props.currentData.city.name + ', ' + props.currentData.city.country} {props.favorites.includes(props.currentData.city.name) ?
                    <span className='addIcon' onClick={addRemoveFavorite}><i
                        className="material-icons">favorite</i></span> :
                    <span className='addIcon' onClick={addRemoveFavorite}><i
                        className="material-icons">favorite_border</i></span>}</span>
            </div>
            <div className='row'>
                <div className='forecastBlock'>
                    <div className='iconAndTemp col s12 m4'>
                    <span
                        className='forecastIconAndTemp'><img
                        src={`http://openweathermap.org/img/wn/${props.currentData.list[0].weather[0].icon}@2x.png`}
                        alt='icon'/>
                        <span
                            className='forecastTemp'>{convertTemp(props.currentData.list[0].main.temp)} {props.currentData.list[0].weather[0].description}</span>
                    </span>
                    </div>
                    <div className='col s12 m8'>
                        <div className='weatherInfo'>
                            <div className='infoBlock'><p>Sunrise</p>
                                <p>{getTimeFromTimestamp(props.currentData.city.sunrise)}</p></div>
                            <div className='infoBlock'><p>Min.Temp</p>
                                <p>{convertTemp(props.currentData.list[0].main.temp_min)}</p></div>
                            <div className='infoBlock'><p>Humidity</p>
                                <p>{props.currentData.list[0].main.humidity + "%"}</p></div>
                            <div className='infoBlock'><p>Sunset</p>
                                <p>{getTimeFromTimestamp(props.currentData.city.sunset)}</p></div>
                            <div className='infoBlock'><p>Max.Temp</p>
                                <p>{convertTemp(props.currentData.list[0].main.temp_max)}</p></div>
                            <div className='infoBlock'><p>Wind</p>
                                <p>{props.currentData.list[0].wind.speed + "m/sec"}</p></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='longTermHeader'>LongTerm Forecast:</div>
            </div>
            <div className='row'>
                <div className='col s12'>
                    <div className='longTermForecast'>
                        {props.currentData.list.slice(1).map(i => <div key={'block-' + i.dt} className='longTermBlock'>
                            <div>{getDateFromTimestamp(i.dt)}</div>
                            <div>{getTimeFromTimestamp(i.dt)}</div>
                            <div><img
                                src={`http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                                alt={i.weather[0].description}
                                title={i.weather[0].description}/></div>
                            <div>{convertTemp(i.main.temp)}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
};


const mapStateToProps = (state) => ({
    currentCity: state.mainReducer.currentCity,
    currentData: state.mainReducer.currentData,
    favorites: state.mainReducer.favorites
});

export default connect(mapStateToProps, {setFavorites})(Forecast);
