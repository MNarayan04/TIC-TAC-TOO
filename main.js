const boxes = document.querySelectorAll('.box')
const gameinfo = document.querySelector('.game_info')
const newgame =  document.querySelector('.btn')

let currplayer;
let grid;

const winpostion=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],  
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// console.log(newgame.classList);
 
//initialise game
function initgame(){
    currplayer="X";
    //ya backend me empty kar raha ha
    grid=["","","","","","","","",""];

    // UI par empty karna ka liya

    boxes.forEach((box,index)=>{
        box,innerHTML="";
        boxes[index].style.pointerEvents="all"; 

        //to remove green color from it

        box.classList=`box boxs${index+1}`;
    })
    newgame.classList.remove("active");
    gameinfo.innerHTML=`Current Player - ${currplayer}`;
     
 }


 initgame();

function swapturn(){
    if(currplayer=="X"){
        currplayer="0"
    }
    else{
        currplayer="X"
    }
    gameinfo.innerHTML=`Current Player - ${currplayer}`; 

}


function checkgame(){
    let answer=""
    winpostion.forEach((position)=>{
        if((grid[position[0]]!=="" || grid[position[1]]!=="" || grid[position[2]]!=="") && (grid[position[0]]===grid[position[1]] && (grid[position[1]]===grid[position[2]])))  
        {
            if(grid[position[0]]=="X")
                answer="X"
            else
                answer="O"

            //disable pointer event

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            boxes[position[0]].classList.add(".win");
            boxes[position[1]].classList.add(".win");
            boxes[position[2]].classList.add(".win");

            
        }
    });
    //we have a winner
    if(answer!==""){
        gameinfo.innerHTML=`Wiiner is - ${answer}`
        newgame.classList.add("active")
        return;

    }


    //now check for tie situation
    let fillcount=0;
    grid.forEach((box)=>{
        if(box!=="")
        {
            fillcount++;
        }
    })

    if(fillcount==9){
        gameinfo.innerText=`Game is TIE`;
        newgame.classList.add('active');
        return;
    }
           
}

 function handleclick(index){
    if(grid[index]==""){
        boxes[index].innerHTML=currplayer
        grid[index]=currplayer 
        boxes[index].style.pointerEvents="none"
        
        //swap turn

        swapturn();
        //check chance of win;
        checkgame();
    }
 }

 boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
 })

 newgame.addEventListener("click",initgame());