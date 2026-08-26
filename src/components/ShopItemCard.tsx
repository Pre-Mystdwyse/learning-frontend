import { useHeroStore } from "../entities/hero/model/heroStore";
import { ShopItemCardProps } from "../entities/hero/model/types";
import { useState } from "react";

export function ShopItemCard({ itemData }: ShopItemCardProps) {
    const buyItem = useHeroStore((state) => state.buyItem);

    const [ isError, setIsError ] = useState<boolean>(false);

    const handleBuy = () => {
        setIsError(false);

        const result = buyItem(itemData);

        if (result.success === false) {
            setIsError(true);

            setTimeout(() => setIsError(false), 2000);
        }
    }

    return (
        <article className="shop-item">
            <h3>{itemData.name}</h3>
            <img className="item-img" src={itemData.imgSrc} alt={itemData.imgDesc} />
            <span className="price">{itemData.price} золота</span>
            <button onClick={handleBuy}>Купить</button>
            {isError && (
                <p className="error-message">НУЖНО БОЛЬШЕ ЗОЛОТА!</p>
            )}
        </article>
    );
}