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
const cardSlider = document.querySelector(".cards_slider ul")

const prevBtn = document.querySelector(".prev_item");
const nextBtn = document.querySelector(".next_item");
let position = 0;
const maxPosition = Math.floor(cardSlider.querySelectorAll("li").length / 2) * 340
const minPosition = Math.floor(cardSlider.querySelectorAll("li").length / 2) * -340

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