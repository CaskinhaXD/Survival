let mode='menu'
let menu=document.getElementById('menu')
let p5canvas;
let progress=0
function preload(){
  idle=loadImage('images/player/playerHP.png')
  enemieTic=loadImage('images/enemies/enemiTic.png')
  pistoleImage=loadImage('images/gunImages/gunPistole.png')
  playerHeart=loadImage('images/decoration/heart.png')
  backgroundImage=loadImage('images/decoration/background.png')
  playerHitten=loadImage('images/player/playerHitten.png')
  miniGunImg=loadImage('images/gunImages/gunMiniGun.png')
  heavySniperimg=loadImage('images/gunImages/gunSniper.png')
  pistolIcon=loadImage('images/gunIcons/pistolIcon.png')
  miniGunIcon=loadImage('images/gunIcons/miniGunIcon.png')
  heavySniperIcon=loadImage('images/gunIcons/heavySniperIcon.png')
  gunShotGun=loadImage('images/gunImages/gunShootGun.png')
  shotGunIcon=loadImage('images/gunIcons/shotGunIcon.png')
  gunBow=loadImage('images/gunImages/gunBow.png')
  bowIcon=loadImage('images/gunIcons/bowIcon.png')
  gunBowShooting=loadImage('images/gunImages/gunBowShooting.png')
  gunGLShooting=loadImage('images/gunImages/gunGLshooting.png')
  gunGrenadLancher=loadImage('images/gunImages/gunGrenadLancher.png')
  grenadLancherIcon=loadImage('images/gunIcons/grenadLancherIcon.png')
  enemieSpeedyImage=loadImage('images/enemies/ingenmiSpeedy.png')
  enemiePerson=loadImage('images/enemies/enemiePerson.png')
  enemiPersonHappy=loadImage('images/enemies/enemiPersonHappy.png')
  enemieSniper=loadImage('images/enemies/enemieSniper.png')
}
let  miniGuncard=document.getElementById('miniGun-card')
let  heavySnipercard=document.getElementById('sniper-card')
let  bombcard=document.getElementById('bomb-card')
let  bowcard=document.getElementById('bow-card')
let  grenadLanchercard=document.getElementById('grenad-card')

let cards=document.querySelectorAll('.gun-card')


function setup(){
  createCanvas(windowWidth,windowHeight)
  decScreen=createGraphics(width,height)
  player=new play(width/2,height/2,100,10,idle,0)
  createWeopons()
  if(!localStorage.getItem('highScore')){
    localStorage.setItem('highScore',0)
  }
  let hertg=localStorage.getItem('highScore')
  player.weapons.push(pistol)
  if(hertg>=20){
    player.weapons.push(miniGun)
  }
  if(hertg>=40){
    player.weapons.push(heavySniper)
  }
  if(hertg>=60){
    player.weapons.push(bomb)
  }
  if(hertg>=100){
    player.weapons.push(bow)
  }
  if(hertg>=150){
    player.weapons.push(grenadLancher)
  }
  p5canvas=document.querySelector('#defaultCanvas0')
  let p=document.getElementById('high-score')
    p.textContent='high Score: '+player.highScore
}
let x=100
let firstTime=true
function draw(){
  frameRate(30)
  Gtime=frameCount-time;
  switch (mode){
    case 'playing':
    
    if(player.health>100){
      gameOver('t')
    }
    firstTime=true
    makeCardsInvisible()
    
    p5canvas.style['display']='block'
    menu.style['display']='none'
    document.querySelector('body').style['background-image']='none'

    createEnemies()
    drawBG()
    unlockNewWeapons()
    
    updateArrays()
    fill(255)
    noStroke()
    textSize(50)
    text(player.score,width/2,40)
    break;

  case 'menu':
    firstTime=true
    makeCardsInvisible()
    p5canvas.style['display']='none'
    menu.style['display']='block'
    let elements=document.querySelectorAll('.menuElement')
    for(let i=0;i<elements.length;i++){
      elements[i].style['display']='block'
    }
    
    break;

  case 'unlocking-miniGun':
    addBlackBg()
    miniGuncard.style['display']='block'
    break;

  case 'unlocking-heavySniper':
    addBlackBg()
    heavySnipercard.style['display']='block'
    break;

  case 'unlocking-bomb':
    addBlackBg()
    bombcard.style['display']='block'
    break;

  case 'unlocking-bow':
    addBlackBg()
    bowcard.style['display']='block'
    break;

  case 'unlocking-grenadLancher':
    addBlackBg()
    grenadLanchercard.style['display']='block'
    break;

  }
}


function makeCardsInvisible(){
  for(let i=0;i<cards.length;i++){
    cards[i].style['display']='none'
  }
}
function addBlackBg(){
  if(firstTime){
    background(0,160)
    firstTime=false
  }
}
