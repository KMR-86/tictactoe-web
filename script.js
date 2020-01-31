var gameBoard;
cells=document.querySelectorAll('.cell');
var whichPlayerFlag=0;
var gameBoard = new Array(9);
var isGameFinished=false;
var huPlayer;
var aiPlayer;
startGame();

function startGame(){
    for(var i=0;i<cells.length;i++){
        cells[i].addEventListener('click',clicked,false);
        cells[i].innerText="";
        cells[i].style.color="#000000";
        //console.log(cells[i].id);
        gameBoard[i]=i;

    }
    if(whichPlayerFlag%2==0){
        huPlayer="X";
        aiPlayer="O";
    }
    else{
        huPlayer="O";
        aiPlayer="X";
    }
    
}
function clicked(cell){
    //console.log(cell.target.id);
    id=cell.target.id;
    
    console.log(isGameFinished);
    if(document.getElementById(id).innerText=="" && !checkIfGameFinished(gameBoard)[0]){
        if(whichPlayerFlag%2==0){
            document.getElementById(id).innerText="X";
            gameBoard[id]="X";
        }
        else{
            document.getElementById(id).innerText="O";
            gameBoard[id]="O";
        }
        whichPlayerFlag++;
        console.log(gameBoard);
    }
    if(checkIfGameFinished(gameBoard)[0]){
        console.log("gameOver");
    }
    else if(emptySquares().length!=0){
        x=minimax(gameBoard,aiPlayer);
        makemove(x.index,aiPlayer);
    }
    else{
        console.log("Game Drawn");
    }
    
}
function makemove(cellno,move){
    console.log("the index is ",cellno);
    if(document.getElementById(cellno).innerText=="" && !checkIfGameFinished(gameBoard)[0]){

        document.getElementById(cellno).innerText=move;
        gameBoard[cellno]=move;
        whichPlayerFlag++;
        console.log(gameBoard);
    }
    if(checkIfGameFinished(gameBoard)[0]){
        console.log("gameOver");
    }
}
function checkIfGameFinished(newgameBoard){
    for(var i=0;i<3;i++){
        if(newgameBoard[i*3]==newgameBoard[i*3+1] && newgameBoard[i*3+1]==newgameBoard[i*3+2] && newgameBoard[i*3]!=""){
            //console.log("here1 ",i);
            
            cells[i*3].style.color="#ff0000";
            cells[i*3+1].style.color="#ff0000";
            cells[i*3+2].style.color="#ff0000";
            return [true,newgameBoard[i*3]];
        }
        if(newgameBoard[i]==newgameBoard[i+3] && newgameBoard[i+3]==newgameBoard[i+6] && newgameBoard[i]!=""){
            //console.log("here2 ",i);
            cells[i].style.color="#ff0000";
            cells[i+3].style.color="#ff0000";
            cells[i+6].style.color="#ff0000";
            return [true,newgameBoard[i]];
        }

        
    }
    if(newgameBoard[0]==newgameBoard[4] && newgameBoard[4]==newgameBoard[8] && newgameBoard[0]!=""){
        isGameFinished=true;
        //console.log("here3 ",i);
        cells[0].style.color="#ff0000";
        cells[4].style.color="#ff0000";
        cells[8].style.color="#ff0000";
        return [true,newgameBoard[0]];
    }
    if(newgameBoard[2]==newgameBoard[4] && newgameBoard[4]==newgameBoard[6] && newgameBoard[2]!=""){
        isGameFinished=true;
        //console.log("here4 ",i);
        cells[2].style.color="#ff0000";
        cells[4].style.color="#ff0000";
        cells[6].style.color="#ff0000";
        return [true,newgameBoard[2]];
    }
    return [false,-1];

}
function justcheckIfGameFinished(newgameBoard){
    for(var i=0;i<3;i++){
        if(newgameBoard[i*3]==newgameBoard[i*3+1] && newgameBoard[i*3+1]==newgameBoard[i*3+2] && newgameBoard[i*3]!=""){

            return [true,newgameBoard[i*3]];
        }
        if(newgameBoard[i]==newgameBoard[i+3] && newgameBoard[i+3]==newgameBoard[i+6] && newgameBoard[i]!=""){

            return [true,newgameBoard[i]];
        }

        
    }
    if(newgameBoard[0]==newgameBoard[4] && newgameBoard[4]==newgameBoard[8] && newgameBoard[0]!=""){
        return [true,newgameBoard[0]];
    }
    if(newgameBoard[2]==newgameBoard[4] && newgameBoard[4]==newgameBoard[6] && newgameBoard[2]!=""){
        return [true,newgameBoard[2]];
    }
    return [false,-1];

}
function emptySquares(){
    emptyList=[];
    for(var i=0;i<gameBoard.length;i++){
        if(gameBoard[i]!="X" && gameBoard[i]!="O")emptyList.push(i);
    }
    return emptyList;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (justcheckIfGameFinished(newBoard)[0]==true && justcheckIfGameFinished(newBoard)[1]==huPlayer) {
		return {score: -10};
	} else if (justcheckIfGameFinished(newBoard)[0]==true && justcheckIfGameFinished(newBoard)[1]==aiPlayer) {
		return {score: 10};
	} else if (availSpots.length === 0) {
        
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = availSpots[i];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
            move.score = result.score;

            
		} else {
			var result = minimax(newBoard, aiPlayer);
            move.score = result.score;

		}

		newBoard[availSpots[i]] = move.index;

        moves.push(move);
        
	}

	var bestMove=888;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
            
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
    //console.log("the best move score is ",bestMove,"   ",moves.length,"   ",moves[bestMove].index);
	return moves[bestMove];
}
