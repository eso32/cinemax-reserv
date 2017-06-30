var data,
    places = document.getElementById('places'),
    order = {};

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

//Get the JSON file from the server
$(function (){
  places.innerHTML = "Wait....";
  $.getJSON("cinema-halls.json", function(response){
    data = response
    generPlaces(data);
    clc();
  });
});

//Generate seats
function generPlaces(data){
  places.innerHTML = "";
  for(i=0; i<40; i++){
    if((i)%10==0){
      if(data.hasOwnProperty('p'+i)){
        places.innerHTML = places.innerHTML + '<div class="place booked" id="p'+i+'" style="clear: both;"></div>';
      } else {
        places.innerHTML = places.innerHTML + '<div class="place free" id="p'+i+'" style="clear: both;"></div>';
      }
    } else {
      if(data.hasOwnProperty('p'+i)){
        places.innerHTML = places.innerHTML + '<div class="place booked" id="p'+i+'"></div>';
      } else {
        places.innerHTML = places.innerHTML + '<div class="place free" id="p'+i+'"></div>';
      }
    }
  }
}

//Booking system
function clc(){
  var $free = $('.free');
  $free.click(function(){
    if(isEmpty(order)){
      $('.orderPane').css('left', '0px');
      setTimeout(function(){ $('.orderPane').css('left', '-300px'); }, 1000);
    }
    var $exDiv = '<div class="ticket" id="sum'+this.id+'"><div class="inside">Seat no. '+this.id+'<br />'+
    '<select id="select"><option value="normalny">Adult [17$]</option>'+
    '<option value="ulgowy">Child [13$]</option></select></div></div>';
    if (!order.hasOwnProperty(this.id)){
      order[this.id] = {booked: true};
      $('.orders').append($exDiv);
      $('#sum'+this.id).bind('click', function(e){e.stopPropagation();});
      $('#sum'+this.id).slideDown('slow');
      $(this).toggleClass(" select");
    } else {
      delete order[this.id];
      // $('#sum'+this.id).slideUp('slow', function(){$('#sum'+this.id).remove()});
      $('#sum'+this.id).remove();
      $(this).toggleClass(" select");
    };
  });
};

$('#confirm').click(function(){
  if(!isEmpty(order)){
    $('.confirmation').fadeIn('slow');
    $('.form').fadeIn('slow');
    $.each(order, function(i, item){
      $('ul').append('<li>'+i+' is booked: '+item.booked+'</li>');
    })
  } else {
    $('#alertBox').css('top', '0px');
    $('#alertBox').html("You haven't picked any tickets!<br />Select free seats and click green label ORDER on the left hand side.!");
    setTimeout(function(){ $('#alertBox').css('top', '-100px'); }, 3000);

  }
});

//Dismiss order form by clicking on darkish screen
$('.confirmation').click(function(){
  $(this).fadeOut('slow');
  $(this).next().fadeOut('slow');
})

//Save data on the server
$('#btnLast').click(function(){
  var $name = $('#name').val(),
      $phone = $('#phone').val(),
      $mail = $('#mail').val();
  if($name === '' || $phone === '' || $mail === ''){
    $('#alertBox').css('top', '0px');
    $('#alertBox').html('Fill out all fields!');
    setTimeout(function(){ $('#alertBox').css('top', '-100px'); }, 3000);
  } else {
    $.each(order, function(i, item){
      item.name = $name;
      item.phone = $phone;
      item.mail = $mail;
    });
    console.log(JSON.stringify(order));
    $('#successBox').css('top', '0px');
    $('#successBox').html('<i class="fa fa-check-circle-o" aria-hidden="true"></i> You have booked tickets!');
    setTimeout(function(){ $('#successBox').css('top', '-100px'); }, 3000);
  }

});

//Sidepanel animation
$('.orderPane').click(function(){
  if($(this).css('left')==='0px'){
    $(this).css('left', '-300px');
  } else {
    $(this).css('left', '0px');
  }
})
