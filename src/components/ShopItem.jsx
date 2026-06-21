import { useTrade } from "../features/buy-product/model/useTrade";

function ShopItem({ itemData }) {
    const { buyItem } = useTrade();

    return (
        <article className="shop-item">
            <h3>{itemData.name}</h3>
            <img className="item-img" src={itemData.img} alt={itemData.description} />
            <span className="price">{itemData.price} золота</span>
            <button onClick={() => buyItem(itemData)}>Купить</button>
        </article>
    );
}

export default ShopItem;