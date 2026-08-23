import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {


    return (
        
        <div className="app">
            <Header />
            <main>
                {/*Outlet нужен для того, чтобы сюда подставлялся необоходимый код
                в зависимости от пути. это позволяет избежать перерендера того же
                хедера и прочего на каждой странице, ведь суть реакта в одностраничности */}
                <Outlet />
            </main>
        </div>
    );
}

export default App;