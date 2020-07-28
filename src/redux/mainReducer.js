const SET_INPUT_CITY_TEXT = 'SET_INPUT_CITY_TEXT';
const SET_CURRENT_CITY = 'SET_CURRENT_CITY';
const SET_CURRENT_DATA = 'SET_CURRENT_DATA';
const SET_FAVORITES = 'SET_FAVORITES';
const SET_AUTOCOMPLETE_DATA = "SET_AUTOCOMPLETE_DATA";

const initialState = {
    inputCityText: '',
    currentCity: '',
    currentData: {},
    favorites: [],
    autocompleteData: []
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INPUT_CITY_TEXT:
            return {
                ...state,
                inputCityText: action.payload
            };
        case SET_CURRENT_DATA:
            return {
                ...state,
                currentData: action.payload
            };
        case SET_CURRENT_CITY:
            return {
                ...state,
                currentCity: action.payload
            };
        case SET_FAVORITES:
            return {
                ...state,
                favorites: [...action.payload]
            };
        case SET_AUTOCOMPLETE_DATA:
            return {
                ...state,
                autocompleteData: [...action.payload]
            }
        default:
            return state;

    }
};

//set input text;
export const setInputCityText = (payload) => ({type: SET_INPUT_CITY_TEXT, payload});
const setCurrentData = (payload) => ({type: SET_CURRENT_DATA, payload});
export const setCurrentCity = (payload) => ({type: SET_CURRENT_CITY, payload});
export const setFavorites = (payload) => ({type: SET_FAVORITES, payload});
export const setAutoCompleteData = (payload) => ({type: SET_AUTOCOMPLETE_DATA, payload});

//make request to API;
export const makeSearch = (cityName) => async (dispatch) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3283c1e0d54cb615c6f2304a6d536bce`);
        const data = await response.json();

        if (!response.ok) {
            return 'error';
        }

        dispatch(setCurrentData(data));
        dispatch(setCurrentCity(data.city.name));
    } catch (e) {
        throw e;
    }
};

export const findCityInApi = (latitude, longitude) => async (dispatch) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();

        if (!response.ok) {
            return 'error';
        }

        dispatch(makeSearch(data.address.city));
    } catch (e) {
        throw e;
    }
};


export const loadAutocompleteData = (requestString) => async (dispatch) => {
    try {
        const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${requestString}`);
        const data = await response.json();


        if (!response.ok) {
            return 'error';
        }


        dispatch(setAutoCompleteData(data.data.map(i => i.name)));

    } catch (e) {
        throw e;
    }
};


export default mainReducer;

