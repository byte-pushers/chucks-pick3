/*$('#dropdown').on('show.bs.dropdown', function () {
    $('.dropdown-menu').toggleClass('show')

});*/


/*$(function(){
    $(".dropdown-menu a").click(function(){

        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());

    });

});*/

$(function(){
    $(".dropdown-menu a").click(function(){
        $(this).parents('.dropdown-menu').siblings('.btn').text($(this).text());
        $(this).parents('.dropdown-menu').siblings('.btn').val($(this).text());
        $(this).parents('.dropdown-menu').siblings('.btn').val($(this).text());
        $("#button").prop('required', true);
    });
});



/*$(function(){
    $(".dropdown-menu scrollable-menu a").click(function(){

        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());

    });

});*/
/*$('#dropdown').click(function(){

    $('.dropdown-menu scrollable-menu').toggleClass('show');

});*/


/*$('#dropdown').find('.dropDown').find('.dropdown-menu scrollable-menu').on('click', '.dropdown-item', function(){
    $('#dropdown').find('.dropdown-toggle').text($(this)[0].value);
    $('#dropdown').find('.dropdown-toggle').dropdown('show');
})*/