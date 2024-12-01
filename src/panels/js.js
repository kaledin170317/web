import axios from 'axios';
// const HISTORY_ROOT_URL = "https://dog.ceo/api/breeds/image/random";
// const response = await axios.get(HISTORY_ROOT_URL);
// const data = response.data;
// console.log( data.message)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var t = await fetch("https://random-image-pepebigotes.vercel.app/lists/skeleton-images-list.json")
var json = await t.json();
console.log(json.images[getRandomInt(json.images.length)]);







// const HISTORY_ROOT_URL = "https://randomuser.me/api/";
// const response = await axios.get(HISTORY_ROOT_URL);
// const data = response.data;
// console.log( data.size)

