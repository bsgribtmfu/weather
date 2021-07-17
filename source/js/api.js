const countryId = {
  Moscow: 524901,
  Kyiv: 703448,
  London: 2643743,
}

const API_KEY = '72db26d36258d247b9760c3da18759d7';
// const CITY = 'London';
const URL_DATA = `http://api.openweathermap.org/data/2.5/group?id=${countryId.Moscow},${countryId.Kyiv},${countryId.London}&units=metric&appid=${API_KEY}`;
// const URL_DATA = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&q=${CITY}`;
let countries;

// const returnJson = (response) => {
//   return response;
// }

const getData = () => {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', URL_DATA);
  xhr.responseType = 'json';
  xhr.send();

  xhr.onload = function() { // Этот код сработает после того, как мы получим ответ сервера

    if (xhr.status != 200) {
      console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      // console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
      // console.log(dataCountries);
      countries = 'test';

      const dataCountries = xhr.response.list;

      // dataCountries.forEach(dataCountry => {
      //   console.log(dataCountry.name);
      // });
    }
  };

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      console.log(`Получено ${event.loaded} из ${event.total} байт`);
    } else {
      console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    }
  };

  xhr.onerror = function() {
    console.log("Запрос не удался");
  };
}

getData();

console.log(countries);
