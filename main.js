"use strict";

var size = 4,gridWidth=70,offset=2; // grid size is 70 in css
for(var i=1;i<=size*size;i++){
	$( ".grid-container" ).append( "<div class='grid'> </div>" );	
	if(i%4==0){
		$( ".grid-container" ).append( "<br>" );			
	}
}
var classes = ["red","green","blue","black","yellow","gray","voilet","orange"];
var colorIndexes = createNRandomNumbers(16);

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
var clickedItems = [],prevClicked = "";
// On click grid 
$(".grid-container").on("click",function(e){
	var elem = e.target;
	if($(elem).hasClass("grid")){
		var index = getIndexOfGrid(elem);
		var className = classes[colorIndexes[index]];
		var isClicked = $.inArray(className, clickedItems ); // check item is aleady clicked or not
		if(isClicked !== -1){
			isClicked.push(index);
			$(elem).addClass(className);
			if(!prevClicked){					// of prevClicked item is there than check the 2nd item is same or not
				prevClicked = className;
			}else{
				if(prevClicked === className){
					$(elem).addClass("transparent");
				}else{	// removed for clicked items so far					
					isClicked.pop();
					isClicked.pop();
					prevClicked = "";
				}
			}
		}
	}
});
function getIndexOfGrid(grid){
	var gridOffset = $(grid).offset();
	var gridContOffset = $(".grid-container").offset();
	var index = size*(gridOffset.top-gridContOffset.top)/gridWidth + (gridOffset.left-gridContOffset.left)/gridWidth ;
	return index;
}