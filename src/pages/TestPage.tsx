import { Link } from "react-router-dom"

export function TestPage() {

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <TestHeader/>
            <SomeContainer/>
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
            <p className="">HTML</p>
            <p className="">CSS</p>
            <p className="">JS</p>
            <p className="">React</p>
            <p className="">Vite</p>
            <p className="">TS</p>
            <p className="">Zustand</p>
            <p className="">Tailwind CSS</p>
            <p className="">FSD</p>
            <p className="">Zod</p>
            <p className="">and more...</p>
            <p className="">and more...</p>
            <p className="">and more...</p>
        </div>
    )
}