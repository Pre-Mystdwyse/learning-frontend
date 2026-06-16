import React from "react";

function ShopItem({ item, onBuy }) {
    return (
        <article className="shop-item">
            <h3>{item.name}</h3>
            <img className="item-img" src={item.img} alt={item.description} />
            <span className="price">{item.price} золота</span>
            <button onClick={() => onBuy(item.price)}>Купить</button>
        </article>
    );
}

export default ShopItem;