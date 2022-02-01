import start from "./modules/start.js";
import getFormPerson from "./modules/fornmPerson.js";

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const { main, firstForm } = start(app, title);

  firstForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const forms = getFormPerson(firstForm.count.value);
    firstForm.remove();

    main.append(...forms);//спред оператор, выводит элементы массива по одному через запятую
  });
};

init('.app', 'Выберите тур');