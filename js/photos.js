// says when html is loaded, do the folowing:
$( document ).ready(function() {

  if ("geolocation" in navigator) {
    /* geolocation is available */
  } else {
    /* geolocation IS NOT available */
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });


  $("#picDecision").submit(function() {
    var $request = $(this)
    $.ajax ({
      url: "http://localhost:4000/foursquare",
      type: "POST",
      dataType: "json",
      success: function (data) {
        console.log(data);
        // var obj = jQuery.parseJSON( data )
        // console.log($(request)attr.id);

        var element = $("<img />");
        element.attr("src", data.url);
        $("#pics").html(element);
      },
      error: function () {
        console.log("ErrrROAR");
      }

    });

    function blah () {
      console.log("blah");
    }
  })
  //
  // $("menButton").click(function() {
  //   $.ajax ({
  //     url: "http://localhost:4000/foursquare",
  //     type: "POST",
  //     dataType: "html"
  //     success: function () {
  //       console.log()
  //     }
  //   });
  // })

});


// on success
