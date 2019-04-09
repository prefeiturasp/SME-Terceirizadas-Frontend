import $ from 'jquery/dist/jquery';

export const closeToggle = () => $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
  $("body").toggleClass("sidebar-toggled");
  $(".sidebar").toggleClass("toggled");
  if ($(".sidebar").hasClass("toggled")) {
    $('.sidebar .collapse').collapse('hide');
  };
});

// Close any open menu accordions when window is resized below 768px
export const resizeSiderbar = () => $(window).resize(function() {
  if ($(window).width() < 768) {
    $('.sidebar .collapse').collapse('hide');
  };
});


