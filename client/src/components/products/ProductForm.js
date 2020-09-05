import React, { useState, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';

export const ProductForm = () => {
    const productContext = useContext(ProductContext);

    const { addProduct, current, clearCurrent, updateCurrent } = productContext;

    useEffect(() => {
        if (current !== null) {
            setProduct(current);
        } else {
            setProduct({
                name: '',
                description: '',
                quantity: 0
            });
        }
    }, [productContext, current]);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        quantity: 0
    });

    const { name, description, quantity } = product;

    const onChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addProduct(product);
            setProduct({
                name: '',
                description: '',
                quantity: ''
            })
        } else {
            updateCurrent(product);
        }
        clearAll();
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <div className="text-center h4 text-primary mt-3 mb-3">{current ? 'Update Product' : 'Add Product'}</div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="Name">Product Name</label>
                    <input className="w-100" type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="Description">Product Description</label>
                    <input className="w-100" type="text" placeholder="Description" name="description" value={description} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="Quantity">Product Quantity</label>
                    <input className="w-100" type="text" placeholder="Quantity" name="quantity" value={quantity} onChange={onChange} />
                </div>

                <input type="submit" value={current ? 'Update Product' : 'Add Product'} className="btn btn-theme white-txt btn-block mt-2" />
            </div>
            {current && (
                <div>
                    <input type="submit" value="Clear" className="btn btn-light btn-block mt-2" onClick={clearAll} />
                </div>
            )}

        </form>

    )
}

export default ProductForm;