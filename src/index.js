import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from "slim-select";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const pError = document.querySelector(".error")
const loader = document.querySelector(".loader");



fetchBreeds()
  .then(breeds => {
   
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);

    });
    new SlimSelect({
      select: '#breed-select'
    });
    
  })
  .catch(error => {
    offLoader();
    onError();
  });
offError();
  onDisplayInfo();
  offLoader();
  

breedSelect.addEventListener("change", () => { 

  const selectedBreedId = breedSelect.value;
 
 offDisplayInfo();
  onLoader();
  breedSelect.style.display = "flex";

  if (selectedBreedId && selectedBreedId != "") {

    fetchCatByBreed(selectedBreedId)
      .then(response => { 
         
        const catData = response.data[0];
        console.log(catData);

    const markup = `
      <h2>${catData.breeds[0].name}</h2>
      <p>DESCRIPTION: ${catData.breeds[0].description}</p>
      <img src="${catData.url}" alt="${catData.breeds[0].name}" />
`;
        
    catInfoDiv.innerHTML = "";   
    catInfoDiv.innerHTML += markup;  
      offLoader();
      onDisplayInfo();      
      })
      .catch(error => { 
       offLoader();
      onError();
      })
    
   }
})




function onError() {
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 4000,
        width: '300px',
        fontSize: '24px'
    });
};

function onLoader() {
  loader.style.display = 'block';
}
function offLoader() {
  loader.style.display = 'none';
}
function onDisplayInfo() {
  catInfoDiv.style.display = 'block';
}
function offDisplayInfo() {
  catInfoDiv.style.display = 'none';
}
function offError() {
  pError.style.display = 'none';
}