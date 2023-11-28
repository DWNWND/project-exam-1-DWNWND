import { generalErrorMessage } from "./error-handling.js";

// Name validation
const nameInput = document.querySelector("#name");
const nameError = document.querySelector(".validation-message-name");
let nameValidity;

function showNameError() {
  if (nameInput.value === "" || nameInput.value.length < 5) {
    nameInput.className = "invalid";
    nameError.className = "invalid-validation";
    nameValidity = false;
  }
  if (nameInput.value === "") {
    nameError.textContent = "You need to enter a name.";
  }
  if (nameInput.value.length < 5) {
    nameError.textContent = `The name should be at least 5 characters; you entered ${nameInput.value.length}.`;
  } else {
    nameError.textContent = "";
    nameInput.className = "valid";
    nameValidity = true;
  }
}
nameInput.addEventListener("input", () => {
  try {
    showNameError();
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
});

// Email validation
const email = document.querySelector("#email");
const emailError = document.querySelector(".validation-message-email");
let emailValidity;

function checkIfEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const result = regEx.test(email);
  return result;
}

function showEmailError(checkedEmail) {
  if (email.value === "" || !checkedEmail) {
    email.className = "invalid";
    emailError.className = "invalid-message";
    emailValidity = false;
  }
  if (email.value === "") {
    emailError.textContent = "You need to enter an email address.";
  }
  if (!checkedEmail) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (checkedEmail) {
    emailError.textContent = "";
    email.className = "valid";
    emailValidity = true;
  }
}
email.addEventListener("input", () => {
  try {
    const checkedEmail = checkIfEmail(email.value);
    showEmailError(checkedEmail);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
});

// Subject validation
const subject = document.querySelector("#subject");
const subjectError = document.querySelector(".validation-message-subject");
let subjectValidity;

function showSubjectError() {
  if (subject.value === "" || subject.value.length < 15) {
    subject.className = "invalid";
    subjectError.className = "invalid-message";
    subjectValidity = false;
  }
  if (subject.value === "") {
    subjectError.textContent = "You need to enter an subject.";
  }
  if (subject.value.length < 15) {
    subjectError.textContent = `The subject should be at least 15 characters; you entered ${subject.value.length}.`;
  } else {
    subjectError.textContent = "";
    subject.className = "valid";
    subjectValidity = true;
  }
}
subject.addEventListener("input", () => {
  try {
    showSubjectError();
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
});

// Message validation
const message = document.querySelector("#message");
const messageError = document.querySelector(".validation-message-message");
let messageValidity;

function showMessageError() {
  if (message.value === "" || message.value.length < 25) {
    message.className = "invalid";
    messageError.className = "invalid-message";
    messageValidity = false;
  }
  if (message.value === "") {
    messageError.textContent = "You need to enter a message.";
  }
  if (message.value.length < 25) {
    messageError.textContent = `The subject should be at least 25 characters; you entered ${message.value.length}.`;
  } else {
    messageError.textContent = "";
    message.className = "valid";
    messageValidity = true;
  }
}

message.addEventListener("input", () => {
  try {
    showMessageError();
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
});

const checkbox = document.querySelector("#checkbox");
const checkboxLabel = document.querySelector(".checkbox-label");

checkbox.addEventListener("click", () => {
  checkboxLabel.classList.toggle("checked");
  if (checkbox.checked) {
    checkboxLabel.textContent = "You have accept whatever to be able to send your message";
  }
  if (!checkbox.checked) {
    checkboxLabel.textContent = "Accept whatever to be able to send your message";
  }
});

//show error message when submitting form -
//fix the send button so that it actually submits

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const checkedEmail = checkIfEmail(email.value);
  showNameError();
  showEmailError(checkedEmail);
  showSubjectError();
  showMessageError();

  if (nameValidity && messageValidity && subjectValidity && emailValidity && checkbox.checked) {
    console.log("ok");
    alert("Thank you for your message. We will answer you as soon as we can.");
    // form.submit();
    form.reset();
  }
});
