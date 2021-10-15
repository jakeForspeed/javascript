const coin = document.querySelector('.coin-img')
const coinRes = document.querySelector('#coin-res')


const pRes = document.querySelector('.p-result')
const cRes = document.querySelector('.c-result')

const pscore = document.querySelector('.player-score')
const cscore = document.querySelector('.computer-score')


const headsBtn = document.querySelector('#heads')
const tailsBtn = document.querySelector('#tails')
const playerSelected = document.querySelector('.player-selected span')
const computerSelected = document.querySelector('.computer-selected span')


headsBtn.addEventListener('click',coinToss)
tailsBtn.addEventListener('click',coinToss)

let ps = 0
let cs = 0

function coinToss(e){
    headsBtn.style.pointerEvents = 'none'
    tailsBtn.style.pointerEvents = 'none'
    coinRes.innerHTML = ''
    pRes.innerHTML = ''
    cRes.innerHTML = ''
    coin.classList.add('tossCoin')
    let flipResult = Math.floor(Math.random()*2)    

    coin.addEventListener('animationend',()=>{
        if(flipResult == 0){
            coin.style.background = 'url("bc.png")'
            coin.style.backgroundSize = 'contain';
        }else{
            coin.style.background = 'url("fc.png")'
            coin.style.backgroundSize = 'contain';
        }
        coin.classList.remove('tossCoin')
        coinRes.innerHTML = (flipResult>0)?'heads':'tails'
        let win = checkWinner(playerBet,computerBet,fr)
        if(win == 1){
            pRes.innerHTML = 'Draw!'
            cRes.innerHTML = 'Draw'
            pRes.style.color = 'blue'
            cRes.style.color = 'blue'
        }else if(win == 2){
            pRes.innerHTML = 'Lose!'
            cRes.innerHTML = 'Winner!'
            pRes.style.color = 'red'
            cRes.style.color = 'green'
        }else{
            pRes.innerHTML = 'Winner!'
            cRes.innerHTML = 'Lose!'
            pRes.style.color = 'green'
            cRes.style.color = 'red'
        }
        headsBtn.style.pointerEvents = ''
        tailsBtn.style.pointerEvents = ''
    })

    let playerBet = e.target.id
    let computerBet = (Math.floor(Math.random()*2)>0)?'heads':'tails'

    let fr = (flipResult>0)?'heads':'tails'
    
    playerSelected.innerHTML = playerBet
    computerSelected.innerHTML = computerBet
    
    let win = checkWinner(playerBet,computerBet,fr)
    
    setTimeout(()=>{
        if(win == 3){
            ps++
            pscore.innerHTML = ps
        }else if(win == 2){
            cs++
            cscore.innerHTML = cs;
        }
    },3000)
    
    
    
    
}

function checkWinner(p,c,r){
    if(r !== p && r !== c){
        return 1
        // pRes.innerHTML = 'DRAW'
        // cRes.innerHTML = 'DRAW'
    }
    if(r == c && r == p){
        return 1
        // pRes.innerHTML = 'DRAW'
        // cRes.innerHTML = 'DRAW'
    }
    if(r == c && r !== p){
        return 2
        // cRes.innerHTML = 'WINNER'
        // pRes.innerHTML = 'LOSE'
    }
    if(r !==c && r == p){
        return 3
        // pRes.innerHTML = 'WINNER!'
        // cRes.innerHTML = 'LOSE'
    }
}



