
const currentGold = document.querySelector('#gold-count');
const btn = document.querySelectorAll('.btn-trade');

let gold = parseInt(currentGold.textContent);

trade(animatedGold); //простейший коллбек зачем-то

function trade(callback) {
    console.log(currentGold, gold)
    btn.forEach(oneBtn => {
        oneBtn.addEventListener('click', (event) => {
            if (gold >= 500) {
                gold -= 500;
                // currentGold.textContent = gold;
                console.log("Покупка совершена, остаток ", gold);
                callback(gold);
            }
            else {
                console.log("НУЖНО БОЛЬШЕ ЗОЛОТА!");
            }
        });
    });
}

function animatedGold(targetGold) {     //принимаю значение, к которому нужно стремиться
    const startGold = parseInt(currentGold.textContent);
    const duration = 500;
    let startTime = null;

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
    }
    requestAnimationFrame(step);
}