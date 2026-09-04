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
        <div>
      <div className="min-h-screen bg-gray-900 p-4 md:p-10">
        <h2 className="mb-4 text-xl text-white md:text-3xl">Магазин предметов</h2>
        <div className="grid w-full grid-cols-1 gap-4 rounded-2xl border-4 border-blue-100 bg-gray-800 p-4 shadow-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading && (
            <p className="col-span-full flex justify-center text-xl text-white">
              Кузнец сейчас подойдёт...
            </p>
          )}

          {!isLoading && isError && (
            <div className="col-span-full flex justify-center gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-xl text-white">Кузнец ушёл на обед</p>
                <button
                  className="border-violet w-full rounded-xl border-3 bg-violet-900 pb-1 text-xl font-bold text-teal-100"
                  onClick={handleRefetch}
                >
                  Подождать
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {data.map((item) => (
                <ShopItemCard key={item.id} itemData={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
    )
}