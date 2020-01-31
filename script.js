var gameBoard;
cells=document.querySelectorAll('.cell');
var whichPlayerFlag=0;
var gameState = new Array(9);
var isGameFinished=false;
startGame();

function startGame(){
    for(var i=0;i<cells.length;i++){
        cells[i].addEventListener('click',clicked,false);
        cells[i].innerText="";
        cells[i].style.color="#000000";
        //console.log(cells[i].id);
        gameState[i]="";

    }
    
}
function clicked(cell){
    //console.log(cell.target.id);
    id=cell.target.id;
    if(document.getElementById(id).innerText=="" && !checkIfGameFinished()){
        if(whichPlayerFlag%2==0){
            document.getElementById(id).innerText="X";
            gameState[id]="X";
        }
        else{
            document.getElementById(id).innerText="O";
            gameState[id]="O";
        }
        whichPlayerFlag++;
        console.log(gameState);
    }
    if(checkIfGameFinished()){
        console.log("gameOver");
    }
}
function checkIfGameFinished(){
    for(var i=0;i<3;i++){
        if(gameState[i*3]==gameState[i*3+1] && gameState[i*3+1]==gameState[i*3+2] && gameState[i*3]!=""){
            isGameFinished=true;
            cells[i*3].style.color="#ff0000";
            cells[i*3+1].style.color="#ff0000";
            cells[i*3+2].style.color="#ff0000";
            return true;
        }
        if(gameState[i]==gameState[i+3] && gameState[i+3]==gameState[i+6] && gameState[i]!=""){
            isGameFinished=true;
            cells[i].style.color="#ff0000";
            cells[i+3].style.color="#ff0000";
            cells[i+6].style.color="#ff0000";
            return true;
        }

        
    }
    if(gameState[0]==gameState[4] && gameState[4]==gameState[8] && gameState[0]!=""){
        isGameFinished=true;
        cells[0].style.color="#ff0000";
        cells[4].style.color="#ff0000";
        cells[8].style.color="#ff0000";
        return true;
    }
    if(gameState[2]==gameState[4] && gameState[4]==gameState[6] && gameState[2]!=""){
        isGameFinished=true;
        cells[2].style.color="#ff0000";
        cells[4].style.color="#ff0000";
        cells[6].style.color="#ff0000";
        return true;
    }

}

