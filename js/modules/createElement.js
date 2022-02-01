const createElement = (tag, attribute) => {
  const element = document.createElement(tag);
  Object.assign(element, attribute);//метод соединяет объекты

  return element;
};

export default createElement;