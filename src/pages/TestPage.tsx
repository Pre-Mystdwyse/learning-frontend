import { useCallback, useState, useEffect } from 'react';

interface TestItem {
  id: number;
  name: string;
  desc: string;
  price: number;
}

const TEST_ITEMS: TestItem[] = [
  { id: 1, name: 'Щит', desc: 'Защита от любых напастей', price: 500 },
  { id: 2, name: 'Катана', desc: 'Уничтожит любого врага молниеносным движением', price: 500 },
  { id: 3, name: 'Когти', desc: 'Добавь в свой стиль кастомные атаки', price: 250 },
  { id: 4, name: 'Посох', desc: 'Научим колдовать файерболл в подарок', price: 600 },
  { id: 5, name: 'Чакрам', desc: 'Кручу-верчу', price: 200 },
  { id: 6, name: 'Меч', desc: 'Острая палка', price: 100 },
  { id: 7, name: 'Копьё', desc: 'Палка-тыкалка', price: 300 },
  { id: 8, name: 'Лук', desc: 'Палка-стрелялка', price: 350 },
  { id: 9, name: 'Арбалет', desc: 'Крест-самострелялка', price: 400 },
  { id: 10, name: 'Кинжалы', desc: 'Кружи ножи', price: 50 },
];

export function TestPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<TestItem[]>([]);

  const loadItems = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const itemsData = await fetchTestData();
      setData(itemsData);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  function handleReload() {
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
                  onClick={handleReload}
                >
                  Подождать
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {data.map((item) => (
                <TestItemCard key={item.id} item={item} />
              ))}
            </>
          )}
        </div>
      </div>
      <MasonryLayout />
    </div>
  );
}

interface TestItemCardProps {
  item: TestItem;
}

function TestItemCard({ item }: TestItemCardProps) {
  return (
    <div className="group mx-auto flex w-full max-w-sm flex-col items-center justify-between rounded-xl border-2 border-violet-800 bg-gray-700 px-2 py-4 text-xl text-white transition-transform duration-300 hover:-translate-y-2">
      <div className="flex w-full flex-none flex-col items-center">
        <div className="relative inline-block">
          <img
            className="block h-30 w-30 rounded-md border border-green-500 object-cover"
            src="#"
            alt="some_img"
          />
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-600 bg-gray-400 p-1 text-xs font-bold text-violet-500">
            Эпический
          </div>
        </div>
        <div>{item.name}</div>
        <div className="my-2 h-1 w-full bg-green-500"></div>
      </div>
      <div className="flex flex-1 items-center justify-center text-center">{item.desc}</div>
      <div className="mt-auto w-full flex-none">
        <div className="my-2 h-1 w-full bg-green-500"></div>
        <div className="mb-4 flex items-center justify-center gap-1">
          <div className="font-bold text-yellow-300 underline">Цена:</div>
          <div className="text-gray-300">{item.price}</div>
        </div>
        <button className="group/btn relative w-full py-1 pb-2">
          <div className="absolute inset-0 origin-top rounded-xl border-3 border-violet-500 bg-violet-900 shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-transform duration-300 group-hover/btn:scale-y-115 group-hover/btn:shadow-[0_0_30px_rgba(139,92,246,0.8)]"></div>
          <span className="relative z-10 block text-2xl font-bold text-teal-100">Купить</span>
        </button>
      </div>
    </div>
  );
}

const fetchTestData = (): Promise<TestItem[]> => {
  return new Promise((resolve, reject) => {
    const tryToConnect = Math.floor(Math.random() * 100) + 1;

    setTimeout(() => {
      if (tryToConnect >= 99) {
        const formattedItems = TEST_ITEMS.map((item) => ({ ...item }));
        resolve(formattedItems);
      } else {
        reject(new Error('Ошибка подключения к серверу'));
      }
    }, 2000);
  });
};

function MasonryLayout() {
  return (
    <div className="mx-4 my-4 columns-2 gap-4 sm:columns-3xs">
      <div className="mb-4 aspect-auto h-32 break-inside-avoid bg-red-500"></div>
      <div className="mb-4 aspect-auto h-42 break-inside-avoid bg-green-500"></div>
      <div className="mb-4 aspect-auto h-64 break-inside-avoid bg-blue-500"></div>
      <div className="mb-4 aspect-auto h-73 break-inside-avoid bg-violet-500"></div>
      <div className="mb-4 aspect-auto h-21 break-inside-avoid bg-purple-500"></div>
      <div className="mb-4 aspect-auto h-55 break-inside-avoid bg-yellow-500"></div>
    </div>
  );
}
