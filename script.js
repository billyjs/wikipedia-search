var github = "https://www.github.com/billy-7";
var linkedin = "https://www.linkedin.com/in/billyschulze";

var searchlimit = 7;
var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=' +
    searchlimit + '&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var cb = '&callback=?';
var url = "https://en.wikipedia.org/?curid=";

var result = ['<div class="result"><div class="content"><h2>', '</h2><p>', '</p></div><i id="', '" class="fa fa-arrow-right" aria-hidden="true"></i></div>'];

function search() {
    var searchterm = $("#searchbox").val();
    $.getJSON(api + searchterm + cb, function (data) {
        $(".result").remove();
        if (data.query) {
            var pages = data.query.pages;
            var ids = Object.keys(pages);
            ids.forEach(function (id) {
                $(".container").append(result[0] + pages[id].title + result[1] + pages[id].extract + result[2] + id + result[3]);
            });
            $(".fa-arrow-right").click(function () {
                window.open(url + $(this).attr("id"));
            });
        } else {
            $(".container").append(result[0] + "No Results" + result[1] + "Try searching again..." + result[2] + '" class="fa fa-close" aria-hidden="true"></i></div>');
        }
    }).fail(function () {
        console.log("error");
    });
};

$(function() {
    $(".btn-search").click(search);
    $('#searchbox').on('keydown', function (key) {
        if (key.which == 13) {
            key.preventDefault();
            search();
        }
    });
    $(".btn-random").click(function () {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    });

    $(".github-tab").click(function () {
        window.open(github);
    });

    $(".linkedin-tab").click(function () {
        window.open(linkedin);
    });

    $("#searchbox").focus();
});