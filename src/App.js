import React, {useEffect} from 'react';
import "materialize-css/dist/css/materialize.min.css";
import './App.css';
import InputForm from "./components/InputForm";
import {setFavorites} from "./redux/mainReducer";
import {connect} from "react-redux";
import Forecast from "./components/Forecast";
import Favorites from "./components/Favorites";

const App = (props) => {

    useEffect(() => {
        if (localStorage.getItem('weatherFavorites') !== null) {
            props.setFavorites(JSON.parse(localStorage.getItem('weatherFavorites')));
        }
    });


    return (
        <div className="App">
            <div className='container'>
                <div className='row'>
                    <Favorites/>
                </div>
                <div className='row'>
                    <InputForm/>
                </div>
                {props.currentCity && <Forecast/>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentCity: state.mainReducer.currentCity,
});

export default connect(mapStateToProps, {setFavorites})(App);
