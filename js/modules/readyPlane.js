import airPlane from "./airPlane.js";

const readyPlane = (forms, main, tourData) => {
  
  const data = [];
  forms.forEach((form) => {
    form.addEventListener('submit', (evn) => {
      evn.preventDefault();
      for (const element of form.elements) {
        element.disabled = true;
      }

      data.push({
        name: form.name.value,
        ticket: form.ticket.value,
      });

      if (forms.length === data.length) {
        forms.forEach(form => form.remove());
        airPlane(main, data, tourData);

      }
    })
  });
};

export default readyPlane;
