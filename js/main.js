var text = "abcde";
var textArr = Array.from(text);
function toSpan(target, input){
    var i = 0;
    input.forEach(function(val){
        $(target).append("<span class='" + "hidden" + "'>" + val + "</span>");
        $(".hidden").css('opacity','0');
        i++;
    });
}

function rndLetter(){
        var letters = $("h1").children(".hidden");
        if(letters.length > 0){
            var num = Math.floor(Math.random() * letters.length);
            $(".hidden:eq(" + num + ")").removeClass("hidden").animate({
                opacity: 1
            },"fast", function(){

            });
            setTimeout(rndLetter, 100);
        }
}

$(function(){
    $("button").click(function(){
        $("h1").children().animate({
            opacity: 0
        }, "fast", function(){
            text = $("input").val();
            textArr = Array.from(text);
            $("h1").text("");
            toSpan("h1", textArr);
            setTimeout(rndLetter, 100);
        });
    });
});