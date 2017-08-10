var reservation = (function() {

    var $places = $('#places');
    var $free = $('.free');
    var $free = "";
    var order = {};

    getSeatsState();
    events.emit('seatsLoad');
    setTimeout(function(){events.emit('seatsLoad')}, 1000);

    function bindEvents() {
      $free.on('click', markReserv);
      $('#confirm').on('click', function(){events.emit('confirmClick', order)});
      $('#btnLast').on('click', function(){events.emit('sendDataClick', order)});
    }

    function getSeatsState() {
      $places.html("Loading data....");
      $.getJSON("cinema-halls.json", function(response){
        generateSeats(response);
      });
    }

    function generateSeats(data) {
      $places.html(""); //skasowanie napisu loading
      for(i=0; i<40; i++){
        if((i)%10==0){
          if(data.hasOwnProperty('p'+i)){
            $places.append('<div class="place booked" id="p'+i+'" style="clear: both;"></div>');
          } else {
            $places.append('<div class="place free" id="p'+i+'" style="clear: both;"></div>');
          }
        } else {
          if(data.hasOwnProperty('p'+i)){
            $places.append('<div class="place booked" id="p'+i+'"></div>');
          } else {
            $places.append('<div class="place free" id="p'+i+'"></div>');
          }
        }
      };
      $free = $('.free');
      bindEvents();
    }

    function markReserv() {
      if (!order.hasOwnProperty(this.id)){

        events.emit('seatReserv', this.id);

        order[this.id] = {booked: true};
        $(this).toggleClass(" select");
      } else {

        events.emit('delReserv', this.id);

        delete order[this.id];
        $(this).toggleClass(" select");
      };
    }

})();
