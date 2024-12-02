import React from 'react';

interface ProductItemProps {
    item: {
        id: number; // Added the id property
        img: string;
        title: string;
        des: string;
    };
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
    return (
        <div>
            <img src={item.img} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.des}</p>
        </div>
    );
};

export default ProductItem;
