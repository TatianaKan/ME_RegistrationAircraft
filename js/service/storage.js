export const getStorage = (id) => {
  if (localStorage.getItem(`tour - ${id}`)) {
    return JSON.parse(localStorage.getItem(`tour - ${id}`));
  } else {
    return [];
  }
};

export const setStorage = (id, data) => {
  const storage = getStorage(id);
  const filterBooking = storage.filter(item => { ///filter возвращает все элеиенты массива true
    for (let i = 0; i < data.length; i++) {
      if (data[i].ticket === item) {
        return false;
      }
    }
    return item;
  })

  const newBoocking = [...filterBooking, ...data];

  localStorage.setItem(`tour - ${id}`, JSON.stringify(newBoocking))
};