
var text = "abcde";
var textArr = Array.from(text);
function toSpan(target, input){
    var x = 0;
    input.forEach(function(val){
        $(target).append("<span id='letter-" + x + "'>" + val + "</span>");
        x++;
    });
}

function rndText(len) {
    var arr = [];
    var rndArr = [];
    for(var i = 0; i < len.length; i++){
        arr.push(i);
    }
    for(var i = 0; i < len.length; i++){
        var rn = Math.floor(Math.random() * arr.length);
        var num = "#letter-" + arr.splice(rn, 1);
        $(num).fadeTo("slow", 1);
    }
}

$(function(){
    $("button").click(function(){
        $("h1").text("");
        toSpan("h1", textArr);
        $("h1").fadeTo(1, 0);
        rndText(textArr);
    });
});