import createElement from "./createElement.js";
import declOfNum from "./decOfNum.js";

const createBlockSeat = (n, count) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const fuselage = createElement('ol', {
    className: 'fuselage',
  });

  for (let i = n; i < count + n; i++) {
    const wrapperRow = createElement('li');
    const seats = createElement('ol', {
      className: 'seats',
    });

    const seatsRow = letters.map((letter) => {
      const seat = createElement('li', {
        className: 'seat',
      });

      const wrapperCheck = createElement('label');

      const check = createElement('input', {
        name: 'seat',
        type: 'checkbox',
        value: `${i}${letter}`,
      });

      wrapperCheck.append(check);
      seat.append(wrapperCheck);
      return seat;
    });

    seats.append(...seatsRow);
    wrapperRow.append(seats);

    fuselage.append(wrapperRow);
  };

  return fuselage;
};

const createAirPlane = (title, tourData) => {
  const scheme = tourData.scheme;
  const choisesSeat = createElement('form', {
    className: 'choises-seat',
  });

  const createCockpit = (titleText) => {
    const cockpit = createElement('div', {
      className: 'cockpit'
    });

    const cockpitTitle = createElement('h1', {
      className: 'cockpit-title',
      textContent: titleText,
    });

    const cockpitButton = createElement('button', {
      className: 'cockpit-confirm',
      type: 'submit',
      textContent: 'Подтвердить',
    });

    cockpit.append(cockpitTitle, cockpitButton);

    return cockpit;
  };

  const createExit = () => {
    const fuselage = createElement('div', {
      className: 'exit fuselage',
    });

    return fuselage;
  };

  const plane = createElement('fieldset', {
    className: 'plane',
    name: 'plane',
  });

  const cockpit = createCockpit(title);

  let n = 1;

  const elements = scheme.map((type) => {
    if (type === 'exit') {
      return createExit();
    };

    if (typeof type === 'number') {
      const blockSeat = createBlockSeat(n, type);
      n = n + type;

      return blockSeat;
    }
  });

  plane.append(cockpit, ...elements);

  choisesSeat.append(plane);

  return choisesSeat;
};

const checkSeat = (form, data) => {
  form.addEventListener('change', () => {
    const formData = new FormData(form);
    const checked = [...formData].map(([, value]) => value)

    if (checked.length === data.length) {
      [...form].forEach(item => {
        if (item.checked === false && item.name === 'seat') {
          item.disabled = true;
        }
      })
    }

  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const booking = [...formData].map(([, value]) => value)

    for (let i = 0; i< data.length; i++) {
      data[i].seat = booking[i];
    }
    form.remove();

    document.body.innerHTML = `
<h1 class="title"> Спасибо за регистрацию!<br> Хорошего полета!</h2>
<h2 class ="title">${booking.length === 1 ? `Ваше место ${booking}` : `Ваши места ${booking}`}    
    `

  })
};

const airPlane = (main, data, tourData) => {
  const title = `Выберите ${declOfNum(data.length, ['место', 'места', 'мест'])} `

  const choiseForm = createAirPlane(title, tourData);
  checkSeat(choiseForm, data);

  // const title = `Выберите ${data.length} 
  // ${data.length < 2  ? 'место' : data.length >= 2 && data.length < 5 ? 'места' : 'мест'}`;
  // const scheme = ['exit', 11, 'exit', 1, 'exit', 17, 'exit'];

  main.append(choiseForm)
};

export default airPlane;