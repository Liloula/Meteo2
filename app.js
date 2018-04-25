const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-sunny",
  "snow": "wi wi-day-snow",
  "mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet",
}

function capitatize(str){
  return str[0].toUppercase() + str.slice(1);
}

//pour avoir l'adresse IP qui ouvre la page:
//http://api.ipify.org?format=json
async function main(withIP = true){
  let ville;

  if(withIP){

  const ip = await fetch('http://api.ipify.org?format=json')
  .then(resultat => resultat.json())
  .then(json => json.ip)
  //avoir la ville grace a l'IP:
  //http://freegeoip.net/json/
   ville = await fetch('http://freegeoip.net/json/' + ip)
  .then(resultat => resultat.json())
  .then(json => json.city)
}else{
  ville = document.querySelector('#ville').textContent;
}

  const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=90f0cf3b257712c65a9a9f9616ba4a62&lang=fr&units=metric`)
  .then(resultat => resultat.json())
  .then(json => json)

console.log(meteo);

  displayWeatherInfos(meteo)
}

function displayWeatherInfos(data) {
  const name = data.name;
  const temperature = data.main.temp;
  const conditions = data.weather[0].main;
  const description = data.weather[0].description;

  document.querySelector('#ville').textContent = name;
  document.querySelector('#temperature').textContent = Math.round(temperature);
  document.querySelector('#conditions').textContent = description;
  document.querySelector('i.wi').className = weatherIcons[conditions];

  document.body.className = conditions.toLowerCase();
}

  const ville = document.querySelector('#ville');
  ville.addEventListener('click',() => {
    ville.contentEditable = true;
  });

  ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
  })

main();
