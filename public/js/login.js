// variables to hold reference to inputs and button
const $passInput = $('#password-input');
const $usernameInput = $('#username-input');
const $loginSubmit = $('#login-submit');
const $signupSubmit = $('#signup-submit');

function login(loginInfo) {
  $.post('/api/login', loginInfo)
    .then(() => {
      window.location.replace('/mainfeed');
      // If there's an error, log the error
    })
    .catch((err) => {
      console.log(err);
    });
}

function signup(loginInfo) {
  $.post('/api/signup', loginInfo)
    .then(() => {
      window.location.replace('/mainfeed');
      // If there's an error, log the error
    })
    .catch((err) => {
      console.log(err);
    });
}

// handles the login
const loginSubmit = function (event) {
  event.preventDefault();

  const input = {
    username: $usernameInput.val().trim(),
    password: $passInput.val().trim(),
  };

  console.log(input);
  login(input);

  // if (!(example.text && example.description)) {
  //   alert('You must enter an example text and description!');
  //   return;
  // }
};

const signupSubmit = function (event) {
  event.preventDefault();

  const input = {
    username: $usernameInput.val().trim(),
    password: $passInput.val().trim(),
  };

  console.log(input);
  signup(input);

  // if (!(example.text && example.description)) {
  //   alert('You must enter an example text and description!');
  //   return;
  // }
};

$loginSubmit.on('click', loginSubmit);
$signupSubmit.on('click', signupSubmit);
