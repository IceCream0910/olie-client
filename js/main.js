window.onload = function() {
    chart();
}

$(document).on('click', '#song-list', function(e) { //목록 클릭
    var title = this.getAttribute('data-title');
    var artist = this.getAttribute('data-artist');
    YTsearch(title + " " + artist + " mp3");
});


function chart() {
    //차트
    $.ajax({
        type: "GET",
        url: "http://musicapi-env-1.eba-m7pezbyc.us-east-2.elasticbeanstalk.com/chart",
        success: function(result) {

            var parser = JSON.parse(result);
            var title = parser[0].trackName;
            var artist = parser[0].artistName;
            var album = parser[0].album;
            $('#title').html(title);
            $('#artist').html(artist);
            $('.song-card-big').attr("data-title", title);
            $('.song-card-big').attr("data-artist", artist);

            albumart(artist, album);

            for (var i = 1; i < 5; i++) {
                $('.song-text-serve').append('<div id="song-list" data-title="' + parser[i].trackName + '" data-artist="' + parser[i].artistName + '"><h3 id="title-serve">' + parser[i].trackName + '</h3><h5 id="artist-serve">' + parser[i].artistName + '</h5></div>');
            }

        }
    });
}

function albumart(artist, album) {
    $.ajax({
        type: "GET",
        url: "http://musicapi-env-1.eba-m7pezbyc.us-east-2.elasticbeanstalk.com/albumart?artist=" + artist + "&album=" + album,
        success: function(result) {
            var imgUrl = result.replace("\"", "")
            $('#albumart-chart').attr("src", imgUrl);
        }
    });
}


var apiKey = 'AIzaSyABMbN3ftAa8Lwiyi5tzL2cJzwbhgvLv9Y';
var url = 'https://www.googleapis.com/youtube/v3/search';

function YTsearch(searchData) {

    var query = searchData;

    // GET REQUEST

    $.get(
        url, {
            part: 'snippet, id',
            q: query + " mp3",
            type: 'video',
            maxResults: 1,
            key: apiKey
        },
        function(data) {

            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            $.each(data.items, function(index, item) {
                var output = buildOutput(item);
            });
        }
    )
}

function buildOutput(item) {
    var videoId = item.id.videoId;
    window.parent.postMessage(videoId, "*");
}