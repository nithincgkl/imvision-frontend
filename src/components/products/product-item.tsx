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
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.img}`} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.des}</p>
        </div>
    );
};

export default ProductItem;
