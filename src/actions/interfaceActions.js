import { v4 as uuidv4 } from 'uuid';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const ADD_LOADING = 'ADD_LOADING';
export const REMOVE_LOADING = 'REMOVE_LOADING';

export const ADD_LOADING_GLOBAL = 'ADD_LOADING_GLOBAL';
export const REMOVE_LOADING_GLOBAL = 'REMOVE_LOADING_GLOBAL';

export const ADD_CATEGORIES_MENU = 'ADD_CATEGORIES_MENU';

export const ADD_ATTRIBUTES_MENU = 'ADD_ATTRIBUTES_MENU';

export const SET_STORE = 'SET_STORE';

export const SET_OPEN_MENU = 'SET_OPEN_MENU';
export const SET_OPEN_MENU_CUSTOMER_DATA = 'SET_OPEN_MENU_CUSTOMER_DATA';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addMessage = (message, severity) => (dispatch) => dispatch({
	type: ADD_MESSAGE,
	message: message,
	severity: severity
});

export const removeMessage = () => (dispatch) => dispatch({
	type: REMOVE_MESSAGE,
});

export const addLoading = (id) => (dispatch) => dispatch({
	type: ADD_LOADING,
	id: id
});

export const removeLoading = (id) => (dispatch) => dispatch({
	type: REMOVE_LOADING,
	id: id
});

export const addLoadingGlobal = (id) => (dispatch) => dispatch({
	type: ADD_LOADING_GLOBAL,
	id: id
});

export const removeLoadingGlobal = (id) => (dispatch) => dispatch({
	type: REMOVE_LOADING_GLOBAL,
	id: id
});

export const addCategoriesMenu = (payload) => (dispatch) => dispatch({
	type: ADD_CATEGORIES_MENU,
	payload: payload
});

export const addAttributesMenu = (payload) => (dispatch) => dispatch({
	type: ADD_ATTRIBUTES_MENU,
	payload: payload
});

export const setStore = (payload) => (dispatch) => dispatch({
	type: SET_STORE,
	payload: payload
});

export const handleOpenMenu = (category) => (dispatch) => dispatch({
	type: SET_OPEN_MENU,
	payload: category
});

export const handleOpenMenuCustomerData = (payload) => (dispatch) => dispatch({
	type: SET_OPEN_MENU_CUSTOMER_DATA,
	payload
});

export const addFavorite = (id, url) => {
	return (dispatch) => {
		dispatch({
			type: ADD_FAVORITE,
			id,
			url
		});
	}
};

export const removeFavorite = (id) => {
	return (dispatch) => {
		dispatch({
			type: REMOVE_FAVORITE,
			id: id
		});
	}
};

export const fetchFavorites = (favorites) => {
	return (dispatch) => {
		dispatch({
			type: FETCH_FAVORITES,
			favorites,
		});
	}
};