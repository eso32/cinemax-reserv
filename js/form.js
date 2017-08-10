var form = (function() {

  events.on('confirmClick', confirmation);
  events.on('sendDataClick', sendData);
  $('.confirmation').on('click', disMissForm);

  function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  function confirmation(order){
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
  }

  function sendData(order){
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
  }

  function disMissForm(){
    $(this).fadeOut('slow');
    $(this).next().fadeOut('slow');
  }

})();
