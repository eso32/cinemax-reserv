//this zawsze odnosi się do cinema, w przypadku eventów należy dowiązać this

(function() {
  var cinema = {
    init: function() {
      console.log('Cinema initiated');
      this.order = {};
      this.cacheDom();
      this.getSeatsState();
      this.openOrderPane();
      // setTimeout(function(){ alert("Hello"); }, 3000);
      setTimeout(this.openOrderPane.bind(this), 1000);
    },
    cacheDom: function() {
      console.log('DOM Cached');
      this.places = document.getElementById('places');
      this.$free = $('.free');
      this.$orderPane = $('.orderPane');
    },
    drawAttention: function() {

    },
    isEmpty: function(obj) {
      if (obj == null) return true;
      if (obj.length > 0)    return false;
      if (obj.length === 0)  return true;
      if (typeof obj !== "object") return true;
      for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) return false;
      }
      return true;
    },
    generateSeats: function(data) {
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
      };
      this.$free = $('.free');
      this.bindEvents();
    },
    getSeatsState: function() {
      places.innerHTML = "Wait....";
      $.getJSON("cinema-halls.json", function(response){
        cinema.generateSeats(response);
      });
    },
    clc: function() {
      console.log('Clc triggerd');
      var $exDiv = '<div class="ticket" id="sum'+this.id+'"><div class="inside">Seat no. '+this.id+'<br />'+
      '<select id="select"><option value="normalny">Adult [17$]</option>'+
      '<option value="ulgowy">Child [13$]</option></select></div></div>';
      if (!cinema.order.hasOwnProperty(this.id)){
        console.log('cinema.order = ' + cinema.order);
        cinema.order[this.id] = {booked: true};
        $('.orders').append($exDiv);
        $('#sum'+this.id).bind('click', function(e){e.stopPropagation();});
        $('#sum'+this.id).slideDown('slow');
        $(this).toggleClass(" select");
      } else {
        delete cinema.order[this.id];
        // $('#sum'+this.id).slideUp('slow', function(){$('#sum'+this.id).remove()});
        $('#sum'+this.id).remove();
        $(this).toggleClass(" select");
      };
    },
    bindEvents: function() {
      console.log('Events binded');
      this.$free.on('click', this.clc);
      this.$orderPane.on('click', this.openOrderPane.bind(this));
      $('.confirmation').on('click', this.disMissForm);
      $('#confirm').on('click', this.confirmation.bind(this));
      $('#btnLast').on('click', this.sendData.bind(this));
    },
    openOrderPane: function() {
      if(this.$orderPane.css('left')==='0px'){
        this.$orderPane.css('left', '-300px');
      } else {
        this.$orderPane.css('left', '0px');
      }
    },
    disMissForm: function(){
      $(this).fadeOut('slow');
      $(this).next().fadeOut('slow');
    },
    confirmation: function(){
      if(!this.isEmpty(this.order)){
        $('.confirmation').fadeIn('slow');
        $('.form').fadeIn('slow');
        $.each(this.order, function(i, item){
          $('ul').append('<li>'+i+' is booked: '+item.booked+'</li>');
        })
      } else {
        $('#alertBox').css('top', '0px');
        $('#alertBox').html("You haven't picked any tickets!<br />Select free seats and click green label ORDER on the left hand side.!");
        setTimeout(function(){ $('#alertBox').css('top', '-100px'); }, 3000);
      }
    },
    sendData: function(){
      var $name = $('#name').val(),
          $phone = $('#phone').val(),
          $mail = $('#mail').val();
      if($name === '' || $phone === '' || $mail === ''){
        $('#alertBox').css('top', '0px');
        $('#alertBox').html('Fill out all fields!');
        setTimeout(function(){ $('#alertBox').css('top', '-100px'); }, 3000);
      } else {
        $.each(this.order, function(i, item){
          item.name = $name;
          item.phone = $phone;
          item.mail = $mail;
        });
        console.log(JSON.stringify(this.order));
        $('#successBox').css('top', '0px');
        $('#successBox').html('<i class="fa fa-check-circle-o" aria-hidden="true"></i> You have booked tickets!');
        setTimeout(function(){ $('#successBox').css('top', '-100px'); }, 3000);
      }
    }
  }
  cinema.init();
})();
