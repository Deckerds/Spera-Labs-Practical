import React, { useContext, useEffect } from 'react';
import Products from '../products/Product';
import ProductForm from '../products/ProductForm';
import FilterProduct from '../products/FilterProduct';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container d-flex justify-content-center">
            <div className="row w-75">
                <div className="col">
                    <ProductForm />
                </div>
                <div className="col">
                    <FilterProduct />
                    <Products />
                </div>
            </div>
        </div>
    )
};


export default Home;