const hero = {
    name: 'Карбел',
    gold: 10000,
    inventory: []
};

//обновляю золото на странице
document.querySelector('#gold-count').textContent = hero.gold;

const pageGold = document.querySelector('#gold-count');

const btn = document.querySelectorAll('.btn-trade');

let isAnimating = false;

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

            let goldBefore = hero.gold;

            //работаем напрямую с объектами персонажа
            if (hero.gold >= price) {
                hero.gold -= price;
                hero.inventory.push(itemName);
                console.log(hero);
                target.dataset.bought = "true";
                target.textContent = "Куплено";

                triggerAnimation(priceSpan, 'pulse-success', 200);

                //блокируем всё на время анимации
                btn.forEach(b => b.disabled = true);

                //передаём новое значение из объекта
                callback(hero.gold, goldBefore, 500);
            }
            else {
                triggerAnimation(priceSpan, 'shake-text', 300);
            }
        });
    });
}

function animatedGold(targetGold, startGold, duration) {
    isAnimating = true;

    let startTime = null;

    function step(timestamp) {
        //при вызове функции с помощью requestAnimationFrame в неё всегда
        //будет передаваться текущее значение времени выполнения страницы
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        //вычисляем промежуточное значение
        const currentFrameValue = Math.floor(startGold - progress * (startGold - targetGold));

        //обновление текста
        pageGold.textContent = currentFrameValue;

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
            console.log('Анимация завершена');
        }
    }
    requestAnimationFrame(step);
}

trade(animatedGold);