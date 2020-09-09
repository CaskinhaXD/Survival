let spawnRate={
  bg:210,
  sm:200,
  sr:600,
  sn:400,
  ps:300
}
let textF='Arial'
let Gtime=0
let time=0
let shouldWeSpawn={
  bg:true,
  sm:false,
  sr:false,
  sn:false,
  ps:false
}
function restart(){
  player.health=100
  player.hhhhhh=0
  time=frameCount
  enemies=[]
  shooters=[]
  keys=[]
  player.score=0
  bullets=[]
  let people=[];
  spawnRate={
    bg:210,
    sm:200,
    sr:600,
    sn:400,
    ps:300
  }
 shouldWeSpawn={
  bg:true,
  sm:false,
  sr:false,
  sn:false,
  ps:false
}
  player.pos.x=width/2
  player.pos.y=height/2
}
function unlockNewWeapons(){
  if(player.score>=20&&!player.weapons.includes(miniGun)){
    unlockingGun('miniGun')
    player.weapons.push(miniGun)
  }
  if(player.score>=40&&!player.weapons.includes(heavySniper)){
    unlockingGun('heavySniper')
    player.weapons.push(heavySniper)
  }
  if(player.score>=60&&!player.weapons.includes(bomb)){
    unlockingGun('bomb')
    player.weapons.push(bomb)
  }
  if(player.score>=100&&!player.weapons.includes(bow)){
    unlockingGun('bow')
    player.weapons.push(bow)
  }
  if(player.score>=150&&!player.weapons.includes(grenadLancher)){
    unlockingGun('grenadLancher')
    player.weapons.push(grenadLancher)
  }
}
function unlockingGun(gun){
  switch (gun){
    case 'miniGun':
    mode='unlocking-miniGun'
    break;
    case 'heavySniper':
    mode='unlocking-heavySniper'
    break;
    case 'bomb':
    mode='unlocking-bomb'
    break;
    case 'bow':
    mode='unlocking-bow'
    break;
    case 'grenadLancher':
    mode='unlocking-grenadLancher'
    break;
  }
}
function createEnemies(){
  if(Gtime>=1800){
    shouldWeSpawn.sm=true
  }
  if(Gtime>=3600){
    shouldWeSpawn.sr=true
  }
  if(Gtime>=5400){
    shouldWeSpawn.sn=true
  }
  if(Gtime>=7200){
    shouldWeSpawn.ps=true
  }
  if(frameCount%spawnRate.bg==0){
    let edge=100
    let limit=40

    let y1=random(50,height+edge)
    let y2=random(height+limit,height+edge)
    let y;

    let x1=random(-edge,width+edge)
    let x21=random(width+limit,width+edge)
    let x22=random(-edge,-limit)
   
    let x2=random([x21,x22]) 
    let x=random([x1,x2])
    if(x==x1){
      y=y2
    }else{
      y=y1
    }
    createEnemie('bigOne',x,y)
    if(spawnRate.bg>=30){
      spawnRate.bg--
    }
    
  }
  if(frameCount%spawnRate.sm==0 && shouldWeSpawn.sm){
    let edge=100
    let limit=40
    console.log('it worked!!')
    let y1=random(50,height+edge)
    let y2=random(height+limit,height+edge)
    let y;

    let x1=random(-edge,width+edge)
    let x21=random(width+limit,width+edge)
    let x22=random(-edge,-limit)
   
    let x2=random([x21,x22]) 
    let x=random([x1,x2])
    if(x==x1){
      y=y2
    }else{
      y=y1
    }
    createEnemie('speedy',x,y)
    if(spawnRate.sm>=30){
      spawnRate.sm--;
    }
  }
  if(frameCount%spawnRate.sr==0&&shouldWeSpawn.sr){
    let edge=100;
    let limit=40;
    let y1=random(50,height+edge);
    let y2=random(height+limit,height+edge);
    let y;

    let x1=random(-edge,width+edge);
    let x21=random(width+limit,width+edge);
    let x22=random(-edge,-limit);
   
    let x2=random([x21,x22]) 
    let x=random([x1,x2])
    if(x==x1){
      y=y2
    }else{
      y=y1
    }
    createEnemie('survivor',x,y)
    if(spawnRate.sr>=30){
      spawnRate.sr--
    }
  }
  if(frameCount%spawnRate.sn==0&&shouldWeSpawn.sn){
    let edge=100
    let limit=40

    let y1=random(50,height+edge)
    let y2=random(height+limit,height+edge)
    let y;

    let x1=random(-edge,width+edge)
    let x21=random(width+limit,width+edge)
    let x22=random(-edge,-limit)
   
    let x2=random([x21,x22]) 
    let x=random([x1,x2])
    if(x==x1){
      y=y2
    }else{
      y=y1
    }
    createEnemie('sniper',x,y)
    if(spawnRate.sn>=30){
      spawnRate.sn--
    }
  }
  if(frameCount%spawnRate.ps==0&&shouldWeSpawn.ps){
    let edge=100
    let limit=40

    let y1=random(50,height+edge)
    let y2=random(height+limit,height+edge)
    let y;

    let x1=random(-edge,width+edge)
    let x21=random(width+limit,width+edge)
    let x22=random(-edge,-limit)
   
    let x2=random([x21,x22]) 
    let x=random([x1,x2])
    if(x==x1){
      y=y2
    }else{
      y=y1
    }
    createEnemie('pistole',x,y)
    if(spawnRate.ps>=30){
      spawnRate.ps--
    }
  }
}

function drawBG(){
  background(100)
  image(decScreen,0,0)
  decScreen.background(100,200)
}
function updateArrays(){
  let bx=width/2-backgroundImage.width*height/backgroundImage.height/2;
  let by=0;
  image(backgroundImage,bx,by,backgroundImage.width*height/backgroundImage.height,height)

  player.move()
  player.show()
  if(player.health<=0){
    gameOver('f')
  }
  for(let i=0;i<bullets.length;i++){
    for(let j=0;j<bullets[i].shooter.length;j++){
      bullets[i].shoot(bullets[i].shooter[j]);
    }
    bullets[i].show();
    if(!bullets[i].exist){
      bullets.splice(i,1);
      i--;
    }
  }
  for(let i=0;i<enemies.length;i++){
    if(enemies[i].health<enemies[i].orH){
    enemies[i].showHealthBar()
    }
    enemies[i].attack(playerHitten,idle)
    enemies[i].follow(player);
    enemies[i].show();
    enemies[i].justGetHitten=false;
    if(!enemies[i].alive){
      player.score+=enemies[i].score
      player.hhhhhh++
      if(enemies[i] instanceof person && enemies[i].isDone){
        player.score+=3
      }
      enemies.splice(i,1);
      i--;
    }
  }
  for(let i=0;i<shooters.length;i++){
    shooters[i].show(player)
    shooters[i].follow(player)
    shooters[i].weopon.show(shooters[i])
    shooters[i].showHealthBar()
    if(dist(shooters[i].pos.x,shooters[i].pos.y,player.pos.x,player.pos.y)<=shooters[i].distanceFromPlayer+10){
      shooters[i].weopon.shoot(shooters[i])
    }
    if(!shooters[i].alive){
      shooters.splice(i,1)
      i--
    }
  }

  player.weapons[player.index].show(player)
  player.showHealthBar()
  if(mouseIsPressed&&player.weapons[player.index].type=='auto'){
    player.weapons[player.index].shoot()
  }
  player.showWeaponBar()
 
}
function mousePressed () {
  if(mode=='playing'){
    if(player.weapons[player.index].type=='notAuto'){
    player.weapons[player.index].shoot()
    }
  }
}

function createWeopons(){
let col=[255,200,0]
// (dps,bs,bSize,bLength,shootingRate,image,size,distance,force,accuracy,type,icon,distTotravel,numberOfBullet,isShootGun,ShootsAngle,col)
  pistol=new weapon(10,15,4,6,100,pistoleImage,10,60,15,PI/200,'notAuto',pistolIcon,800,1,'gun',0,col)

  miniGun=new weapon(3,16,3,4,30,miniGunImg,55,80,3,PI/50,'auto',miniGunIcon,400,1,'gun',0,col)

  heavySniper=new weapon(300,30,5,10,2000,heavySniperimg,20,80,30,0,'notAuto',heavySniperIcon,3000,1,'gun',0,[255,240,0])

  bomb=new weapon(8,20,3,4,1500,gunShotGun,15,80,20,0,'notAuto',shotGunIcon,400,16,'shotGun',PI/3,col)

  grenadLancher=new weapon(80,8,10,1,2000,gunGrenadLancher,50,80,10,PI/100,'notAuto',grenadLancherIcon,300,1,'explosiveGL',0,[10,10,10])

  bow=new weapon(40,25,2,25,500,gunBow,60,70,0,PI/1000,'notAuto',bowIcon,1000,1,'gunButChangingBow',0,[10,10,10])
}
function createEnemie(type,x,y){
  switch (type){
    // x,y,damage,speed,size,image,health,attackingSpeed
    case 'bigOne':
      enemies.push(new enemie(x,y,20,2,70,enemieTic,150,3000,3));
      break;
    case 'speedy':
      enemies.push(new enemie(x,y,3,10,50,enemieSpeedyImage,50,200,2));
      break;
    case 'survivor':
      enemies.push(new person(x,y,20,8,100,enemiePerson,90,200,enemiPersonHappy,1))
      break;
      //x,y,speed,size,image,health,weopon,DFP
    case 'sniper':
    let sniperE=new enemieWeapon(10,15,2,6,2000,heavySniperimg,15,80,15,PI/80,1000,[255,240,0])
      shooters.push(new shooter(x,y,3,70,enemieSniper,60,sniperE,400,5))
      break;
    case 'pistole':
    // (dps,bs,bSize,bLength,shootingRate,image,size,distance,force,accuracy,distTotravel,col)
    let pistoleE=new enemieWeapon(4,12,2,6,500,pistoleImage,10,60,15,PI/100,800,[255,200,0])
      shooters.push(new shooter(x,y,6,70,enemieSniper,80,pistoleE,200,5))
      break;
  }
}

function  keyPressed(){
  if(mode=='GameOverScreen'&&keyCode==32){
    mode='menu'
    let p=document.getElementById('high-score')
    p.textContent='high Score: '+player.highScore
  }
}

function gameOver(stuff){
    if(player.score>=player.highScore){
      player.highScore=player.score
    }
    if(player.highScore>=localStorage.getItem('highScore')){
      localStorage.setItem('highScore',player.highScore)
    }
    
    mode='GameOverScreen'
    setTimeout(()=>{
      textFont(textF);
      textAlign(CENTER);
      background(0,0,0,160)
      textSize(100)
      stroke(255,0,0)
      fill(255,0,0)
      text('Game Over',width/2,height/4)
      textSize(20)
      stroke(255)
      fill(255)
      text('press space to continue',width/2,height-20)
      textSize(25)
      fill(255)
      stroke(255)
      text('your score : '+player.score,width/2,height/2-60)
      
      if(player.speed!=10||player.hhhhhh*5<player.score||stuff=='t'){
        textFont(textF);
        fill(255,0,0)
        stroke(255,0,0)
        text('you are a cheater :(',width/2,height/2+60)
        player.highScore=0
      }else if(player.score<=5){
        textFont(textF);
        text('you are a baby ;)',width/2,height/2+60)
      }else if(player.score>5 && player.score<=30){
        textFont(textF);
        text('you are a NOOB :)',width/2,height/2+60)
      }else if(player.score>30 && player.score<=50){
        textFont(textF);
        text('noiiice but try HARDER >:(',width/2,height/2+60)
      }else if(player.score>50 && player.score<=200){
        textFont(textF);
        text('GOOD JOB :D',width/2,height/2+60)
      }else if(player.score>200){
        textFont(textF);
        text('you are a pro player keep it up',width/2,height/2+60)
      }

    },20)
}