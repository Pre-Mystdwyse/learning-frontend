let currentGold = 1000;
const gold = document.querySelector('#gold-count');
const btn = document.querySelectorAll('.btn-trade');

btn.forEach(oneBtn => {
    oneBtn.addEventListener('click', () => {
        if (currentGold >= 100) {
            currentGold -= 100;
            gold.textContent = currentGold;
            console.log("Осталось золота: ", currentGold);
        }
        else {
            console.log("Нужно больше золота!");
        }
    });
});

function animatedGold(targetValue) {
    const goldElement = document.querySelector('#gold-count');
    let currentValue = parseInt(goldElement.textContent);
    //берём значение и преобразуем в числовое
    const duration = 500; //длительность анимации считается в мс
    const stepTime = 20;

    //вычисляем сколько прибавить за 1 шаг
    const steps = duration / stepTime;
    const increment = (targetValue - currentValue) / steps;

    const timer = setInterval(() => {
        currentValue += increment;

        //если дошли до цели или перелетели, то останавливаемся
        if ((increment > 0 && currentValue >= targetValue) ||
        (increment < 0 && currentValue <= targetValue)) {
            clearInterval(timer);
            goldElement.textContent = targetValue; //ставим точное финальное число
        }
        else {
            //округляем, чтобы не было дробных чисел на экране
            goldElement.textContent = Math.floor(currentValue);
        }
    }, stepTime);
}