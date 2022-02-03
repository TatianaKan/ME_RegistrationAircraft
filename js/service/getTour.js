const URL_API = 'https://61f4662310f0f7001768c90f.mockapi.io/api/airplane';

///fetch обещание дать ответ
const getData = () => fetch(URL_API) 
.then((response)=> {
if (response.ok ) {
 return response.json();
} 
throw new Error(response.status);/// оператор исключения, вызовет сброс
})
.catch((err)=> {
console.log(console.error(err));
})


export default getData;