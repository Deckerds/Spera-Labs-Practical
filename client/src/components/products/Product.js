import React, { useContext, Fragment, useEffect } from 'react';
import ProductItem from './ProductItem';
import ProductContext from '../../context/product/productContext';
import Spinner from '../layouts/Spinner';

const Product = () => {
    const productContext = useContext(ProductContext);
    const { products, filtered, getProducts, loading } = productContext;

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, [])

    if (products !== null && products.length === 0 && !loading) {
        return <div className="h3">Please add a product</div>
    }

    return (
        <Fragment>
            {products !== null && !loading ? (
                <div className="d-flex justify-content-around flex-wrap m-2">
                    {filtered !== null ? filtered.map(product =>
                        (<ProductItem key={product._id} product={product} />)
                    ) : products.map(product => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
            ) : <Spinner />}
        </Fragment>
    )
}

export default Product;
