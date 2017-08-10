var booking = (function() {
  var $orderPane = $('.orderPane');

  events.on('seatsLoad', openOrderPane);
  events.on('seatReserv', markReservHandler);
  events.on('delReserv', delReservHandler);

  $orderPane.on('click', openOrderPane.bind(this));
  function openOrderPane() {
    if($orderPane.css('left')==='0px'){
      $orderPane.css('left', '-300px');
    } else {
      $orderPane.css('left', '0px');
    }
  }

  function markReservHandler(id) {
    var $exDiv = '<div class="ticket" id="sum'+id+'"><div class="inside">Seat no. '+id+'<br />'+
    '<select id="select"><option value="normalny">Adult [17$]</option>'+
    '<option value="ulgowy">Child [13$]</option></select></div></div>';
    $('.orders').append($exDiv);
    $('#sum'+id).bind('click', function(e){e.stopPropagation();});
    $('#sum'+id).slideDown('slow');
  }
  function delReservHandler(id) {
    $('#sum'+id).remove();
  }

})();
