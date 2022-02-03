import start from "./modules/start.js";
import getFormPerson from "./modules/fornmPerson.js";
import readyPlane from "./modules/readyPlane.js";
import getData from "./service/getTour.js";

const init = async (selectorApp, title) => { ///asinc  делает функцию асинхронной
  const app = document.querySelector(selectorApp);

  const data = await getData(); //awit дожидает выполнение промиса и потом вызывает этот метод
  
  const { main, firstForm, h1 } = start(app, title, data);

  firstForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const tourData = data.find(tour => tour.id === firstForm.tour.value); ///перебирает элементы, возврвщвет первый истиный эемент
    h1.textContent = tourData.tour;
    
    const forms = getFormPerson(firstForm.count.value);
    firstForm.remove();

    main.append(...forms);//спред оператор, выводит элементы массива по одному через запятую

    readyPlane(forms, main, tourData);
  });
};

init('.app', 'Выберите тур');