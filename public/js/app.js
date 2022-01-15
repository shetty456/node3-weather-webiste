fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.querySelector("form");
  const search = document.querySelector("input");
  const messageOne = document.querySelector("#message-1");
  const messageTwo = document.querySelector("#message-2");

  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);

    //set value to loading as soon as submit button is clicked
    messageOne.textContent = "Loading...";
    messageTwo.textContent = ""

    // fetching the data from a weather api
    fetch(`/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
          }
        });
      }
    );
    search.value = "";
  });
});
