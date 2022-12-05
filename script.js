const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const gameContainer = document.querySelector(".game-container");
const playAgain = document.querySelector(".playAgain")
const final = document.querySelector(".final");
const scoreCount = document.querySelector(".scoreCount");
const wrong = document.querySelector(".pop");
const close = document.querySelector(".close");
const againButton = document.querySelector(".againButton");
const gap = document.querySelector(".gap");

let startGame = false;
let player = {step: 4}
let time;
let right;
let score;

var objects = [ "vege1", "vege2","shoe"]

startButton.addEventListener("click", () => {
    start.classList.add("hide")
    game.classList.remove("hide")
    startGame = true
    score = 0
    began()
})

window.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });

close.addEventListener("click", () => {
    wrong.classList.add("hide")
    gap.setAttribute("style", "z-index: 0;")
    startGame = true
    fallingObject()
})


function spawnObject(){
    let border = gameContainer.getBoundingClientRect();
    let object = document.createElement("div");
    var index = Math.floor(Math.random() * Math.floor(objects.length))
    // console.log(index)
    // console.log(objects.length)
    // console.log(border.width)
    object.classList.add(objects[index])
    object.y = 0;
    object.style.top = object.y + 'px';
    object.style.left = Math.floor(Math.random() * (border.width - 200)) + 'px';
    gameContainer.appendChild(object);
    function addMark(){
        object.addEventListener("click", () => {
            object.classList.add("fadeOut")
                right = true;
                score = score + 1
        })
    }
    function noMark(){
    //     object.addEventListener("click", () => {
    //         object.classList.add("hide")
    //         right = false;
    //         startGame = false;
    //         wrong.classList.remove("hide")
    //         gap.setAttribute("style", "z-index: 100;")
    // })
        object.addEventListener("click", () => {
            object.classList.add("fadeOut")
                right = false;
                if (score > 0){
                    score = score - 1
                }
        })
    }
    if(objects[index] == "vege1"){
        addMark();
    }
    if(objects[index] == "vege2"){
        addMark();
    }
    if(objects[index] == "shoe"){
        noMark();
    }
}

function fallingObject(){
    if(startGame){
        moveObject()
        window.requestAnimationFrame(fallingObject);
    }
}

function moveObject(){
    let vege1 = document.querySelectorAll(".vege1");
    let vege2 = document.querySelectorAll(".vege2");
    let shoe = document.querySelectorAll(".shoe");
   
    let border = gameContainer.getBoundingClientRect();
    
    let spwanTime = border.height / 4

    function spawnItem(item){
        if(item.y >= spwanTime && item.y < (spwanTime + 4)){
            spawnObject();
        }
        if(item.y > (border.height + 200)){
            gameContainer.removeChild(item);
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
        // console.log("s" + spwanTime)
        // console.log("d" + item.y)
    }
    vege1.forEach(function(item){
        spawnItem(item);
    })
    vege2.forEach(function(item){
        spawnItem(item);
    })
    shoe.forEach(function(item){
        spawnItem(item);
    })
   
}
var timer = 60;
function countDown(){
    console.log(timer);
    document.querySelector(".count").innerHTML=`<div class="TimeCount">${timer}</div>`
    timer-=1
    if(timer>0){
        setTimeout(countDown,1000);

    }
    if (timer==0){
        document.querySelector('.win-lose').innerHTML='<h2>Try again!</h2>';
        document.querySelector('small').classList.add('hide');
        clearInterval(timer);
            let delay = setTimeout(() => {
                startGame = false
                remove()
                game.classList.add("hide")
                final.classList.remove("hide")
              }, 1000); 
    }
}


function began(){
    if(startGame == true){
        countDown();
        window.requestAnimationFrame(fallingObject);
        spawnObject()
    }
}



againButton.addEventListener("click", () => {
    window.location.reload();
})

function updateScore(){
    if(startGame == true){
        scoreCount.innerHTML = `${score}/10`;
        if(score == 10){
            countDown(timer=0);
            // console.log("stop")
            document.querySelector('.screenshoot').classList.remove('hide');
            let delay = setTimeout(() => {
                startGame = false
                remove()
                game.classList.add("hide")
                final.classList.remove("hide")
              }, 200);
              document.querySelector('.win-lose').innerHTML='<h2>Well Done!</h2>';
              document.querySelector('.againButton').classList.add('hide');
            }
    }
}

function remove(){
    let vege1 = document.querySelectorAll(".vege1");
    let vege2 = document.querySelectorAll(".vege2");
    let shoe = document.querySelectorAll(".shoe");
   
    
    vege1.forEach(function(item){
        gameContainer.removeChild(item);
    })
    vege2.forEach(function(item){
        gameContainer.removeChild(item);
    })
    shoe.forEach(function(item){
        gameContainer.removeChild(item);
    })
   
}

setInterval(updateScore, 1)



document.querySelector('.screenshoot').addEventListener('click', function() {
    html2canvas(document.querySelector('.canva-container'), {
        onrendered: function(canvas) {
            // document.body.appendChild(canvas);
          return Canvas2Image.saveAsPNG(canvas);
        }
    });
});