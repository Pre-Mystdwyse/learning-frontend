<div align="center">
  <h1>песочница-rpg</h1>
  <table>
    <tr>
      <td>
        Стек:
      </td>
      <td >
        <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
        <img src="https://img.shields.io/badge/TypeScript_7-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Tailwind_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
        <img src="https://img.shields.io/badge/Zustand_5-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Zustand" />
        <img src="https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
      </td>
    </tr>
  </table>

  <h3>
    🔗 <a href="https://learning-frontend-phi.vercel.app?_vercel_share=f3pYI7Nx3RRGkKAT4PvH9p9dsRfIgU6p">Посмотреть Live Demo</a>
  </h3>
</div>



## О проекте:
Интерактивный дашборд с элементами RPG. Проект разработан для демонстрации навыков проектирования сложной бизнес-логики, работы с глобальным состоянием и построения масштабируемой архитектуры. Основной упор сделан на надёжность, производительность и чистоту кода. (UI/UX реализован базово, так как основной фокус проекта сделан на сложную инженерную логику, работу с памятью и архитектуру)

## Технологический стек:
* Core: React 19, TypeScript 7 (ES2025), Vite 8;
* State management: Zustand 5;
* Routing: React Router v6;
* Style: Tailwind CSS v4;
* Code quality: ESLint (flat config), Prettier

## Ключевой функционал:
- **Торговый квартал:** Покупка экипировки с проверкой баланса и генерацией уникальных инстансов предметов;
- **Инвентарь:** Управление предметами с возможностью продажи и **отмены последних действий (Undo)**;
- **Доска квестов:** Асинхронная загрузка заданий, выполнение квестов в реальном времени с фоновыми таймерами;
- **Профиль героя:** Редактирование характеристик, мировоззрения и навыков;

## Инженерные решения:

* Архитектура:
    *  проект построен по `FSD`;
    *  использую `public API` для инкапсуляции логики внутри слайсов;
    *  настроены абсолютные импорты для чистоты путей;

макет дерева на момент соответствующего коммита:
<details>
  <summary>src</summary>
  <ul>
    <li>
      <details>
        <summary>app</summary>
        <ul>
          <li>App.tsx</li>
          <li>main.tsx</li>
          <li>style.css</li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>pages</summary>
        <ul>
          <li>ProfilePage.tsx</li>
          <li>QuestPage.tsx</li>
          <li>ShopPage.tsx</li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>widgets</summary>
        <ul>
          <li>header</li>
          <li>inventory</li>
          <li>quest-board</li>
          <li>shop</li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>features</summary>
        <ul>
          <li>buy-item</li>
          <li>sell-item</li>
          <li>start-quest</li>
          <li>update-profile</li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>entities</summary>
        <ul>
          <li>hero</li>
          <li>inventory</li>
          <li>quest</li>
          <li>shop</li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>shared</summary>
        <ul>
          <li>api</li>
          <li>hooks</li>
          <li>lib</li>
        </ul>
      </details>
    </li>
  </ul>
</details>
 
*  State management:
    *  для сторов использован `Zustand`, прописана транзакционость для предотвращения состояния гонки и дюпа предметов при быстрых кликах;
    *  насроил `Custom Middleware`, которое перехватывает функцию `set` для создания снимка стейта, необходимого функции отмены последних действий;
    *  для выборочного сохранения прогресса в `LocalStorage` использованы `persist` и `partialize`;
    
*  Оптимизация:
    *  Таймеры квестов отвязаны от жизненного цикла React. Для плавной анимации прогресс-баров используется нативный **Web Animations API** (`Element.animate()`) в связке с `transform: scaleX`, что переносит расчеты на GPU и исключает пустые ре-рендеры;
    *  Прописана защита от утечек памяти путём удаления при размонтировании таймеров, интервалов, объектов анимации и тач-ивентов;
    *  Оптимизация рендеринга списков через `useMemo` и `React.memo` (больше для демонстрации умения пользоваться, чем реальной прибавки производительности);
    
* Mock API и алгоритмы:
    *  Имитация сетевых задержек и обработка серверных ошибок;
    *  Использование **Алгоритма Фишера-Йетса** для идеальной рандомизации выдачи квестов;
    *  Оптимизация фильтрации дубликатов через структуру данных `Set`;
    *  Использование `UUID v7` для генерации ID предметов (в первую очередь для оптимизации под БД);
    *  использую `satisfies` вместе с `as const` для валидации статических данных на этапе компиляции без потери точных литеральных типов;
    
* Адаптивный UI:
    *  Mobile-First с полной адаптивностью под любые экраны;
    *  использовал CSS Grid (`auto-fit`, `minmax`) для резинового инвентаря и CSS Columns для плиточной верстки квестов на лад Masonry Layout;
    *  Кастомная реализация Touch-событий для закрытия модальных окон свайпом вниз (знаю, что для этого лучше использовать готовые библиотеки, мне просто было интересно прописать самим);
    *  написал `useModalBehavior`, который как следит за Esc для закрытия, так и компенсирует ширину скроллбара при блокировке скролла, ~~и именно поэтому свечка и совершает свои колебания~~ и именно поэтому страница не дёргается;

* Инфраструктура и code quality:
    *  настроил абсолютные импорты на уровне сборщика и tsconfig, при этом использую новый `Rolldown` вместо старого `Rollup` бандлера для оптимизации сборки;
    *  использую в проекте современный ESLint flat config, а также Prettier с плагином для `tailwind css`. все настройки форматирования зафиксированы на воркспейс-уровне;
    *  модальные окна и меню для мобильных устройств сделаны с помощью `createPortal` на уровне `body` воизбежание конфликтов z-индексов и багов с `backdrop-filter` у родительских контейнеров.

 ## Локальный запуск
 
<details>
<summary>Нажмите, чтобы развернуть</summary>
  
Требование: Node.js 20+

  
1. Клонировать репозиторий:
   ```bash
   git clone https://github.com
   ```
2. Установить зависимости:
   ```bash
   npm install
   ```
3. Запустить dev-сервер:
   ```bash
   npm run dev
   ```
   Либо запустить для локальной сети:
   ```bash
   npm run dev -- --host
   ```

</details>

## Roadmap:
-  Внедрение `Zod` + `react-hook-form` для строгой рантайм-валидации формы профиля;
-  Покрытие бизнес-логики Unit-тестами с помощью `Vitest`;
-  рефакторинг хранения предметов (сейчас хранятся полные объекты в сторе персонажа, а должны лишь ID);
-  внедрение `@feature-sliced/eslint-config` для автоматического контроля архитектурных границ и запрета кросс-импортов.

## Контакты:
Мирошниченко Максим
* Telegram: @mystdwyse
