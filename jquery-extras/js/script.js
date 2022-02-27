// $(`.header`).addClass(`highlight`);
//
// $(`.header`).on(`click`,function(event){
//   $(this).removeClass(`highlight`);
// })

// setInterval(function(){
//   $(`.header`).toggleClass(`highlight`);
// },500);

// $(`#button`).on(`click`,function(event){
//   $(`#main-heading`).hide();
//   setTimeout(function(){
//     $(`.header`).show()
//   },2000);
// });

// $(`#button`).on(`click`,function(event){
//   $(`.header`).toggle();
// });

// $(`#button`).on(`click`,function(event){
//   $(`.header`).fadeOut(2000, function(){
//     $(this).fadeIn(2000);
//   });
// });

// $(`#button`).on(`click`,function(event){
//   $(`.header`).fadeToggle(2000);
// });

// $(`#button`).on(`click`,function(event){
//   $(`.header`).slideToggle();
// });

// $(`#button`).on(`click`,function(event){
//   $(`.header`).animate({
//     "opacity": 0.5,
//     "font-size": "3rem",
//   }, 2000, function(){
//     $(this).text("ANIMATED!");
//   });
// });

//
// $(`#button`).on(`click`,function(event){
//   $(`.header`).animate({
//     "opacity": 0.5,
//     "height": "200px",
//   }, {
//     duration: 10000,
//     complete: function(){
//       $(this).text(`ANIMATED!`);
//     },
//     easing: `linear`
//   });
// });

// $(`.header`).each(function(){
//   let reverseText = $(this).text().split(``).reverse().join(``);
//   $(this).text(reverseText);
// })
