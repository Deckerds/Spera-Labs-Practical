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
        <div className="container">
            <div >
                <div className="w-50 ml-auto mr-auto">
                    <ProductForm />
                </div>
                <div className="mt-5">
                    <hr />
                    <h2 className="text-center mt-3">Your <span className="text-primary">Products</span></h2>
                    <div className="w-50">
                        <FilterProduct />
                    </div>
                    <div>
                        <Products />
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Home;