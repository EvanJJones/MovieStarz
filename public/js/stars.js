$(document).ready(() => {
$.get('/api/review').then((data) => {
    console.log(data);
    for(let i=0; i<data.length; i++){
        for(let j=0;j<data[i].rating; j++){
            $(`#stars-${data.length-1-i}`).append('<i class="fas fa-star"></i>');
        }
    }
});
});
