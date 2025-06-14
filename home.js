"use strict"

const asks = document.querySelectorAll(".ask")

for(let i = 0; i < asks.length; i++) {
  const askButton = asks[i].querySelector("button")
  const text = asks[i].querySelector("p");
  askButton.addEventListener('click', () => {
    if(text.classList.contains("visible")) {
      text.classList.remove("visible");
    } else {
      text.classList.add("visible");
    }
  })
}

// MARK: SLIDER
function SliderInit() {
  const cardSlider = document.querySelector(".cards_slider ul")

  const prevBtn = document.querySelector(".prev_item");
  const nextBtn = document.querySelector(".next_item");
  let position = 0;
  const maxPosition = Math.floor(cardSlider.querySelectorAll("li").length / 2) * 340
  const minPosition = Math.floor(cardSlider.querySelectorAll("li").length / 2) * -340

  console.log(cardSlider.querySelectorAll("li").length)

  prevBtn.addEventListener('click', function() {
    if(position >= maxPosition) {
      position = minPosition;
    } else {
      position = position + 340;
    }

    cardSlider.style.left = position + "px";
  })

  nextBtn.addEventListener('click', function() {
    if(position <= minPosition) {
      position = maxPosition;
    } else {
      position = position - 340;
    }

    cardSlider.style.left = position + "px";
  })

}






// MARK: WeeklyTop

function getTopWeek() {
  return new Promise((resolve, reject) => {
   fetch("https://6834a37ecd78db2058bee2cc.mockapi.io/weekly_top")
  .then(responce => {
    if (!responce.ok) {
      throw new Error("Error from  get data: " + responce.status)
    }
    resolve("success");
    return responce.json();
  })
  .then((data) => {
    const weeklyTop = document.querySelector(".cards_slider ul")
    for (let i = 0; i < data.length; i++) {
      const htmlCard = `
        <li class="card">
            <div class="img" style="background-image: url('${data[i].avatar}');">
                <p>07h 09m 12s</p>
            </div>
            <h1>${data[i].name}</h1>
            <div class="prices">
                <div class="prices_info">
                    <h4>Current bid</h4>
                    <p><img src="Resource/etherium.png"> ${data[i].price}</p>
                </div>
                <button>Place Bid</button>
            </div>
        </li>
      `

      weeklyTop.insertAdjacentHTML('beforeend', htmlCard)
    }

    SliderInit();
  })
  .catch(error => {
    console.log("Error: " + error)
  })
  })
}


getTopWeek();


// MARK: Collections

const marketplaceCards = document.querySelector(".exp_market .products_cards ul")

function getMarketCollection() {
  return new Promise((resolve, reject) => {
    fetch("https://6834a37ecd78db2058bee2cc.mockapi.io/collection")
    .then(responce => {
      if(!responce.ok) {
        throw new Error("Error: " + responce.status)
      }
      resolve("success");
      return responce.json()
    })
    .then((data) => {
      for (let i = 0; i < 8; i++) {
        const card = `
          <li class="card">
              <div class="img" style="background-image: url('${data[i].nftImage}');">
                  <p>07h 09m 12s</p>
              </div>
              <h1>${data[i].title}</h1>
              <div class="prices">
                  <div class="prices_info">
                      <h4>Current bid</h4>
                      <p><img src="Resource/etherium.png"> ${data[i].price}</p>
                  </div>
                  <button>Place Bid</button>
              </div>
          </li>
        `
        console.log(data[i]);
        
        marketplaceCards.insertAdjacentHTML('beforeend', card)
      }
    })
    .catch(error => {
      console.log("ERROR: " + error)
    })
  })
  
}

getMarketCollection();