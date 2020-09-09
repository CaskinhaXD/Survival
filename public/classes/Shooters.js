class shooter{
  constructor(x,y,speed,size,image,health,weopon,DFP,score){
    this.pos=createVector(x,y);
    this.speed=speed;
    this.size=size;
    this.image=image;
    this.health=health;
    this.weopon=weopon;
    this.distanceFromPlayer=DFP;
    this.alive=true;
    this.orH=health
    this.score=score
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
  follow(){
    push()
    translate(this.pos.x,this.pos.y)
    let a=atan2(player.pos.y-this.pos.y,player.pos.x-this.pos.x)
    pop()
    let p=createVector(player.pos.x+cos(a)*-this.distanceFromPlayer,player.pos.y+sin(a)*-this.distanceFromPlayer);
    
    let folowVector=p5.Vector.sub(p,this.pos).setMag(this.speed);

    if(dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y)<=70){
      folowVector.mult(10)
    }

    for(let i=0;i<ceil(folowVector.mag());i++){
      if(dist(this.pos.x,this.pos.y,player.pos.x+cos(a)*-this.distanceFromPlayer,player.pos.y+sin(a)*-this.distanceFromPlayer)<=1){
      break;
      }
      let direction=folowVector.copy()
      direction.normalize()
      this.pos.add(direction)

      
    }
  }
   showHealthBar(){
    push()
    if(this.health>=0&&this.health!=this.orH){
      stroke(0)
      strokeWeight(1)
      fill(255)
    rect(this.pos.x-this.orH/4-20,this.pos.y-70,this.health/2,10)
    }
    pop()
  }
  
  
}