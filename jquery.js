var playing= false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;//used for setInterval function


$(function(){
    
    // click on start reset button
   $("#startreset").click(function(){
       
         //if we are playing
       if(playing == true){
           
           //reload the page
           location.reload();
       }else{
           
           //if we are not playing
           playing= true;//game initiated
           
           //set score to 0
           score = 0;
           $("#scorevalue").html(score);
           
           //show trials left
           $("#trialsLeft").show();
           trialsLeft = 3;
           addHearts();
           
           //hide game over box
           $("#gameOver").hide();
           
           
           //change button to reset game
           $("#startreset").html("Reset Game");
           
            
           //start sending fruits
           startAction();
           
       }
   }); 

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play(); //play sound
    
    //stop fruit 
    clearInterval(action);
    
    //hide fruit through animation
    $("#fruit1").hide("explode",500);//slicing the fruit
    
    
    //send new fruit
    setTimeout(startAction,800);
    
});


//functions
function addHearts(){
    $("#trialsLeft").empty();
    for(i=0; i< trialsLeft; i++){
               $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){
    //generating a fruit
    $("#fruit1").show();
    chooseFruit();// choose a random fruit
    $("#fruit1").css({'left': Math.round(550*Math.random()), 'top' : -50});
    // random position
    
          // generate a random step
    step = 1+ Math.round(5*Math.random());//changing the step
    
    //Move fruit down by one step every 10ms
    action = setInterval(function(){
        
        
        //move fruit by one step
       $("#fruit1").css('top', $("#fruit1").position().top + step);
        
             //check if the fruit is too low
             if($("#fruit1").position().top > $("#fruitContainer").height()){
                 //check if we have any trials left??
                 if(trialsLeft > 1){
                  //generating a fruit
                 $("#fruit1").show();
                 chooseFruit();// choose a random fruit
                 $("#fruit1").css({'left': Math.round(550*Math.random()), 'top' : -50});
                 // random position
    
                 // generate a random step
                 step = 1+ Math.round(5*Math.random());//changing the step
                     
                //reduce tirals by one
                trialsLeft--;
                
                //populate trialsLeft box
                addHearts();     
                }else{ //game over
                    playing = false;//we are not playing any more
                    $("#startreset").html("Start Game");// change button to start game.
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Yours score is '+score +'</p>');
                    
                    $("#trialsLeft").hide();
                    stopAction();
                    
                }
             }
      },10);
}


//generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src', 'images/' +fruits[Math.round(8*Math.random())] + '.png');
}
  
//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});
   
