import React from "react";
import M from 'materialize-css';
import {connect} from "react-redux";
import {findCityInApi, loadAutocompleteData, makeSearch, setInputCityText} from "../redux/mainReducer";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

const InputForm = (props) => {

    const locationButtonHandler = () => {
        getCoordinates();
    };

    const getCityByCoordinates = (latitude, longitude) => {
        props.findCityInApi(latitude, longitude).then(data => data === 'error' && M.toast({html: 'Something went wrong'}));
    };

    const getCoordinates = () => {
        if (!navigator.geolocation) {
            M.toast({html: 'Geolocation is not supported by your browser'});
        } else {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
            const error = (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            };
            const success = (pos) => {
                getCityByCoordinates(pos.coords.latitude, pos.coords.longitude);
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    };

    const searchHandler = (e) => {
        e.preventDefault();
        const value = props.inputCityText.trim();
        if (value.length < 1) {
            M.toast({html: 'Input is empty'});
        } else {
            props.makeSearch(value).then(data => data === 'error' && M.toast({html: 'City is not found'}));
        }
    };

    const changeInputHandler = (e,values) => {
        props.setInputCityText(values);
        props.loadAutocompleteData(values);
    };

    return (
        <>
            <div className="col s12 m8 offset-m2 l6 offset-l3">
                <h1>Weather App</h1>
                <div className='inputCityName'>
                    <form onSubmit={searchHandler}>
                        <div className='inputDiv'>
                            <div>
                                <Autocomplete
                                    id="inputAutoComplete"
                                    inputValue={props.inputCityText}
                                    freeSolo
                                    onInputChange={changeInputHandler}
                                    options={props.autocompleteData}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Enter your city name:"
                                                   margin="normal" variant="outlined"/>
                                    )}
                                />
                            </div>
                            <div className='geoButton'>
                                <a className="btn-floating btn-large" onClick={locationButtonHandler}><i
                                    className="material-icons">location_on</i></a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

const mapStateToProps = (state) => ({
    inputCityText: state.mainReducer.inputCityText,
    autocompleteData: state.mainReducer.autocompleteData
});

export default connect(mapStateToProps, {setInputCityText, makeSearch, findCityInApi,loadAutocompleteData})(InputForm);