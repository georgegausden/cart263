// $(`#main-heading`).on(`click`, function(event){
//   $(this).remove();
// });

// $(`section`).on(`click`, function(event){
//   $(this).append(`<p>This will be added on every click</p>`);
// })
//
// $(`section`).one(`click`, function(event){
//   $(this).append(`<p>This will be added once</p>`);
// })

// $(`#main-heading`).click(function(event){
//   $(this).remove();
// })

$(`.header`).on(`click`, function(event){
  $(this).css(`color`,`red`);
  $(`.header`).off(`click`);
})
