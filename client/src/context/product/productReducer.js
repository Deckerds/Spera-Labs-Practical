import {
    GET_PRODUCTS,
    ADD_PRODUCTS,
    DELETE_PRODUCTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PRODUCTS,
    FILTER_PRODUCTS,
    CLEAR_PRODUCTS,
    CLEAR_FILTER,
    PRODUCTS_ERROR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case ADD_PRODUCTS:
            return {
                ...state,
                products: [...state.products, action.payload],
                loading: false
            }
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload._id ? action.payload : product
                ),
                loading: false
            }
        case DELETE_PRODUCTS:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload),
                loading: false
            }
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: null,
                filtered: null,
                error: null,
                current: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case FILTER_PRODUCTS:
            return {
                ...state,
                filtered: state.products.filter(product => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return product.name.match(regex) || product.description.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case PRODUCTS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}