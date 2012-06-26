Reveal.initialize({
  // Display controls in the bottom right corner
  controls: false,

  // Display a presentation progress bar
  progress: true,

  // If true; each slide will be pushed to the browser history
  history: true,

  // Loops the presentation, defaults to false
  loop: false,

  // Flags if mouse wheel navigation should be enabled
  mouseWheel: true,

  // Apply a 3D roll to links on hover
  rollingLinks: true,

  // UI style
  theme: 'default', // default/neon

  // Transition style
  transition: 'linear' // default/cube/page/concave/linear(2d)
});

/*
 * Client slideshow
 */

var images = [
  'img/web-client.png',
  'img/iphone.png',
  'img/blackberry.png'
];

// preload images

$.each(images, function(index, image) {
  $('<img/>')[0].src = image;
});

$('#client').click(function() {
  var current = $(this).attr('src');
  var index = images.indexOf(current);
  if(!images[index + 1]) index = -1;
  var next = images[index + 1];
  $(this).fadeOut(150, function() {
    $(this).attr('src', next);
    $(this).fadeIn(150);
  });
});
