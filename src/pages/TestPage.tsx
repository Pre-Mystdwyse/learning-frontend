import { useCallback, useState, useEffect } from "react"

interface test_item {
    id: number,
    name: string,
    desc: string,
    price: number,
}

const TEST_ITEMS: test_item[] = [
    { id: 1, name: "Щит", desc: "Защита от любых напастей", price: 500 },
    { id: 2, name: "Катана", desc: "Уничтожит любого врага молниеносным движением", price: 500 },
    { id: 3, name: "Когти", desc: "Добавь в свой стиль кастомные атаки", price: 250 },
    { id: 4, name: "Посох", desc: "Научим колдовать файерболл в подарок", price: 600 },
    { id: 5, name: "Чакрам", desc: "Кручу-верчу", price: 200 },
    { id: 6, name: "Меч", desc: "Острая палка", price: 100 },
    { id: 7, name: "Копьё", desc: "Палка-тыкалка", price: 300 },
    { id: 8, name: "Лук", desc: "Палка-стрелялка", price: 350 },
    { id: 9, name: "Арбалет", desc: "Крест-самострелялка", price: 400 },
    { id: 10, name: "Кинжалы", desc: "Кружи ножи", price: 50 },
]

export function TestPage() {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isError, setIsError ] = useState<boolean>(false);
    const [ data, setData ] = useState<test_item[]>([]);

    const loadItems = useCallback(async () => {
        setIsError(false);
        setIsLoading(true);

        try {
            const itemsData = await fetchTestData();
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

    function handleReload() {
        loadItems();
    }

    return (
        <div className="p-4 md:p-10 bg-gray-900 min-h-screen">
            <h2 className="text-white mb-4 text-xl md:text-3xl">Магазин предметов</h2>
            <div className="bg-gray-800 border-4 border-blue-100 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full shadow-lg gap-4 p-4">
                {data.map((item) => (
                    <TestItemCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}

interface TestItemCardProps {
    item: test_item,
}

function TestItemCard({ item }: TestItemCardProps) {

    return (
        <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
            <div className="w-full flex-none flex flex-col items-center">
                <div className="relative inline-block">
                    <img
                        className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                        src="#"
                        alt="some_img"
                    />
                    <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                </div>
                <div>{item.name}</div>
                <div className="my-2 w-full h-1 bg-green-500"></div>
            </div>
            <div className="text-center flex-1 flex items-center justify-center">{item.desc}</div>
            <div className="w-full flex-none mt-auto">
                <div className="my-2 w-full h-1 bg-green-500"></div>
                <div className="flex justify-center items-center gap-1 mb-4">
                    <div className="font-bold text-yellow-300 underline">Цена:</div>
                    <div className="text-gray-300">{item.price}</div>
                </div>
                <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                    Купить
                </button>
            </div>
        </div>
    )
}

const fetchTestData = (): Promise<test_item[]> => {
    
    return new Promise((resolve, reject) => {
        const tryToConnect = Math.floor(Math.random() * 100) + 1;

        setTimeout(() => {
            if (tryToConnect >= 50) {
                const formattedItems = TEST_ITEMS.map((item) => ({ ...item }));
                resolve(formattedItems);
            }
            else {
                reject(new Error("Ошибка подключения к серверу"));
            }
        }, 2000)
    })
}