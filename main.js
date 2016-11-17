"use strict";

var size = 4,gridWidth=70,offset=2,count=60,minScore=90; // grid size is 70 in css
$("#minScore").html(minScore);
for(var i=0;i<size*size;i++){
	$( ".grid-container" ).append( "<div class='grid' id='grid"+i+"'> </div>" );	
	if((i+1)%4==0){
		$( ".grid-container" ).append( "<br>" );			
	}
}
var classes = ["red","green","blue","black","yellow","gray","voilet","orange"];
var colorIndexes = createNRandomNumbers(16);

var score = 0;
function createNRandomNumbers(n){
	var arr = [];
	for(var i=0;i<(n-1)/2;i++){
		arr.push(i);
	}
	for(var i=0;i<(n-1)/2;i++){
		arr.push(i);
	}
	arr = shuffle(arr);
	console.log(arr);
	return arr;
}
function shuffle(arr) {
  var currentIndex = arr.length, tempVal, randomIndex,zero = 0;
  // While there remain elements to shuffle...
  while (zero !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    tempVal = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tempVal;
  }
  return arr;
}
var clickedItems = [],prevClicked = -1,clickEnabled=true; // till settimeout return
// On click grid 
$(".grid-container").on("click",function(e){
	if(clickEnabled&&count&&!checkLevelCompleted()){		
		var elem = e.target;
		if($(elem).hasClass("grid")){
			var index = getIndexOfGrid(elem);
			var className = classes[colorIndexes[index]];
			var isClicked = $.inArray(index, clickedItems ); // check item is aleady clicked or not
			if(isClicked === -1){
				clickedItems.push(index);
				$(elem).addClass(className);
				if(prevClicked == -1){	// of prevClicked item is there than check the 2nd item is same or not
					prevClicked = index;
				}else{
					// guess is correct		
					if(colorIndexes[prevClicked] === colorIndexes[index]){
						onRightGuess(elem,className);
						// wrong guess
					}else{	// removed last two clicked items	
						onWrongGuess(elem,className);						
					}
				}
			}
		}
	}
});
function getIndexOfGrid(grid,className){
	var gridOffset = $(grid).offset();
	var gridContOffset = $(".grid-container").offset();
	var index = size*(gridOffset.top-gridContOffset.top)/gridWidth + (gridOffset.left-gridContOffset.left)/gridWidth ;
	return index;
}
function onRightGuess(elem,className){
	clickEnabled = false;
	setTimeout(function(){
		$(elem).addClass("transparent");
		$("#grid"+prevClicked).addClass("transparent");
		prevClicked = -1;	// reset 						
		score += 15; 
		$("#score").html(score); 
		clickEnabled = true;
		if(clickedItems.length===size*size){
			showResult();
		}
	}, 400);	
}
function onWrongGuess(elem,className){
	clickEnabled = false;
	setTimeout(function(){
		$(elem).removeClass(className);
		$("#grid"+prevClicked).removeClass(classes[colorIndexes[prevClicked]]);
		prevClicked = -1;	// reset 
		clickedItems.pop();
		clickedItems.pop();
		score -= 3;
		$("#score").html(score); 
		clickEnabled = true;
	}, 800);
}
function checkLevelCompleted(){
	if(clickedItems.length==size*size) return true;
	return false;
}
function showResult(){
	$(".result-container").removeClass("hidden");
	if(score< minScore){
		$(".lost").removeClass("hidden");			
	}else{
		$(".win").removeClass("hidden");
	}
}
function updateTime(){
  var timer = setInterval(function(){
 	  count-= 1; 
 	  var countStr = count.toString()
  	$(".sec").html(countStr.length==2? countStr: "0"+countStr);
  	if(count===0){
  		clearInterval(timer);
  		showResult();	// show result when count is
  	}
  }, 1000);
}
// start timer
updateTime();