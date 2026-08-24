import { useState, useCallback, useEffect } from "react";
import { ShopItemCard } from "./ShopItemCard";
import { ShopItem } from "../entities/hero/model/types";
import { fetchItemsData } from "../shared/api/mockData/api";

export function RareShop() {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isError, setIsError ] = useState<boolean>(false);
    const [ data, setData ] = useState<ShopItem[]>([]);

    const loadItems = useCallback(async () => {
        setIsError(false);
        setIsLoading(true);

        try {
            const itemsData = await fetchItemsData();
            setData(itemsData);
        }
        catch {
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    function handleRefetch() {
        loadItems();
    }

    return (
        <section id="rare-shop">
            
            {isLoading && (
                <p>Кузнец раздувает меха...</p>
            )}

            {!isLoading && isError && (
                <div>
                    <p>Кузнец разбирает поставку материалов...</p>
                    <button onClick={handleRefetch}>Подождать</button>
                </div>
            )}

            {!isLoading && !isError && (
                <div className="shop-grid">
                    {data.map((item) => (
                        <ShopItemCard
                        key={item.id}
                        itemData={item}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}