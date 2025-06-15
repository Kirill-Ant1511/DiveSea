// function makeRequest(url) {
//   return new Promise((fullfill, reject) => {
//     fetch(url)
//     .then(responce => {
//       if (!responce.ok) {
//         throw new Error("Error: " + responce.status);
//       }
//       return  responce.json();
//     })
//     .then(data => {
//       fullfill(data);
//     })
//     .catch(error => {
//       reject(error);
//     })
//   })
// }

// function addCollectionCards(data) {
//   const collectionList = document.querySelector(".collection_list");
//   for (let i = 0; i < data.length; i++) {
//     const card = `
//       <li class="card">
//           <div class="img" style="background-image: url('${data[i].nftImage}');">
//               <p>07h 09m 12s</p>
//           </div>
//           <h1>${data[i].title}</h1>
//           <div class="prices">
//               <div class="prices_info">
//                   <h4>Current bid</h4>
//                   <p><img src="Resource/etherium.png"> ${data[i].price}</p>
//               </div>
//               <button>Place Bid</button>
//           </div>
//       </li>
//     `;
    
//     collectionList.insertAdjacentHTML('beforeend', card);
//   }
// }


// makeRequest("https://6834a37ecd78db2058bee2cc.mockapi.io/collection")
//   .then((data) => {
//     addCollectionCards(data);
//   })
//   .catch((error) => {
//     console.log("ERROR: " + error);
//   })



// MARK: Переделанный код под async/await

async function makeRequest(url) {
  return new Promise((fullfill, reject) => {
    fetch(url)
    .then(responce => {
      if (!responce.ok) {
        throw new Error("Error: " + responce.status);
      }
      return  responce.json();
    })
    .then(data => {
      fullfill(data);
    })
    .catch(error => {
      reject(error);
    })
  })
}

// MARK: INIT CARD
function initCards() {
  const cards = document.querySelectorAll(".card");
  for(let i = 0; i < cards.length; i++) {
    const cardBtn = cards[i].querySelector(".place_bid");
    cardBtn.addEventListener('click', () => {
      window.location.href = cards[i].getAttribute("source")
    });
  }
}

function addCollectionCards(data) {
  const collectionList = document.querySelector(".collection_list");
  for (let i = 0; i < data.length; i++) {
    const card = `
      <li class="card" id="${i}" source="http://127.0.0.1:5500/collection.html?id=${i}">
          <div class="img" style="background-image: url('${data[i].nftImage}');">
              <p>07h 09m 12s</p>
          </div>
          <h1>${data[i].title}</h1>
          <div class="prices">
              <div class="prices_info">
                  <h4>Current bid</h4>
                  <p><img src="Resource/etherium.png"> ${data[i].price}</p>
              </div>
              <button class="place_bid">Place Bid</button>
          </div>
      </li>
    `;
    
    collectionList.insertAdjacentHTML('beforeend', card);
  }
}


async function drawCards() {
  try {
    const data = await makeRequest("https://6834a37ecd78db2058bee2cc.mockapi.io/collection");
    addCollectionCards(data);
    initCards();
  } catch(error) {
    console.log(error);
  }
}

drawCards();

