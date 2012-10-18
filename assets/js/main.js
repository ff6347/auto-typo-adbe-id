$(window).ready(function(){
    add_h1_fit();
    add_avatar_id();
    init();
    fit();
    indexfit();

});

$(window).resize(function(){

    fit();
    indexfit();
});


function init(){
    $('.carousel').carousel({
        interval: 1500
    });
};

function add_avatar_id(){

    $('img[alt=AVATAR]').attr('id', 'avatar');

    $("img[alt='AVATAR']").addClass("avatar");
}

function add_h1_fit(){

    $("h1").addClass("fit");
}

function fit(){
    $(".fit").fitText(0.5);
}

function indexfit(){
    $("#indexfit").fitText(0.9);
}

