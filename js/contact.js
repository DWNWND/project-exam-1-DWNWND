import { generalErrorMessage } from "./error-handling.js";

//show error message when submitting form - does not work yet(fix the send button so that it actually submits)
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  try {
    if (!subject.validity.valid) {
      showSubjectError();
      event.preventDefault();
    }
    if (!email.validity.valid) {
      showEmailError();
      event.preventDefault();
    }
    if (!message.validity.valid) {
      showMessageError();
      event.preventDefault();
    }
    if (!nameInput.validity.valid) {
      showNameError();
      event.preventDefault();
    }
  } catch (error) {
    generalErrorMessage(error);
  }
});

// Name validation
const nameInput = document.querySelector("#name");
const nameError = document.querySelector(".validation-message-name");

nameInput.addEventListener("input", (event) => {
  try {
    if (nameInput.validity.valid) {
      nameError.textContent = "";
      nameError.className = "error";
    } else {
      showNameError();
    }
  } catch (error) {
    generalErrorMessage(error);
  }
});

// Email validation
const email = document.querySelector("#email");
const emailError = document.querySelector(".validation-message-email");

email.addEventListener("input", (event) => {
  try {
    if (email.validity.valid) {
      emailError.textContent = "";
      emailError.className = "error";
    } else {
      showEmailError();
    }
  } catch (error) {
    generalErrorMessage(error);
  }
});

// Subject validation
const subject = document.querySelector("#subject");
const subjectError = document.querySelector(".validation-message-subject");

subject.addEventListener("input", (event) => {
  try {
    if (subject.validity.valid) {
      subjectError.textContent = "";
      subjectError.className = "error";
    } else {
      showSubjectError();
    }
  } catch (error) {
    generalErrorMessage(error);
  }
});

// Message validation
const message = document.querySelector("#message");
const messageError = document.querySelector(".validation-message-message");

message.addEventListener("input", (event) => {
  try {
    if (message.validity.valid) {
      messageError.textContent = "";
      messageError.className = "error";
    } else {
      showMessageError();
    }
  } catch (error) {
    generalErrorMessage(error);
  }
});

// error-messages
function showSubjectError() {
  try {
    if (subject.validity.valueMissing) {
      subjectError.textContent = "You need to enter an subject.";
    } else if (subject.validity.typeMismatch) {
      subjectError.textContent = "Entered value needs to be a subject.";
    } else if (subject.validity.tooShort) {
      subjectError.textContent = `The subject should be at least ${subject.minLength} characters; you entered ${subject.value.length}.`;
    }
    subjectError.className = "error active";
  } catch (error) {
    generalErrorMessage(error);
  }
}
function showEmailError() {
  try {
    if (email.validity.valueMissing) {
      emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
      emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
    emailError.className = "error active";
  } catch (error) {
    generalErrorMessage(error);
  }
}
function showMessageError() {
  try {
    if (message.validity.valueMissing) {
      messageError.textContent = "You need to enter a message.";
    } else if (message.validity.typeMismatch) {
      messageError.textContent = "Entered value needs to be a message.";
    } else if (message.validity.tooShort) {
      messageError.textContent = `The message should be at least ${message.minLength} characters; you entered ${message.value.length}.`;
    }
    messageError.className = "error active";
  } catch (error) {
    generalErrorMessage(error);
  }
}
function showNameError() {
  try {
    if (nameInput.validity.valueMissing) {
      nameError.textContent = "You need to enter a name.";
    } else if (nameInput.validity.typeMismatch) {
      nameError.textContent = "Entered value needs to be a name.";
    } else if (nameInput.validity.tooShort) {
      nameError.textContent = `The name should be at least ${nameInput.minLength} characters; you entered ${nameInput.value.length}.`;
    }
    nameError.className = "error active";
  } catch (error) {
    generalErrorMessage(error);
  }
}
