//Get User Location
var lat;
var lon;

$( document ).ready(function() {
  navigator.geolocation.getCurrentPosition(geoSuccess);

  $("#pics").on("swipeleft", function() {
    console.log("left");
    nextPhoto("meh")
  });

  $("#pics").on("swiperight", function() {
    console.log("right");
    nextPhoto("nom")
  });

  $(document).on('swipedown', '#pics', function () {
    console.log("down");
    nextPhoto("flag")
  });

  $("#picDecision i").click(function() {
    var $request = $(this)
    console.log($request)
    nextPhoto($request.context.id)
  });
});

var geoSuccess = function(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat);
  // $("#loadingPic").click(function() {
  //   $(this).remove()
  //  });
  getPhoto(3)

}


var nextPhoto = function(reaction) {
    console.log(reaction);

    $.ajax({
      type: "POST",
      // url: "http://54.213.91.66/reaction",
      url: "http://localhost:4000/reaction",
      data: {
        reaction: reaction,
        pic_id: $("img").data("id"),
        lat: lat,
        lon: lon
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: "json",
      success: results()

    });

  }


var getPhoto = function(number) {
  $.ajax({
    type: "GET",
    // url: "http://54.213.91.66/picture",
    url: "http://localhost:4000/picture",
    data: {
      lat: lat,
      lon: lon,
      number: number
    },
    // tell to send cookies
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    success: function(data) {
      // remove element with loading gif
      var obj = data
      console.log(obj)
      $.each(obj, function(key, value) {
        var element = $("<img />");
        element.attr("src", value.url);
        // data() is key, value pair that lets you set distinct values for a single element and retrieve them later
        // id = key
        // value = obj.id
        element.data("id",value.id)
        $("#pics").append(element);

        element.click(function() {
          picInfo(value, element)

        });

      });

    }

  });
}

var picInfo = function(obj, element) {
    $.ajax({
      type: "GET",
      // url: "http://54.213.91.66/info",
      url: "http://localhost:4000/info",
      data: {
        lat: lat,
        lon: lon,
        photo_id: obj.id
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: "json",
      success: function(data) {
        var picInfo = data
        // var infoElement = $("<h2> picInfo.name <h2/>");
        element.hide();
        var results = picInfo.name + " " + picInfo.category + " " + picInfo.address + " " + picInfo.phone_number
        $("#info").html(results);
        $("#info").click(function() {
          // $("#results").hide();
          element.show();
          $("#info").empty();
        });
      }
    });
}


var results = function() {

  console.log("in results")
  $.ajax({
    type: "GET",
    // url: "http://54.213.91.66/results",
    url: "http://localhost:4000/results",
    data: {
      lat: lat,
      lon: lon
    },
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    success: function(data) {
      console.log("in success")
      console.log(data)
      var obj = data
      // if an empty array is returned in the response:
      if(obj.length === 0) {
        $("#pics img:first-child").remove()
        console.log(" in if")
        getPhoto(1)
        console.log("??")
      }
      else {
        console.log("in else")
        $.each(obj, function(key, value) {
          // var results_hash = value
          var results = value.name + " " + value.category + " " + value.address + " " + value.phone_number + " "
          console.log(results);
          $("#picDecision i").remove();
          $("#pics").hide();
          $("#results").append(results);


          // var restart = $("<button> Restart! </button>")
          // restart.attr("class","btn btn-default")
          // $("#restartSession").html(restart)

        });

      }

    }

  });
}
