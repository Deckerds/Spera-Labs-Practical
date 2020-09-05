import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import axios from 'axios';
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

const ProductState = props => {
    const initialState = {
        products: null,
        error: null,
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(productReducer, initialState);

    //GET Products
    const getProducts = async () => {
        try {
            const res = await axios.get('/api/products');
            dispatch({
                type:
                    GET_PRODUCTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PRODUCTS_ERROR,
                payload: err.response.msg
            })
        }
    }


    //ADD Product
    const addProduct = async product => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/products', product, config);
            dispatch({
                type:
                    ADD_PRODUCTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PRODUCTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //UPDATE product
    const updateCurrent = async product => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/products/${product._id}`, product, config);
            dispatch({
                type:
                    UPDATE_PRODUCTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PRODUCTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //DELETE Product
    const deleteProduct = async id => {
        try {
            await axios.delete(`/api/products/${id}`);
            dispatch({
                type:
                    DELETE_PRODUCTS,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: PRODUCTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //CLEAR Products
    const clearProducts = () => {
        dispatch({ type: CLEAR_PRODUCTS });
    }

    //SET Products
    const setCurrent = product => {
        dispatch({ type: SET_CURRENT, payload: product });
    }

    //CLEAR CURRENT
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    //FILTER Products
    const filterProduct = text => {
        dispatch({ type: FILTER_PRODUCTS, payload: text });
    }

    //CLEAR FILTER
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getProducts,
                addProduct,
                deleteProduct,
                clearProducts,
                setCurrent,
                clearCurrent,
                updateCurrent,
                filterProduct,
                clearFilter
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )

}

export default ProductState;