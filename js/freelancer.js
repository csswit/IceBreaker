/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

$("#play").hide();
$("#next").hide();
$("#names-input").hide();
$("#questions-input").hide();
// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(function(){
     $(".name").typed({
       strings: ["Shall we play a game?"],
       typeSpeed: 50,
       startDelay: 1000,
       cursorChar: "_",
       callback: function(){
         $("#names-input").fadeIn(1000);
         $("#questions-input").fadeIn(1000);
         $("#play").fadeIn(1000);
       },
     });
 });

function playClicked(){
  $('.typed-cursor').hide();
  $(".name").typed({
    showCursor: false,
  });
  $("#play").fadeOut(400);
  $("#names-input").fadeOut(400);
  $("#questions-input").fadeOut(400);
  $(".skills").typed({
      strings: fullSentence(),
      typeSpeed: 10,
      startDelay: 1000,
      loop: false,
      cursorChar: "_",
      preStringTyped: function(){
        $("#next").fadeIn(400);
      },
  });
};
var greetings = ["Hey","Yo","Hi",""];
var names = [];
var questions = [];


document.getElementById('names-input')
  .addEventListener('change', readNamesFile, false);

document.getElementById('questions-input')
    .addEventListener('change', readQuestionsFile, false);

function readNamesFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      names = contents.split("\n");
      names.splice(0,1);
      names.pop();
      names = shuffle(names);
    };
    reader.readAsText(file);
}

function readQuestionsFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      questions = contents.split("\n");
      questions.splice(0,1);
      questions.pop();
      questions = shuffle(questions);
    };
    reader.readAsText(file);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function fullSentence(){
  var result = [];
  greetings = shuffle(greetings);
  for (i = 0; i < names.length; i++) {
    result.push(_.sample(greetings) + " " + names[i] + ", " + _.sample(questions))
  }
  result.push("That's all, folks!");
  return result;
}
