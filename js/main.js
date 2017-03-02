function toSpan(target, input){
    input.forEach(function(val){
        $(target).append("<span class='" + "zero" + "'>" + val + "</span>");
        $(target).children(".zero").css('opacity','0');
    });
}

function rndLetter(val, class1, class2, target){
        var letters = $(target).children("." + class1);
        if(letters.length > 0){
            var num = Math.floor(Math.random() * letters.length);
            $("." + class1 + ":eq(" + num + ")").addClass(class2).removeClass(class1).animate({
                opacity: val
            }, 100);
            timer = setTimeout(function(){
                rndLetter(val, class1, class2, target);
            }, 1);
        }
        else{
            if(target == "h1"){
                rndLetter(val, class1, class2, "h2");
            }
            else{
                if(val < 1){
                    cont();
                }    
            }
        }
}

function fadeIn(){
    rndLetter(1, "zero", "shown", "h1");
};

function fadeOut(){
    rndLetter(0.01, "shown", "zero", "h1");
};

function cont(){
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data){
        var text = data.quoteText;
        var author = "";
        if(data.quoteAuthor){
            author = data.quoteAuthor;
        }
        else{
            author = "anonymous";
        }
        var textArr = Array.from(text);
        var authorArr = Array.from(author);
        $("h1").text("");
        $("h2").text("");
        toSpan("h1", textArr);
        toSpan("h2", authorArr);
        fadeIn();
    });
};

function tweet(){
    var letters = $("h1").children();
    var line = '"';
    $.each(letters, function(i, l){
        line += $(l).text();
    });
    line = line.trim();
    line += '" - ';
    letters = $("h2").children();
    $.each(letters, function(i, l){
        line += $(l).text();
    });
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(line));
}

$(function(){
    cont();
    $("#more").click(function(){
        fadeOut();
    });
    $("#tweet").click(function(){
        tweet();
    })
});