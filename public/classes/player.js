let player;
let idle;
let bullets=[];
let enemies=[];
let pistoleImage;
let playerHeart;
let playerHitten;
let pistolIcon;
let miniGunIcon;
let heavySniperIcon;
let gunShotGun;
let shotGunIcon;
let gunGrenadLancher;
let gunBow;
let bowIcon;
let gunBowShooting;
let gunGLShooting;
let decScreen;
let people=[];
let enemiePerson;
let enemiPersonHappy;
let enemieSniper;
let shooters=[];
let shootable=[];
let backgroundImage;



class play{
  constructor(x,y,health,speed,image,index){
    this.pos=createVector(x,y)
    this.vel=createVector(x,y)
    this.acc=createVector(x,y)
    this.health=health
    this.speed=speed
    this.w=178
    this.h=358
    this.size=80
    this.orH=health
    this.image=image;
    this.angle=0
    this.weapons=[]
    this.index=0
    this.score=0
    this.highScore=0
    this.hhhhhh=0
  }
  move(){
    let down=0;
    let up=0
    let right=0;
    let left=0;
    if(keyIsDown(40)||keyIsDown(83)){
      down=1
    }
    if(keyIsDown(39)||keyIsDown(68)){
      right=1
    }
    if(keyIsDown(38)||keyIsDown(87)){
      up=-1
    }
    if(keyIsDown(37)||keyIsDown(65)){
      left=-1
    }

    if(keyIsDown(49)){
      this.index=0;
    }
    if(keyIsDown(50)&&this.weapons.length>=2){
      this.index=1;
    }
    if(keyIsDown(51)&&this.weapons.length>=3){
      this.index=2;
    }
    if(keyIsDown(52)&&this.weapons.length>=4){
      this.index=3;
    }
    if(keyIsDown(53)&&this.weapons.length>=5){
      this.index=4;
    }
    if(keyIsDown(54)&&this.weapons.length>=6){
      this.index=5;
    }
    
    let mX=left+right
    let mY=up+down
    
    let vel=createVector(mX,mY).setMag(this.speed)
    
    this.pos.add(vel)
    while(this.pos.x<=-10){
      this.pos.x++
    }
    while(this.pos.x>=width+10){
      this.pos.x--
    }
    while(this.pos.y<=60){
      this.pos.y++
    }
    while(this.pos.y>=height+10){
      this.pos.y--
    }
    
  }
  
  show(){
    push()
    imageMode(CENTER)
    translate(this.pos.x,this.pos.y)
    let a=atan2(mouseY-this.pos.y,mouseX-this.pos.x)
    rotate(a-PI/2+this.angle)

    image(this.image,0,0,this.size,this.size*160/286)
    pop()
  }
  showHealthBar(){
    push()
    imageMode(CENTER)
    fill(100,0,0)
    stroke(255)
    strokeWeight(2)
    rect(30,25,this.orH,10,3)
    fill(240,0,0)
    if(this.health>=0){
      stroke(255)
    strokeWeight(2)
    rect(30,25,this.health,10)
    }
    image(playerHeart,30,30,30,30)
    pop()

  }
  showWeaponBar(){
    for(let i=0;i<this.weapons.length;i++){
      push()
      stroke(255,150,0)
      fill(150,150,150)
      strokeWeight(4)
      rectMode(CENTER)
      imageMode(CENTER)
      rect(width/2-this.weapons.length*35/2+i*35,height-35,35)
      translate(width/2-this.weapons.length*35/2+i*35,height-35)
      rotate(PI/5)
      image(this.weapons[i].icon,0,0)
      pop()
  }
    let i=this.index
     push()
      stroke(255,100,0)
      fill(150,150,150)
      strokeWeight(4)
      rectMode(CENTER)
      if(this.index==i){
        stroke(255,255,255)
        rect(width/2-this.weapons.length*35/2+i*35,height-35,35)
        imageMode(CENTER)
        translate(width/2-this.weapons.length*35/2+i*35,height-35) 
        rotate(PI/5)
        image(this.weapons[i].icon,0,0)
        
      }
      pop()
  }

}