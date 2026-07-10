let boxes=document.querySelectorAll(".box");
let ResetButton=document.querySelector("#ResetButton");
let NewButton=document.querySelector("#NewButton");
let msg_container =document.querySelector(".msg_container");
let msg=document.querySelector("#msg");
let turn0= true;//player x turn//player o turn
let count = 0;
let timeLeft = 10;
let timer;
const timerDisplay = document.querySelector("#timer");
let gameOver = false;



const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const ResetGame = ()=>{
    turn0=true;
    count=0;
    gameOver= false;
    clearInterval(timer); // stop old timer

    enableboxes();
    msg_container.classList.add("hide");

    startTimer();
};
  

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{

        if(box.innerText !== "") return;

        if(turn0){
            box.innerText = "X";
            turn0 = false;
        }else{
            box.innerText = "O";
            turn0 = true;
        }

        box.disabled = true;
        count++;

        let result = checkWin();

        if(!result){
            startTimer();
        }
    });
});
       
   

const disableboxes =()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes =()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};


const showwinner=(winner)=>{
    gameover=true;
    clearInterval(timer);
    msg.innerText=`Congratulations,winner is ${winner}`;
    msg_container.classList.remove("hide");
    
}
const checkWin=()=>{
    let winnerfound=false;
    for (let pattern of winPatterns){  
            let pos1val=boxes[pattern [0]].innerText;
            let pos2val=boxes[pattern [1]].innerText;
            let pos3val=boxes[pattern [2]].innerText;
            if(pos1val != "" && pos2val != "" && pos3val != ""){
                if(pos1val===pos2val && pos2val===pos3val){
                    winnerfound =true;
                    showwinner(pos1val);
                    disableboxes();
                    return;     
                }
            }
        }
        if (count === 9 && !winnerfound) { 
        clearInterval(timer); 
        msg.innerText = "Game Draw!";
        msg_container.classList.remove("hide");
    }
};
function startTimer(){

    clearInterval(timer);

    timeLeft = 10;
    timerDisplay.innerText = timeLeft;

    timer = setInterval(()=>{

        if(gameOver){
            clearInterval(timer);
            return;
        }

        timeLeft--;
        timerDisplay.innerText = timeLeft;


        if(timeLeft === 0){

            clearInterval(timer);

            const loser = turn0 ? "X" : "O";
            const winner = turn0 ? "O" : "X";

            gameOver = true;

            msg.innerText = `${loser}'s time is over!\n🎉 ${winner} wins the game!`;

            msg_container.classList.remove("hide");

            disableboxes();
        }

    },1000);
}

NewButton.addEventListener("click",ResetGame);  
ResetButton.addEventListener("click",ResetGame);      
