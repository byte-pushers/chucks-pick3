

$(".dropdown-menu a").click(function(e){

    var selText = $(this).text();
    $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
    e.preventDefault();
    return true;


});



$("#dropdownMenu2").on("click", "li a", function() {
    var platform = $(this).text();
    $("#dropdown_title2").html(platform);

});

$("#SendRequest").click(function() {
    var platform = $("#dropdown_title2").html();
    var isValid = (platform !== 'Select');

    if (!isValid) {
        alert('Please fill in missing details');
    } else {
        alert('Thank you for submitting');
    }
});



$("#dropDownState").on("click", "li a", function() {
    var forState = $(this).text();
    $("#dropdown_title1").html(forState);

});

$("input[name=submitDropDown]").click(function() {
    var forState = $("#dropdown_title1").html();
    var isValid = (forState !== 'Choose a State');

    if (!isValid) {
        alert('Please fill in missing details');
    } else {
        alert('Thank you for submitting');
    }
});

$("#dropDownTypePhone").on("click", "li a", function() {
    var forType = $(this).text();
    $("#dropdown_title2").html(forType);

});

$("#SendRequestForPhoneBtn").click(function() {
    var forType = $("#dropdown_title2").html();
    var isValid = (forType !== 'Type of Phone' );

    if (!isValid) {
        alert('Please fill in missing details');
    } else {
        alert('Thank you for submitting');
    }
});

$("#dropDownHowOften").on("click", "li a", function() {
    var forHowOften = $(this).text();
    $("#dropdown_title3").html(forHowOften);

});

$(".btnSubmit").click(function() {
    var forHowOften = $("#dropdown_title3").html();
    var isValid = (forHowOften !== 'How Often Do You Play?');

    if (!isValid) {
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
