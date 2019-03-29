$('.dropdown-menu li a').on('click', function(){  // create function on click link to drop down class
    $('.dropdown-toggle').html($(this).html());  // toggle selected item
});