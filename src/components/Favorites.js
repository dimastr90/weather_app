import React, {useState} from "react";
import {connect} from "react-redux";
import {makeSearch} from "../redux/mainReducer";


const Favorites = (props) => {
    const [pressed, setPressed] = useState(false);


    const onFavoriteCheck = (e) => {
        props.makeSearch(e.target.id);
        setPressed(false);
    };

    return (
        <div className='favoritesBlock col s2 offset-s5 m2 offset-m10'>
            <a className="btn-floating btn-large waves-light red" href="/#" onClick={() => setPressed(!pressed)}><i
                className="material-icons">favorite</i></a>
            {pressed && <div className='favoritesList'>
                {props.favorites.length < 1 ? <div>No favorites</div>
                    : props.favorites.map(i =>
                        <div className='favoritesListItem' key={'favorite-'+i} id={i} onClick={onFavoriteCheck}>{i}</div>
                    )}
            </div>}
        </div>
    )
};


const mapStateToProps = (state) => ({
    favorites: state.mainReducer.favorites,
});

export default connect(mapStateToProps, {makeSearch})(Favorites);