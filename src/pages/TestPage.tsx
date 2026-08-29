import { Link } from "react-router-dom"

export function TestPage() {

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <TestHeader/>
            <div className="">
                <SomeContainer/>
                <GridContainer/>
            </div>
            <article
            className="w-full bg-gray-800 text-teal-50
            flex flex-1 justify-center items-center">
                <div className="bg-yellow-300 h-24 w-24"></div>
            </article>
        </div>
    )
}

function TestHeader() {
    return (
        <div className="flex justify-between">
            <h2>LOGO</h2>
            <div className="flex gap-4">
                <Link to="#">Главная</Link>
                <Link to="#">О нас</Link>
                <Link to="#">Контакты</Link>
            </div>
            <p>Профиль</p>
        </div>
    )
}

function SomeContainer() {
    return (
        <div className=" flex w-100 border-2 border-purple-500 bg-purple-900 flex-wrap gap-2 p-4">
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">HTML</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">CSS</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">JS</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">React</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">Vite</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">TS</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">Zustand</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">Tailwind CSS</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">FSD</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">Zod</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">and more...</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">and more...</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
            <p className="text-blue-100 border-2 p-1 border-green-600 bg-violet-900 rounded-r-4xl">and more...</p>
            <p className="text-blue-100 border-2 p-1 border-violet-600 bg-green-900 rounded-l-4xl">#</p>
        </div>
    )
}

function GridContainer() {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <div className="bg-gray-700 w-9 h-9">01</div>
            <div className="bg-gray-700 w-9 h-9">02</div>
            <div className="bg-gray-700 w-9 h-9">03</div>
            <div className="bg-gray-700 w-9 h-9">04</div>
            <div className="bg-gray-700 w-9 h-9">05</div>
            <div className="bg-gray-700 w-9 h-9">06</div>
        </div>
    )
}