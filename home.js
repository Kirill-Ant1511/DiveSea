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