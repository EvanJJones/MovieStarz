const newTitle = $('#title');

$(() => {
  $('#title').autocomplete({
    source(request, response) {
      $.ajax({
        url: 'https://www.omdbapi.com/?type=movie&apikey=trilogy',
        dataType: 'jsonp',
        data: {
          s: request.term,
        },
        success(data) {
          response(
            $.map(data.Search, (item) => ({
              label: `${item.Title} (${item.Year})`,
              value: `${item.Title} (${item.Year})`,
              imdbID: item.imdbID,
            })),
          );
        },
      });
    },
    minLength: 2,
    select(event, ui) {
      newTitle.attr('data-imdbID', ui.item.imdbID);
    },
  });
});
