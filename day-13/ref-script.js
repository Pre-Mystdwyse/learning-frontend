
const hero = {
    name: 'Карбел',
    gold: 10000,
    inventory: []
};

const currentGold = document.querySelector('#gold-count');
const btn = document.querySelectorAll('.btn-trade');

let gold = Number(currentGold.textContent);
let isAnimating = false;

trade(animatedGold); //простейший коллбек зачем-то

// function trade(callback) {
//     console.log(currentGold, gold)
//     btn.forEach(oneBtn => {
//         oneBtn.addEventListener('click', (event) => {

//             if (isAnimating) return;

//             //добавляем немного DRY для чистоты кода
//             //будто бы лучше позаботиться об этом сразу, чем потом
//             const price = Number(event.target.dataset.price);
//             const itemName = event.target.dataset.name;

//             const priceSpan = event.target.previousElementSibling;

//             if (gold >= price) {
//                 gold -= price;
//                 console.log("Покупка совершена, остаток ", gold);
//                 //добавляем в инвентарь предмет через прописанный в
//                 //HTML data-name
//                 hero.inventory.push(itemName);
//                 console.log(hero.inventory);

//                 event.target.dataset.bought = "true";
//                 event.target.textContent = "Куплено";

//                 if (priceSpan && priceSpan.classList.contains('price')) {
//                     priceSpan.classList.add('pulse-success');

//                     setTimeout(() => {
//                         priceSpan.classList.remove('pulse-success');
//                     }, 200);
//                 }

//                 btn.forEach(dis => dis.disabled = true);
//                 callback(gold);
//             }
//             else {
//                 console.log("НУЖНО БОЛЬШЕ ЗОЛОТА!");

//                 //находим предыдущий элемент в дереве DOM (работает по одному
//                 //уровню вложенности)
//                 const priceSpan = event.target.previousElementSibling;
//                 //проверяем на нужного соседа с помощью проверки классов
//                 if (priceSpan && priceSpan.classList.contains('price')) {
//                     priceSpan.classList.add('shake-text');

//                     //в css установлено значение длительности анимации в 0,3 секунды,
//                     //значит и тут нужно убрать класс через столько же времени,
//                     //чтобы бесполезно не висел
//                     setTimeout(() => {
//                         priceSpan.classList.remove('shake-text');
//                     }, 300);
//                 }
//             }
//         });
//     });
// }

function animatedGold(targetGold) {     //принимаю значение, к которому нужно стремиться
    const startGold = parseInt(currentGold.textContent);
    const duration = 500;
    let startTime = null;

    isAnimating = true;

    function step(timestamp) {
        //при вызове функции с помощью requestAnimationFrame в неё всегда
        //будет подаваться текущее значение времени с момента запуска страницы
        if (!startTime) startTime = timestamp;  //записываем время начала
        //Math.min(..., 1) нужно для того, чтобы случайно не перескочить через
        //максимально допустимое чило 1, выбирается наименьшее число из двух
        const progress = Math.min((timestamp - startTime) / duration, 1);

        //вычисляем промежуточное значение
        const currentFrameValue = Math.floor(startGold - progress * (startGold - targetGold));

        //обновление текста
        currentGold.textContent = currentFrameValue;

        //если время не вышло - продолжаем
        if (progress < 1) {
            requestAnimationFrame(step);
        }
        else {
            isAnimating = false;
            btn.forEach(dis => {
                if (dis.dataset.bought !== "true") {
                    dis.disabled = false;
                }
            });
            console.log("Анимация завершена");
        }
    }
    requestAnimationFrame(step);
}

function triggerAnimation(element, className, duration) {
    if (!element) return;
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

function trade(callback) {
    btn.forEach(oneBtn => {
        oneBtn.addEventListener('click', (event) => {
            if (isAnimating) return;

            const target = event.target;
            const price = Number(target.dataset.price);
            const itemName = target.dataset.name;
            const priceSpan = target.previousElementSibling;

            //работаем напрямую с объектами персонажа
            if (hero.gold >= price) {
                hero.gold -= price;
                hero.inventory.push(itemName);

                target.dataset.bought = "true";
                target.textContent = "Куплено";

                triggerAnimation(priceSpan, 'pulse-success', 200);

                //блокируем всё на время анимации
                btn.forEach(b => b.disabled = true);

                //передаём новое значение из объекта
                callback(hero.gold);
            }
            else {
                triggerAnimation(priceSpan, 'shake-text', 300);
            }
        });
    });
}