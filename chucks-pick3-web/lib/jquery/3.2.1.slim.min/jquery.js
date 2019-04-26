
$(".dropdown-menu a").click(function(e){

    var selText = $(this).text();
    $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
    e.preventDefault();
    return true;




});

$("#dropDownStateButton").on("click", " a", function() {
    var getStateBtnVal = $(this).text();
    $("#stateDrop").html(getStateBtnVal);
    $('#printState').html(getStateBtnVal);

});

$("#SendRequest").click(function() {
    var getStateBtnVal = $("#stateDrop").html();
    var isValid = (getStateBtnVal !== 'Choose a State');

    if (isValid.value === 'Choose a State') {
        alert('Please fill in missing details');
    } else {
        alert('Thank you for submitting');
    }
});




/*$().ready(function(){
    $('a').click(function(){
        var buttonValue = $(this).text();

        alert(buttonValue);
    });
});


/*document.addEventListener('DOMContentLoaded', function(){
    // your code goes here


}, false);*/
