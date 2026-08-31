export function TestPage() {
    return (
        <div className="p-4 md:p-10 bg-gray-900 min-h-screen">
            <h2 className="text-white mb-4 text-xl md:text-3xl">Магазин предметов</h2>
            <div className="bg-gray-800 border-4 border-blue-100 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full shadow-lg gap-4 p-4">
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Щит</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Защитит от любых напастей</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">500</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Катана</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Уничтожит любого врага молниеносным движением</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">500</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Когти</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Добавь в свой стиль кастомные атаки</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">250</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Посох</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Научим колдовать файерболл в подарок</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">600</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Чакрам</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Кручу-верчу</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">200</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Меч</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Острая палка</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">100</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Копьё</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Палка-тыкалка</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">300</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Лук</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Палка-стрелялка</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">350</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Арбалет</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Крест-самострелялка</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">400</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
                <div className="text-white text-xl border-2 rounded-xl border-violet-800 w-full max-w-sm flex justify-between items-center bg-gray-700 mx-auto flex-col py-4 px-2 transition-transform duration-300 hover:-translate-y-2 group">
                    <div className="relative inline-block">
                        <img
                            className="border border-green-500 rounded-md h-30 w-30 object-cover block"
                            src="#"
                            alt="some_img"
                        />
                        <div className="text-violet-500 bg-gray-400 border-2 border-violet-600 rounded-full text-xs p-1 font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">Эпический</div>
                    </div>
                    <div>Кинжалы</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="text-center">Кружи ножи</div>
                    <div className="my-2 w-full h-1 bg-green-500"></div>
                    <div className="flex justify-center items-center gap-1 mb-4">
                        <div className="font-bold text-yellow-300 underline">Цена:</div>
                        <div className="text-gray-300">50</div>
                    </div>
                    <button className="text-2xl font-bold border-3 rounded-xl w-full py-1 border-violet-500 bg-violet-900 text-teal-100 pb-2 origin-top transition-all duration-300 group-hover:scale-y-115 shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                        <span className="inline-block transition-transform duration-300 origin-center group-hover:scale-y-115 will-change-transform transform-gpu select-none antialiased backface-hidden perspective-[1000px]">Купить</span>
                    </button>
                </div>
            </div>
        </div>
    )
}