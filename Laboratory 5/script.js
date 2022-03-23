$(document).ready(function(){
    var picWidth = 200;
    var poz = 0;
    $("#myslider li").each(function() {
        poz += picWidth;
        $(this).css("left",poz);
    });

    function slide() {
        $("li").animate({"left":"+=10px"}, 100, again);
    }

    function again() {
        var left = $(this).parent().offset().left + $(this).offset().left;
        //console.log("left="+left);
        if (left >= 1200) {
            $(this).css("left",left - 1200);
        }
        slide();
    }

    $('body').on('click',"#myslider li",function(sasha){
        $("li").stop(true)
        console.log(sasha.target.src)
        $("#bigimage").css({"display" : "block", "z-index": 3, "position" : "absolute"});
        $("#bigimage>img").attr("src", sasha.target.src);
        //$("#bigimage").prepend("<img src=sasha.target.src  alt='sasha'>");
        //$('#bigimage').css('background-image', 'url(' + sasha.target.src + ')');

    })

    $('body').on('click',"#bigimage",function(){
            console.log("hey")
            $("#bigimage").css({display: "none", "z-index" : 1});
        slide();
    })

    slide();

});
