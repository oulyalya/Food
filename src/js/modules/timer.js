function timer(id, deadline) {
  const getTimeRemaining = function (endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  };

  const getZero = function (num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setTimer = function (selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('.timer__days');
    const hours = timer.querySelector('.timer__hours');
    const minutes = timer.querySelector('.timer__minutes');
    const seconds = timer.querySelector('.timer__seconds');
    const timeInterval = setInterval(updateTime, 1000);

    updateTime();

    function updateTime() {
      const time = getTimeRemaining(endtime);
      days.textContent = getZero(time.days);
      hours.textContent = getZero(time.hours);
      minutes.textContent = getZero(time.minutes);
      seconds.textContent = getZero(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);

        days.textContent = 0;
        hours.textContent = 0;
        minutes.textContent = 0;
        seconds.textContent = 0;
      }
    }
  };

  setTimer(id, deadline);
}

export default timer;
