var rand1 = 0;
var rand2 = 0;

function setTwoRandoms(){
    rand1 = Math.floor(Math.random() * 6) + 1;
    rand2 = Math.floor(Math.random() * 6) + 1;
}

function changeDieFaces(randomNum, diceid){
  switch (randomNum){
      case 1:
        document.getElementById(diceid + "_dot1").style.display ="none";
        document.getElementById(diceid + "_dot2").style.display ="none";
        document.getElementById(diceid + "_dot3").style.display ="none";
        document.getElementById(diceid + "_dot4").style.display ="none";
        document.getElementById(diceid + "_dot5").style.display ="none";
        document.getElementById(diceid + "_dot6").style.display ="none";
        document.getElementById(diceid + "_dot7").style.display ="block";
      break;
      case 2:
      document.getElementById(diceid + "_dot1").style.display ="none";
      document.getElementById(diceid + "_dot2").style.display ="block";
      document.getElementById(diceid + "_dot3").style.display ="none";
      document.getElementById(diceid + "_dot4").style.display ="none";
      document.getElementById(diceid + "_dot5").style.display ="block";
      document.getElementById(diceid + "_dot6").style.display ="none";
      document.getElementById(diceid + "_dot7").style.display ="none";
      break;
      case 3:
      document.getElementById(diceid + "_dot1").style.display ="block";
      document.getElementById(diceid + "_dot2").style.display ="none";
      document.getElementById(diceid + "_dot3").style.display ="none";
      document.getElementById(diceid + "_dot4").style.display ="none";
      document.getElementById(diceid + "_dot5").style.display ="none";
      document.getElementById(diceid + "_dot6").style.display ="block";
      document.getElementById(diceid + "_dot7").style.display ="block";
      break;
      case 4:
      document.getElementById(diceid + "_dot1").style.display ="block";
      document.getElementById(diceid + "_dot2").style.display ="none";
      document.getElementById(diceid + "_dot3").style.display ="block";
      document.getElementById(diceid + "_dot4").style.display ="block";
      document.getElementById(diceid + "_dot5").style.display ="none";
      document.getElementById(diceid + "_dot6").style.display ="block";
      document.getElementById(diceid + "_dot7").style.display ="none";
      break;
      case 5:
      document.getElementById(diceid + "_dot1").style.display ="block";
      document.getElementById(diceid + "_dot2").style.display ="none";
      document.getElementById(diceid + "_dot3").style.display ="block";
      document.getElementById(diceid + "_dot4").style.display ="block";
      document.getElementById(diceid + "_dot5").style.display ="none";
      document.getElementById(diceid + "_dot6").style.display ="block";
      document.getElementById(diceid + "_dot7").style.display ="block";
      break;
      case 6:
      document.getElementById(diceid + "_dot1").style.display ="block";
      document.getElementById(diceid + "_dot2").style.display ="block";
      document.getElementById(diceid + "_dot3").style.display ="block";
      document.getElementById(diceid + "_dot4").style.display ="block";
      document.getElementById(diceid + "_dot5").style.display ="block";
      document.getElementById(diceid + "_dot6").style.display ="block";
      document.getElementById(diceid + "_dot7").style.display ="none";
      break;
  }
}
var myBtn = document.getElementById("btn");
myBtn.addEventListener("click", function(){
  setTwoRandoms();
  changeDieFaces(rand1, "dice1")
  changeDieFaces(rand2, "dice2")
  document.getElementById("maintext").innerHTML = rand1 + rand2;
});
