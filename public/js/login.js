// variables to hold reference to inputs and button
const $passInput = $('#password-input');
const $usernameInput = $('#username-input');
const $loginSubmit = $('#login-submit');
const $signupSubmit = $('#signup-submit');
const $modalTitle = $('#ModalLabel');
const $modalBody = $('#modal-body');
const $modalButton = $('#modal-button');

function login(loginInfo) {
  $.post('/api/login', loginInfo)
    .then(() => {
      // window.location.replace('/mainfeed');

      $modalTitle.text('Succesful login');
      $modalBody.text(`You are now logged in as ${loginInfo.username}`);
      $modalButton.html(
        '<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="location.href=\'/mainfeed\'">mainfeed</button>',
      );
      // If there's an error, log the error
    })
    .catch((err) => {
      $modalTitle.text('Error');
      $modalBody.text('Something went wrong, we could not log you in');
    });
}

function signup(loginInfo) {
  $.post('/api/signup', loginInfo)
    .then(() => {
      $modalTitle.text('Succesful Signup');
      $modalBody.text(`You are now logged in as ${loginInfo.username}`);
      $modalButton.html(
        '<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="location.href=\'/mainfeed\'">mainfeed</button>',
      );
      // If there's an error, log the error
    })
    .catch((err) => {
      console.log(err);
      $modalTitle.text('Error');
      $modalBody.text('Something went wrong, we could not sign you up');
    });
}

// handles the login
const loginSubmit = function (event) {
  event.preventDefault();

  const input = {
    username: $usernameInput.val().trim(),
    password: $passInput.val().trim(),
  };

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

  signup(input);

  // if (!(example.text && example.description)) {
  //   alert('You must enter an example text and description!');
  //   return;
  // }
};

$loginSubmit.on('click', loginSubmit);
$signupSubmit.on('click', signupSubmit);
