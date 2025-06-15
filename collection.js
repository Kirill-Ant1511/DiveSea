const main = document.querySelector("main");
const id = new URLSearchParams(window.location.search).get("id");

async function makeRequest(url) {
  return new Promise((fullfill, reject) => {
    fetch(url)
    .then(responce => {
      if(!responce.ok) {
        throw new Error("Status: " + responce.status)
      }

      return responce.json();
    })
    .then(data => {
      fullfill(data);
    })
    .catch(error => {
      reject(error);
    })
  })
}


const data = await makeRequest(`https://6834a37ecd78db2058bee2cc.mockapi.io/collection/${Number(id) + 1}`);
const card = `
  <div class="collection_info">
    <div class="collection_info_back">
      <button class="back_btn"><img src="Resource/Shape.png"></button>
      <h1>Product Detail</h1>
    </div>

    <div class="collection_card">
      <img class="collection_img" src="${data.nftImage}">
      <div class="collection_detail">
        <h1>Project ${data.title}</h1>
        <p class="collection_discription">A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits.</p>
        <div class="user_info">
          <div class="creator">
            <img src="${data.avatarCreator}">
            <div class="creator_info">
              <p>Created by</p>
              <h3>${data.byCreated}</h3>
            </div>
          </div>

          <div class="owner">
            <img src="${data.avatarOwner}">
            <div class="owner_info">
              <p>Owned by</p>
              <h3>${data.byOwner}</h3>
            </div>
          </div>
        </div>

        <div class="collection_price_end_in">
          <div class="price">
            <p>Current bid</p>
            <h3><img src="Resource/etherium.png"> ${data.price}</h1>
          </div>

          <div class="end_in">
            <p>End In</p>
            <h4>${data.endIn}</h4>
          </div>
        </div>

        <button><img src="Resource/Wallet.png"> Place Bid</button>
      </div>
    </div>
  </div>
`;
main.insertAdjacentHTML('beforeend', card);


document.querySelector(".back_btn").addEventListener('click', () => {
  window.history.back()
})

