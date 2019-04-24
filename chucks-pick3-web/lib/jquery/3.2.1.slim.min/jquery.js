
/*$("dropdown-menu").on("click", "li a", function() {
    var platform = $(this).text();
    $("#dropDown").html(platform);
    $('#defaultRegisterFormCity').html(platform);
});

$("State").click(function() {
    var platform = $(".dropdown-menu").html();
    var isValid = (platform !== 'State');

    if (!isValid) {
        alert('Please fill in missing details');
    } else {
        alert('Thank you for submitting');
    }
});*/



//TODO: Make dropdown selected values stick when selected  ###DONE
//TODO: Prevent Form from moving when dropdown value is selected ##DONE
//TODO: Make Dropdown selection for all required
//TODO: Link bootstrap validation to jquery for error messages
/*$(function(){
    $(".dropdown-menu a ").click(function(){
        $(this).parents('.dropdown').siblings('.btn').text($(this).text());
        $(this).parents('.dropdown').siblings('.btn').val($(this).text());
        $(this).parents('.dropdown').siblings('.btn').val($(this).text());
        return false;
    });
});*/





$(".dropdown-menu a").click(function(e){

    var selText = $(this).text();
    $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
    e.preventDefault();
    return true;


    //optional store val in hidden input

});





/*$('#dropDownStateButton').click(function() {
    $(this).parents('.dropdown').find('.button  btn-primary dropdown-toggle').dropdown('toggle')
});

$('#dropDownStateButton .dropdown-menu').on({
    "click":function(e) {
        $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        e.stopPropagation();
    }
});*/


/*$('#myDropdown .dropdown-menu').on({
    "click":function(e) {
        e.stopPropagation();
    }
});/*
/*$(".dropdown-menu li a").click(function(){
$(this).parents(".form-row").find('.btn').html($(this).text() + ' <span class="caret"></span>');
$(this).parents(".form-row").find('.btn').val($(this).data('value'));
});*/



/*var clickedButton = $(".dropdown-menu a").length;

if (clickedButton === '') { // if clicked and a value is not selected
    alert('YO empty');
    setErrorMessage(".invalid-feedback." + "Please make a choice",);
}
else if (clickedButton.value) {
    alert("yay."); // if clicked and a value is selected
}


$("input[name='#buttonSubmit']").click(
    function(){
        if($('.dropdown-menu a').text() === ''){
            alert('dropdown validation failed');
            return false;
        }
    });

$('#buttonSubmit').on('click', function() {
    valid = true;

    if (valid && $('.dropdown-menu a').val() === '') {
        alert ("please enter your name");
        valid = false;
    }
    return valid;
});





/*$('#dropdown').on('show.bs.dropdown', function () {
    $('.dropdown-menu').toggleClass('show')

});*/


/*$(function(){
    $(".dropdown-menu a").click(function(){

        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());

    });

});*/


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