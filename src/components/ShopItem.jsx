import { useHeroStore } from "../entities/hero/model/heroStore";

function ShopItem({ itemData }) {
    const buyItem = useHeroStore((state) => state.buyItem);

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