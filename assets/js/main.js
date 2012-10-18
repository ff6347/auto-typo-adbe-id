function init(){
    $('.carousel').carousel({
        interval: 1500
    });
};

onload=function (){
    init();
    add_avatar_id();
}

function add_avatar_id(){

    $('img[alt=AVATAR]').attr('id', 'avatar');
}