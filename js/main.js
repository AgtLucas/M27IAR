$(document).ready(function() {
<<<<<<< HEAD
=======
  fitVidsJs();

  // If browser support pjax...
>>>>>>> master
  if ($.support.pjax) {
    var duration = 400;
    $(document).pjax("a[data-pjax]", ".main-content", {
      fragment: ".main-content",
      duration: duration
    }),
    $(".main-content")
      .bind("pjax:beforeSend", function() {
        $(this).hide()
      })
      .bind("pjax:complete", function() {
        $(this).fadeIn(duration), fitVidsJs()
      });
  }
});

function fitVidsJs() {
  // Fitvids
  $('.post-content').fitVids();
};
