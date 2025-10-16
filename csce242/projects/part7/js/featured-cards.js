// --- Featured Cards ---
const cards = ["random-pic", "random-pic-2", "random-pic-3", "random-pic-4", "random-pic-5", "random-pic-6"];

// same use as other js files: https://www.w3schools.com/js/js_api_fetch.asp
fetch("json/oracle-cards.json")
  .then(resp => resp.json())
  .then(data => {
    cards.forEach(cardId => {
      let card;
      do {
        const randomIndex = Math.floor(Math.random() * data.length);
        card = data[randomIndex];
      } while (!card.image_uris || !card.image_uris.normal);

      document.getElementById(cardId).style.backgroundImage =
        `url('${card.image_uris.normal}')`;
    });
  })
  .catch(err => console.error(err));
