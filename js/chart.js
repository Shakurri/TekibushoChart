var status=0;
var ready=true;
var quesElm=document.getElementById("question");
var ans01elm=document.getElementById("answer01");
var ans02elm=document.getElementById("answer02");
var ans03elm=document.getElementById("answer03");
var resultElm=document.getElementById("result");
var icomElm=document.getElementById("bushoIcon");

var papers=[".yellowP",".grayP",".oliveP",".orangeP",".limeP"];
var nowPaper=".yellowP";
var leftPaper=randomColor();
var rightPaper=randomColor();

function randomColor(){
  var random=Math.floor(Math.random()*papers.length);
  while(papers[random]==nowPaper||papers[random]==leftPaper||papers[random]==rightPaper){
    random=Math.floor(Math.random()*papers.length);
  }
  return papers[random];
}
function getRandom(min,max){
  var random=Math.floor(Math.random()*(max+1-min))+min;
  return random;
}

function typing(){
 $('#question').children().andSelf().contents().each(function() {
   if (this.nodeType == 3) {
   $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
   }
   });
   $('#question').css({'opacity':1});
   for (var i = 0; i <= $('#question').children().size(); i++) {
   $('#question').children('span:eq('+i+')').delay(50*i).animate({'opacity':1},50);
   };
}   
function quesSet(stat,ques,ans01,ans03,){
  status=stat;
  quesElm.innerHTML=ques;
  ans01elm.innerHTML=ans01;
  ans03elm.innerHTML=ans03;
  setTimeout(function(){
    $("#question").css({"display":"block"});
    $("#question").css({"opacity":0});
    typing();
  },200)
  setTimeout(function(){
    $('#answer01').fadeIn(500);
    $('#answer03').fadeIn(500);
    ready=true;
    console.log("true");
  },600)
}

function resultSet(busho,iconName){
  pAwayLR(leftPaper,rightPaper);
  setTimeout(function(){
    $('.osusume').fadeIn(300);
    resultElm.innerHTML=busho;
    icomElm.src=iconName;
  },800)
  setTimeout(function(){
    $('#result').fadeIn(500);
  },1800)
  setTimeout(function(){
    $('#bushoIcon').fadeIn(500);
  },1900)
  setTimeout(function(){
    $('.oneMoreButton').css({border:"solid 2px var(--mainblack)",color:"var(--mainblack)"});
  },2100)
}
function pAwayNow(paper){
  $(paper).animate({top:"-=100%"},1000,'swing');
  $(paper).css({"z-index":10});
  $(paper).removeClass("nowP");
  $(paper).removeClass("initP");
  setTimeout(function(){
    $(paper).fadeOut(300);
  },1000)
}
function pAwayLR(paper1,paper2){
  $(paper1).animate({top:"+=100%"},800,'swing');
  $(paper2).animate({top:"+=100%"},800,'swing');
  setTimeout(function(){
    $(paper1).fadeOut(300);
    $(paper2).fadeOut(300);
  },1000)
}
function pSetLeft(paper){
  $(paper).addClass("leftP");
  $(paper).css({"z-index":50,top:"45%",left:"-100%",right:"auto"});
  $(".leftP").fadeIn(10);
  var l=22+getRandom(1,8);
  var t=getRandom(-2,2);
  var time=200+getRandom(10,600);
  $(".leftP").animate({left:"+="+l+"%",top:"+="+t+"%"},time);
  var d=8+getRandom(1,12);
  $(".leftP").css({transform:"rotate("+d+"deg)"});

}
function pSetRight(paper){
  $(paper).addClass("rightP");
  $(paper).css({"z-index":50,top:"45%",right:"-90%",left:"auto"});
  $(".rightP").fadeIn(10);
  var l=12+getRandom(1,8);
  var t=getRandom(-2,2);
  var time=200+getRandom(10,600);
  $(".rightP").animate({right:"+="+l+"%",top:"+="+t+"%"},time);
  var d=8+getRandom(1,12);
  $(".rightP").css({transform:"rotate(-"+d+"deg)"});

}

function pSetNow(paper){
  $(paper).css({"z-index":30});
  $(paper).addClass("nowP");
  $(paper).removeClass("rightP");
  $(paper).removeClass("leftP");
  $(paper).animate({left:"0%",top:"-20%"},1000);

}










$(window).on('load',function(){
  $(".initP").animate({top:"-=90%",left:"+=3%"},1700,'swing');
  $(".initP").css({transform:"rotate(10deg)"});

  $(".mainTitle").fadeIn(800);
  $(".oneMoreButton").fadeIn(1000);
  $(".caption").fadeIn(1000);
  $(".rotate").fadeIn(700);
  setTimeout(function(){
    $(".startText").fadeIn(1000);
  },1300)
});

$(".oneMoreButton").on('click',function(){
  $(".resetWhite").fadeIn(800);
  setTimeout(function(){
    location.reload(true);
  },800)
});

$(".startText").on('click',function(){
  if(ready){
  ready=false;
  console.log("false");
  status=1;
  $(".initP").animate({top:"-=70%"},700,'swing');
  $(".initP").css({transform:"rotate(15deg)"});
  $(".startText").fadeOut(500);
  $(".mainTitle").fadeOut(700);
  setTimeout(function(){
    $("#question").css({display:"inline"});
    typing();
  },600)
  setTimeout(function(){
    $('#answer01').fadeIn(500);
    $('#answer03').fadeIn(500);
    pSetLeft(leftPaper);
    pSetRight(rightPaper);
    ready=true;
    console.log("true");
  },800)
  }
});

$("#answer01").on('click',function(){
  if(ready){
  ready=false;
  console.log("false");
  $('#answer01').fadeOut(700);
  $('#answer02').fadeOut(300);
  $('#answer03').fadeOut(300);
  $('#question').fadeOut(300);
  pAwayNow(nowPaper);
  pSetNow(leftPaper);
  var newCol=randomColor();
  nowPaper=leftPaper;
  leftPaper=newCol;
  setTimeout(function(){
    pSetLeft(leftPaper);
    switch(status){
      case '1':
      quesSet(2,"めちゃめちゃ目立ちたい!?","めっちゃ<br>目立ちたい!!!","少しは<br>目立ちたい!");
      break;
      case '2':
      resultSet("ステージ部署","image/bushoIcon/hiru-icon.png");
      break;
      case '3':
      quesSet(4,"呑むことは好き?","大好き!!","そこそこ...");
      break;
      case '4':
      quesSet(16,"スポーツも好き？","もちろん","ふつうかな");
      break;
      case '5':
      resultSet("BAR部署","image/bushoIcon/bar-icon.png");
      break;
      case '6':
      resultSet("カフェ部署","image/bushoIcon/cafe-icon.png");
      break;
      case '7':
      resultSet("PA部署","image/bushoIcon/pa-icon.png");
      break;
      case '8':
      quesSet(9,"家具にはこだわりがある?","けっこうある","そんなに...");
      break;
      case '9':
      resultSet("インテリア部署","image/bushoIcon/in-icon.png");
      break;
      case '10':
      resultSet("エクステリア部署","image/bushoIcon/ex-icon.png");
      break;
      case '11':
      quesSet(12,"イラストには自信がある？","割とある","そこまで...");
      break;
      case '12':
      resultSet("グラフィック部署","image/bushoIcon/gra-icon.png");
      break;
      case '13':
      quesSet(14,"どっちかといえば好きなのは？","さんすう","えいご");
      break;
      case '14':
      resultSet("web部署","image/bushoIcon/web-icon.png");
      break;
      case '15':
      resultSet("ディレクション部署","image/bushoIcon/d-icon.png");
      break;
      case '16':
      resultSet("運動会部署","image/bushoIcon/undo-icon.png");
      break;

    }
  },600)
  }
});

$("#answer03").on('click',function(){
  if(ready){
  ready=false;
  console.log("false");
  $('#answer01').fadeOut(300);
  $('#answer02').fadeOut(300);
  $('#answer03').fadeOut(700);
  $('#question').fadeOut(300);
  pAwayNow(nowPaper);
  pSetNow(rightPaper);
  var newCol=randomColor();
  nowPaper=rightPaper;
  rightPaper=newCol;
  setTimeout(function(){
    pSetRight(rightPaper);
    switch(status){
      case '1':
      quesSet(8,"どんなものを作るのが好き？","大きいもの","細かいもの");
      break;
      case '2':
      quesSet(3,"家で過ごすなら...","なんか食べる","なんか観る");
      break;
      case '3':
      quesSet(7,"音楽をよく聴く？","よく聴く","まぁまぁ");
      break;
      case '4':
      quesSet(6,"甘いもの好き？","すき！！","そうでもない");
      break;
      case '5':
      resultSet("PA部署","image/bushoIcon/pa-icon.png");
      break;
      case '6':
      quesSet(7,"音楽をよく聴く？","よく聴く","まぁまぁ");
      break;
      case '7':
      quesSet(5,"お酒をのむなら....","しっぽりしみじみ","みんなでワイワイ");
      break;
      case '8':
      quesSet(11,"気づいたら落書きしてる？","よくしてる..","あんまり。");
      break;
      case '9':
      quesSet(10,"プロデュースするなら...","おしゃれな建物","おしゃれな食べ物");
      break;
      case '10':
      resultSet("ブース部署","image/bushoIcon/booth-icon.png");
      break;
      case '11':
      quesSet(13,"自分はデジタル人間だ","たぶんそう","いや..?");
      break;
      case '12':
      quesSet(14,"どっちかといえば好きなのは？","さんすう","えいご");
      break;
      case '13':
      quesSet(15,"締め切りには厳しい方だ","そう思う","そうでもない");
      break;
      case '14':
      resultSet("映像部署","image/bushoIcon/movie-icon.png");
      break;
      case '15':
      resultSet("ワークショップ部署","image/bushoIcon/work-icon.png");
      break;
      case '16':
      quesSet(5,"お酒のむなら...","しっぽりしみじみ","みんなでワイワイ");
      break;
    }
  },600)
  }
  });