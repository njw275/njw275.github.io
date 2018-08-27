
var x = 1;
var first = true;
var vrboxclicked = 0;
var GoGLOBAL = false;
/*
    Software Engineering Take Over
*/
$('#softwareEngineering, .vertical-text-left').on('click',function(){
  showSoftwareEngineeringCategories(1500);

      if (!first){
        $("#aboutPicture").css("z-index", x);
        $("#aboutPicture").animate({left: "-100px"},500);
        // console.log("before left") ;
        var zIndex = $("#aboutPicture").css('z-index');
        $("#aboutPicture").css('z-index','-10');
        $("#aboutPicture").animate({left: "1300px"},5);
        // console.log("after left");
        $("#aboutPicture").css('z-index',zIndex);
        $("#aboutPicture").animate({left: "1175px"},1500);
      }else{
        $("#aboutPicture").css("z-index", x);
        $("#aboutPicture").animate({left: "1175px"},1500);
        first = false;
      }
      $("#CV").css({"top" : "96%", "left" : "0.5%"});
});

$('#backButton').on('click',function(){
  showSoftwareEngineeringCategories(0);
  $('.twoworks').hide();
  $('.onework').hide();
  $('.threeworks').hide();
  $('#backButton').hide(); //button
  $('#sectionHeader').stop();
  $('#sectionHeader').css("top","-15%"); //header
});

$('#backButton2').on('click',function(){
  showCreativeCategories(0);
  $('#VRBoxHolder').hide();
  $('.twoworks').hide();
  $('.onework').hide();
  $('.threeworks').hide();
  $('#backButton2').hide(); //button
  $('#sectionHeader').stop();
  $('#sectionHeader').css("top","-15%"); //header
});


$('.vertical-text-left, .vertical-text-right, #creative, #softwareEngineering').on('click',function(){
  $('#draggingHolder').hide();
  $('.twoworks').hide();
  $('.onework').hide();
  $('.threeworks').hide();
  $('#backButton').hide(); //button
  $('#sectionHeader').stop();
  $('#sectionHeader').css("top","-15%"); //header
});


/*
    Creative Technologist Take Over
*/
$('#creative, .vertical-text-right').on('click',function(){

    showCreativeCategories(0);

    if(!first){
    $("#aboutPicture").css("z-index", x);
    $("#aboutPicture").animate({left: "1300px"},500);
    // console.log("before left") ;
    var zIndex = $("#aboutPicture").css('z-index');
    $("#aboutPicture").css('z-index','-10');
    $("#aboutPicture").animate({left: "-100px"},5);
    // console.log("after left");
    $("#aboutPicture").css('z-index',zIndex);
    $("#aboutPicture").animate({left: "4px"},1500);
    }else{
      $("#aboutPicture").css("z-index", x);
      $("#aboutPicture").animate({left: "4px"},1500);
      first = false;
    }


});

// /*
//     CV Catcher Click
// */
// $('#cvCatcher').on('click',function(){
//   console.log("clciked cv catcher");
//   $('#cvCatcher').animate({top: '85%'},2000);
//   $("#about").css("z-index", x);
//   x++;
//   $('#about').animate({left: "7%", width: "86%"},4000);
//   $('.vertical-text-left').delay(4000).animate({left: "-5%"}); /*left -5%*/
//   $('.vertical-text-right').delay(4000).animate({left: "85%"}); /*left -5%*/
//   // $('#sketch-holder').show();

  // left: 43%;
  // width: 14%;

// });

$('#github').on('click',function(){
  window.open('https://github.com/njw275', '_blank');
});


$('#vr').on('click',function(){
  $('#backButton2').show();
  $('#VRBoxHolder').show();
  vrboxclicked++;

  //startMouseAnimation();

});

$('#webdev').on('click',function(){

  $('#webdevworks').children().show();
  $('#webdevworks').children().addClass('showup');

  $('#backButton2').show();


});

$('#ar').on('click',function(){

  $('#arworks').children().show();
  $('#arworks').children().addClass('showup');

  $('#backButton2').show();


});


$('#p5').on('click',function(){
  window.open('https://github.com/njw275/Decoding-Nature', '_blank');
});


$('#db , #OS, #ml, #Tuned').on('click',function(){

  $(".csWork").hide();
  //get the text
  //put it in sectionHeader
  $('#sectionHeader').html($(this).html());
  //then animate
  $('#sectionHeader').animate({top: '5%'},2000);

});

$('#vr, #webdev, #ar').on('click',function(){

  $(".creativeWork").hide();
  //get the text
  //put it in sectionHeader
  $('#sectionHeader').html($(this).html());
  //then animate
  $('#sectionHeader').animate({top: '5%'},2000);

});



$('#db').on('click',function(){
  $('#dbworks').children().show();
  $('#dbworks').children().addClass('showup');
  $('#backButton').show();
});

$('#OS').on('click',function(){
  $('#osworks').children().show();
  $('#osworks').children().addClass('showup');
  $('#backButton').show();
});

$('#ml').on('click',function(){
  $('#mlworks').children().show();
  $('#mlworks').children().addClass('showup');
  $('#backButton').show();
});

$('#Tuned').on('click',function(){
  $('#Tunedworks').children().show();
  $('#Tunedworks').children().addClass('showup');
  $('#backButton').show();
});



$('.csWork').on('click',function(e){
  if($(e.target).parent().hasClass("topLeft")){
    console.log("yess");
  }
});


$('.topLeft , .topRight, .bottomLeft , .bottomRight , #softwareEngineering').on('click',function(e){
  // console.log("vr count: " + vrboxclicked);
  // console.log(e.target.id);
  if(e.target.id == "vr" && vrboxclicked % 2 == 0){
    console.log("ugh2");
    $('#VRBoxHolder').hide();
  }
  if(e.target.id != "vr"){
    if($("#VRBoxHolder").css('display')!='none'){
      vrboxclicked++;
      $('#VRBoxHolder').hide();
    }
  }
  //

});


function startMouseAnimation(){
  //first i need to show the mouse and start the animation
  GoGLOBAL = true;
  $("#mouseAnimation").show();
  $("#mouseAnimation").addClass("play");

  setTimeout(function(){
    $("#mouseAnimation").hide();
    $("#mouseopen").show();
    $("#mouseopen").addClass("movetocube");
  }, 3000);

  setTimeout(function(){
    $("#mouseopen").removeClass("movetocube");
    $("#mouseopen").hide();
    $("#mouseAnimation").show();
    $("#mouseAnimation").css({'top' : '65%','left' : '55%'});
    $("#mouseAnimation").removeClass("play");
    $("#mouseAnimation").addClass("play2");
    // $("#mouseopen").addClass("play2");
  }, 6000);

  setTimeout(function(){
    // $("#mouseopen").removeClass("movetocube");
    // $("#mouseopen").hide();
    // $("#mouseAnimation").show();
    // $("#mouseAnimation").css({'top' : '65%','left' : '55%'});
    $("#mouseAnimation").hide();
    $("#mouseopen").css({'left' : '55%', 'top' : '65%'});
    $("#mouseopen").show();
    setTimeout(function(){
      $("#mouseAnimation").show();
      $("#mouseopen").hide();
      $("#mouseAnimation").removeClass("play2");
      $("#mouseAnimation").addClass("play2");
      setTimeout(function(){
        $("#mouseAnimation").hide();
      }, 2000);
    }, 2000);
  }, 7000);

}




function showSoftwareEngineeringCategories(timeToShow){

  $("#githubPic").css({"top" : "96%", "left" : "98%"});
  $("#linkedInPic").css({"top" : "96%", "left" : "95.5%"});

  $('.vertical-text-left').animate({left: "-15%"}); /*left -5%*/
  $('.creativeWork').hide();
  $('.topLeft').css({fontSize: "4vw", top: "-25%", left: "5%"})
  $('.topRight').css({fontSize: "4vw", top: "-25%", left: "60%"})

  $('.bottomLeft').css({fontSize: "4vw", top: "125%", left: "5%"})
  $('.bottomRight').css({fontSize: "4vw", top: "125%", left: "50%"})

  $('.csWork').show();
    // console.log("click!");
    $("#softwareEngineering").css("z-index", x);
    x++;
    $("#softwareEngineering").animate({width: "91.5%"},2000);
    $("#creative").delay(900).animate({width: "8.5%"},2000); /* , left: "91.5%" */



    $('.left').animate({margin: "500px auto"},2000);
    $('.sideright').css({fontSize: "0px"},5000);
    // $('.techWork').animate({fontSize: "32px"},2000,"swing")
    // $('.workContainer').animate({height: "100%"},2000);
    $('.workContainer').css({height: "100%",left : "0px"});
    $('.topLeft').delay(timeToShow).animate({fontSize: "4vw", top: "20%", left: "5%"},1500)
    $('.topRight').delay(timeToShow).animate({fontSize: "4vw", top: "20%", left: "60%"},1500)

    $('.bottomLeft').delay(timeToShow).animate({fontSize: "4vw", top: "70%", left: "5%"},1500)
    $('.bottomRight').delay(timeToShow).animate({fontSize: "4vw", top: "70%", left: "50%"},1500)

    $('.vertical-text-right').delay(2500).animate({left: "85%"}); /*left -5%*/
    x++;
    console.log("x after soft click is: " + x);
    // $('#softwareEngineering').addClass('takeOver');
}


function showCreativeCategories(timeToShow){
  $("#githubPic").css({"top" : "96%", "left" : "0.5%"});
  $("#linkedInPic").css({"top" : "96%", "left" : "3%"});

  $('.vertical-text-right').animate({left: "100%"}); /*left -5%*/
  $('.csWork').hide();
  $('.topLeft').css({fontSize: "4vw", top: "-20%", left: "20%"},1500)
  $('.topRight').css({fontSize: "4vw", top: "-20%", left: "80%"},1500)

  $('.bottomLeft').css({fontSize: "4vw", top: "120%", left: "20%"},1500)
  $('.bottomRight').css({fontSize: "4vw", top: "120%", left: "80%"},1500)
  // $('.topRight').delay(1500).animate({fontSize: "4vw", top: "20%", left: "80%"},3000)
  $('.creativeWork').show();
  $('.workContainer').css({height: "100%",right : "0px", left: ''});
  $("#creative").css("z-index", x);
  x++;
  $("#creative").animate({width: "91.5%"},2000);
  $("#softwareEngineering").delay(900).animate({width: "8.5%"},2000); /* , left: "91.5%" */


      $('.right').animate({margin: "500px auto"},2000);
      $('.sideleft').css({fontSize: "0px"},5000);
      // $('.techWorkCreative').delay(1500).animate({fontSize: "4vw", top: "20%", left: "20%"},3000)
      $('.topLeft').delay(timeToShow).animate({fontSize: "4vw", top: "20%", left: "20%"},1500)
      $('.topRight').delay(timeToShow).animate({fontSize: "4vw", top: "20%", left: "80%"},1500)

      $('.bottomLeft').delay(timeToShow).animate({fontSize: "4vw", top: "70%", left: "20%"},1500)
      $('.bottomRight').delay(timeToShow).animate({fontSize: "4vw", top: "70%", left: "80%"},1500)

      $('.vertical-text-left').delay(2500).animate({left: "-5%"}); /*left -5%*/
      x++;
      // console.log("x after creative click is: " + x);

      $("#CV").css({"top" : "96%", "left" : "96%"});
      // $('#softwareEngineering').addClass('takeOver');

}


  //
  //
  // $('.left').animate({margin: "500px auto"},2000);
  // $('.sideright').css({fontSize: "0px"},5000);
  // // $('.techWork').animate({fontSize: "32px"},2000,"swing")
  // // $('.workContainer').animate({height: "100%"},2000);
  // $('.workContainer').css({height: "100%",left : "0px"});
  //
  //
  // $('.vertical-text-right').delay(2500).animate({left: "85%"}); /*left -5%*/
  // x++;
  // console.log("x after soft click is: " + x);
  // // $('#softwareEngineering').addClass('takeOver');

/**/
