const $title = $('#title');
const $reviewBody = $('#review-body');
const $postReviewButton = $('#post-review');

function postReview(reviewObject) {
  $.post('/api/new_review', reviewObject)
    .then((data) => {
      window.location.replace('/mainfeed');
    })
    .catch((err) => {
      console.log(err);
    });
}

function addTitleDB(titleObject, userIdValue) {
  $.post('/api/new_title', titleObject)
    .then((data) => {
      const reviewObject = {
        review_body: $reviewBody.val().trim(),
        rating: parseInt($("input[name='rating']:checked").attr('id')),
        UserId: userIdValue,
        TitleId: data.id,
      };
      postReview(reviewObject);
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkDB(titleObject, userIdValue) {
  $.get(`api/title/${titleObject.imdbID}`)
    .then((data) => {
      if (data.length === 0) {
        addTitleDB(titleObject, userIdValue);
      } else {
        const reviewObject = {
          review_body: $reviewBody.val().trim(),
          rating: parseInt($("input[name='rating']:checked").attr('id')),
          UserId: userIdValue,
          TitleId: data[0].id,
        };
        postReview(reviewObject);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function searchMovie(titleObject, userIdValue) {
  const queryURL = `https://www.omdbapi.com/?i=${titleObject.imdbID}&type=movie&apikey=trilogy`;

  // Evan: api call gets information for each movie
  $.ajax({
    url: queryURL,
    dataType: 'jsonp',
    method: 'GET',
  }).done((response) => {
    console.log(response);
    const newTitleObject = {
      name: response.Title,
      poster: response.Poster,
      year: response.Year,
      imdbID: response.imdbID,
    };
    console.log(newTitleObject);

    checkDB(newTitleObject, userIdValue);
  });
}

function submitReview(event) {
  $.get('/api/user_data').then((data) => {
    const titleObject = {
      name: $title.val().trim(),
      imdbID: $title.attr('data-imdbID'),
    };
    const userIdValue = data.id;
    searchMovie(titleObject, userIdValue);
  });
  console.log($("input[name='rating']:checked").attr('id'));
}

$postReviewButton.on('click', submitReview);
