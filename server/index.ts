import express from 'express';
import cors from 'cors';
import { questsData } from './data/quests';
import items from "./data/items.json";

const app = express();
const PORT = 3000;

app.use(cors()); //разрешает фронтенду (vite на порту 5173) делать запросы сюда
app.use(express.json()); //учит сервер понимать json в теле запроса (req.body)

app.get('/api/ping', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

app.get('/api/shop/items', (req, res) => {
    const formattedItems = Object.entries(items).map(([id, item]) => {
        const { img, description, ...rest } = item;

        return {
            id,
            imgSrc: img,
            imgDesc: description,
            ...rest,
        }
    });

    res.status(200).json(formattedItems);
});

/*
суть
GET-запрос не имеет тела, но можно передать данные прямо через URL
выглдяит примерно так:
http://localhost:3000/api/quests?exclude=q-hunt,q-find
тут, всё, что идёт после знака "?" - это query parameters
конкретно в express получить к ним доступ можно с помощью req.query
*/
app.get('/api/quests', (req, res) => {
    try {
        const excludeString = req.query.exclude as string | undefined;

        const excludeIds = excludeString ? excludeString.split(',') : [];

        const excludeSet = new Set(excludeIds);
        const filteredQuests = questsData.filter(quest => !excludeSet.has(quest.id));

        for (let i = filteredQuests.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredQuests[i], filteredQuests[j]] = [filteredQuests[j], filteredQuests[i]];
        }
        res.status(200).json(filteredQuests.slice(0, 3));
    }
    catch (error) {
        console.error("Ошибка при обработке квестов:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});

//запуск сервера всегда должен быть после объявления всех роутов (да и просто по-хорошему в конце)
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});