let errorMessage;

//error-handling: fetching API
export function apiErrorMessage(err) {
  errorMessage = `
  <div class="error-message">
    <span>Our apologies, we have encoutered an issue with our database.</span>
    <span>Please refresh your site and give us a few minutes to figure this one out.</span>
  </div>
  <span>If the error continues please reach out to our customer service and present the following information:</span>
  <span><b>Error name:</b> ${err.name}</span>
  <span><b>Error message:</b> ${err.message}</span>`;

  //adding the error-message to the main
  const main = document.querySelector("main");
  main.innerHTML = `
  <section class="error-section">
    <div class="error-message-wrapper">${errorMessage}</div>
  </section>`;
}

//error-handling: general error-message
export function generalErrorMessage(err) {
  errorMessage = `
  <div class="error-message">
    <span>Our apologies, we have encoutered an issue.</span>
    <span>Please refresh your site and give us a few minutes to figure this one out.</span>
  </div>
  <span>If the error continues please reach out to our customer service and present the following information:</span>
  <span><b>Error name:</b> ${err.name}</span>
  <span><b>Error message:</b> ${err.message}</span>`;

  //adding the error-message to the main
  const main = document.querySelector("main");
  main.innerHTML = `
  <section class="error-section">
    <div class="error-message-wrapper">${errorMessage}</div>
  </section>`;
}
