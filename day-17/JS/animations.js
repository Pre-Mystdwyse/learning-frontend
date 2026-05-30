
import { updateAllUI } from "./uiUpdater.js";
import { btn, pageGold, setAnimating } from "./constants.js";

export function animatedGold(targetGold, startGold, duration) {
    setAnimating('true');
    //для задания начального времени анимации для возможности повторения цикла в указанном времени
    let startTime = null;

    btn.forEach(b => b.disabled = true);

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
            setAnimating('false');
            btn.forEach(dis => {
                if (dis.dataset.bought !== "true") {
                    dis.disabled = false;
                }
            });
            updateAllUI('buttons');
            console.log('Анимация завершена');
        }
    }
    requestAnimationFrame(step);
}

//функция добавление анимации css
export function triggerAnimation(element, className, duration) {
    if (!element) {
        console.log("Передан не элемент", element);   
        return;
    }
    element.classList.add(className);
    if (duration > 0) {
        setTimeout(() => {
            element.classList.remove(className);
        }, duration);
    }
}