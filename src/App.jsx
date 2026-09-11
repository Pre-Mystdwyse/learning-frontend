import { useEffect } from 'react';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { useQuestStore } from './entities/hero/model/questStore';

function App() {

    useEffect(() => {
        const syncQuests = useQuestStore.getState().syncActiveQuests;
        syncQuests();
    }, []);

    return (
        
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
            <Header />
            <main className='flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8'>
                {/*Outlet нужен для того, чтобы сюда подставлялся необоходимый код
                в зависимости от пути. это позволяет избежать перерендера того же
                хедера и прочего на каждой странице, ведь суть реакта в одностраничности */}
                <Outlet />
            </main>
        </div>
    );
}

export default App;