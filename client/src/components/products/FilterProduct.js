import React, { useContext, useEffect, useRef } from 'react';
import ProductContext from '../../context/product/productContext';

const FilterProduct = () => {
    const productContext = useContext(ProductContext);
    const text = useRef('');
    const { filterProduct, clearFilter, filtered } = productContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterProduct(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input className="mt-3 w-100 mb-2" ref={text} placeholder="Filter Products..." onChange={onChange} />
        </form>
    )
}

export default FilterProduct;