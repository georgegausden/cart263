$(`#escape-tunnel`).hide();


$(`#introduction-dialog`).dialog({
  modal: true,
  resizable: false,
  buttons: {
    "Imagination": function(){
      //disable walls
      $(`#prisoner`).draggable(`option`,`containment`,`none`);
      $(this).dialog(`close`);
    },
    "Escape Tunnel": function(){
      $(`#escape-tunnel`).show({
        effect: `blind`
      });
      $(this).dialog(`close`);
    }
  }
});


$(`#prisoner`).effect({
  effect: `shake`,
  duration: 2000,
  times: 10,
  distance: 5,
  complete: makePrisonerDraggable,
});


// setTimeout(function(){
//   $(`#prisoner`).draggable(`disable`)
// },5000);

$(`#escape-tunnel`).droppable({
  drop:function(event,ui){
    ui.draggable.remove()
    $(this).hide({
      effect: `blind`,
      duration: 500,
    });
  }
})

function makePrisonerDraggable(){
  $(`#prisoner`).draggable({
    containment: `#prison`,
    start: function(){
      $(this).addClass(`prisoner-dragging`,750);
      // $(this).css(`text-decoration`,`underline`);
      // $(this).animate({
      //   "color":`#4444ff`
      // }, 750);
    },
    stop: function(){
      $(this).removeClass(`prisoner-dragging`,750);
      // $(this).css(`text-decoration`,`none`);
      // $(this).animate({
      //   "color": `#000000`
      // },750);
    },
  });
}
