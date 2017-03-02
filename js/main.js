$(function(){
    var quotes = (function(){
        //cache dom
        var $h1 = $("h1");
        var $h2 = $("h2");
        var quote;
        var fadeEnd = true;

        //bind events
        $("#more").on("click", requestQuotes);
        $("#tweet").on('click', tweet);

        //update the new quotes
        function update(){
            //fade out the text
            fade($h1, "shown", "hide", 0, function(){
                fade($h2, "shown", "hide", 0, function(){
                    //change the text
                    $h1.html(toSpan(quote.quoteText));
                    $h2.html(toSpan(quote.quoteAuthor));

                    //fade in the text
                    fade($h1, "hide", "shown", 1, function(){
                        fade($h2, "hide", "shown", 1, function() {
                        });
                    });
                });
            });
        }

        //tweet the quotes
        function tweet(){
            var line = '"' + quote.quoteText.trim() + '" - ' + quote.quoteAuthor.trim();
            if(line.length > 140){
                line = line.substring(0, 140);
            }
            window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(line)); 
        }

        //obtain quotes
        function requestQuotes(){
            $.ajax({
                jsonp: 'jsonp',
                dataType: 'jsonp',
                type: 'POST',
                data: 'method=getQuote&format=jsonp&lang=en',
                url: 'http://api.forismatic.com/api/1.0/',
                success: function(value){
                    quote = value;
                    update();
                },
                error: function() {
                    console.log("error");
                }
            });
        }

        //convert text to span
        function toSpan(text){
            var line = "";
            text.split('').forEach(function(letter){
                line += "<span class='hide'>" + letter + "</span>";
            });
            return line;
        }

        //fade out fade in
        function fade($target, class1, class2, val, callback){
            var fadeTime = 100;
            var waitTime = 10;
            var letters = $target.find("." + class1);
            var len = letters.length;
            if(len > 0){
                var ranNum = Math.floor(len * Math.random());
                letters.eq(ranNum).addClass(class2).removeClass(class1).animate({opacity: val}, fadeTime);
                setTimeout(function() {
                    fade($target, class1, class2, val, callback);
                }, waitTime);
            }
            else{
                callback();
            }
        }

        requestQuotes();

    })();
  
})
// function toSpan(target, input){
//     input.forEach(function(val){
//         $(target).append("<span class='" + "zero" + "'>" + val + "</span>");
//         $(target).children(".zero").css('opacity','0');
//     });
// }

// function rndLetter(val, class1, class2, target){
//         var letters = $(target).children("." + class1);
//         if(letters.length > 0){
//             var num = Math.floor(Math.random() * letters.length);
//             $("." + class1 + ":eq(" + num + ")").addClass(class2).removeClass(class1).animate({
//                 opacity: val
//             }, 100);
//             timer = setTimeout(function(){
//                 rndLetter(val, class1, class2, target);
//             }, 1);
//         }
//         else{
//             if(target == "h1"){
//                 rndLetter(val, class1, class2, "h2");
//             }
//             else{
//                 if(val < 1){
//                     cont();
//                 }    
//             }
//         }
// }

// function fadeIn(){
//     rndLetter(1, "zero", "shown", "h1");
// };

// function fadeOut(){
//     rndLetter(0.01, "shown", "zero", "h1");
// };

// function cont(){
//     $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data){
//         var text = data.quoteText;
//         var author = "";
//         if(data.quoteAuthor){
//             author = data.quoteAuthor;
//         }
//         else{
//             author = "anonymous";
//         }
//         var textArr = Array.from(text);
//         var authorArr = Array.from(author);
//         $("h1").text("");
//         $("h2").text("");
//         toSpan("h1", textArr);
//         toSpan("h2", authorArr);
//         fadeIn();
//     });
// };

// function tweet(){
//     var letters = $("h1").children();
//     var line = '"';
//     $.each(letters, function(i, l){
//         line += $(l).text();
//     });
//     line = line.trim();
//     line += '" - ';
//     letters = $("h2").children();
//     $.each(letters, function(i, l){
//         line += $(l).text();
//     });
//     window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(line));
// }

// $(function(){
//     cont();
//     $("#more").click(function(){
//         fadeOut();
//     });
//     $("#tweet").click(function(){
//         tweet();
//     })
// });