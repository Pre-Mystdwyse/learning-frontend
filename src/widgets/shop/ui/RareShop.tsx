import { ShopItemCard } from '@/entities/shop';
import { BuyItemBtn } from '@/features/buy-item';
import { getShopItems } from '@/entities/shop';
import { useQuery } from '@tanstack/react-query';

export function RareShop() {

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['ShopItems'],
    queryFn: getShopItems,
  });

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
                  onClick={() => refetch()}
                >
                  Подождать
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {data?.map((item) => (
                <ShopItemCard
                  key={item.id}
                  itemData={item}
                  actionSlot={<BuyItemBtn itemData={item} />}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
