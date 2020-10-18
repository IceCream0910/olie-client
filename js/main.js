    window.onload = function() {
        chart();


    }

    function chart() {
        //차트
        $.ajax({
            type: "GET",
            url: "https://olie-api.herokuapp.com/chart",
            success: function(result) {

                var parser = JSON.parse(result);
                var title = parser[0].trackName
                var artist = parser[0].artistName;
                var album = parser[0].album;
                $('#title').html(title);
                $('#artist').html(artist);
                albumart(artist, album);

                for (var i = 1; i < 5; i++) {
                    $('.song-text-serve').append('<h3 id="title-serve">' + parser[i].trackName + '</h3><h5 id="artist-serve">' + parser[i].artistName + '</h5>');
                }

            }
        });
    }

    function albumart(artist, album) {
        $.ajax({
            type: "GET",
            url: "https://olie-api.herokuapp.com/albumart?artist=" + artist + "&album=" + album,
            success: function(result) {
                var imgUrl = result.replace("\"", "")
                $('#albumart-chart').attr("src", imgUrl);
            }
        });
    }

    function callbackToParent() {
        window.parent.postMessage('https://www.youtube.com/embed/OTHXbK7cZKo', "*");
    }