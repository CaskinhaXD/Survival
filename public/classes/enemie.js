class enemie{
  constructor(x,y,damage,speed,size,image,health,hts,score){
    this.pos=createVector(x,y);
    this.vel=createVector();
    this.damage=damage;
    this.speed=speed;
    this.size=size;
    this.image=image;
    this.health=health;
    this.orH=health;
    this.alive=true;
    this.hittingSpeed=hts;
    this.justAttacked=false;
    this.justGetHitten=false;
    this.score=score
  }
  follow(player){
    push()
    translate(this.pos.x,this.pos.y)
    let a=atan2(player.pos.y-this.pos.y,player.pos.x-this.pos.x)
    pop()
    let p=createVector(player.pos.x+cos(a)*-70,player.pos.y+sin(a)*-70);
    
    let folowVector=p5.Vector.sub(p,this.pos).setMag(this.speed);

    if(dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y)<=70){
      folowVector.mult(10)
    }

    for(let i=0;i<ceil(folowVector.mag());i++){
      if(dist(this.pos.x,this.pos.y,player.pos.x+cos(a)*-70,player.pos.y+sin(a)*-70)<=1){
      break;
      }
      let direction=folowVector.copy()
      direction.normalize()
      this.pos.add(direction)

      
    }
  }
  show(){
    push()
    imageMode(CENTER)
    if(this.health<=0){
      this.alive=false
    }
    translate(this.pos.x,this.pos.y)
    let a=atan2(player.pos.y-this.pos.y,player.pos.x-this.pos.x)
    
    rotate(a-PI/2)

    image(this.image,0,0,this.size*this.image.width/this.image.height,this.size)
    pop()
  }
  attack(Hitten,idle){
    if(dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y)<=75){
      if(!this.justAttacked){
        player.health-=this.damage;
        player.image=Hitten;
        player.angle=-PI/12
        this.justAttacked=true;
        setTimeout(()=>{
          this.justAttacked=false
        },this.hittingSpeed)
        setTimeout(()=>{
          player.image=idle
          player.angle=0
        },80)
      }
    }
  }
  showHealthBar(){
    push()
    if(this.health>=0){
      stroke(0)
      fill(255)
    rect(this.pos.x-this.orH/4,this.pos.y-70,this.health/2,10)
    }
    pop()
  }
}