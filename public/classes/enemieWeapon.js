class enemieWeapon{
  constructor(dps,bs,bSize,bLength,shootingRate,image,size,distance,force,accuracy,distTotravel,col){
    this.pos=createVector()
    this.damage=dps
    this.bulletSpeed=bs
    this.bulletSize=bSize
    this.bulletLength=bLength
    this.shootingRate=shootingRate
    this.image=image
    this.size=size
    this.distance=distance
    this.backForce=force
    this.accuracy=accuracy
    this.distToTravel=distTotravel
    this.col=col
    this.orDis=distance
  }
  show(enemie){
    push()
    if(this.dis<= this.orDis){
      this.dis++
    }
    
    let a=atan2(player.pos.y-enemie.pos.y,player.pos.x-enemie.pos.x)
    this.pos.x=enemie.pos.x+cos(a)*this.distance
    this.pos.y=enemie.pos.y+sin(a)*this.distance
    translate(this.pos.x,this.pos.y)
    
    rotate(a-PI/2)
    imageMode(CENTER)
    image(this.image,0,0,this.size,this.size*this.image.height/this.image.width)
    pop()

  }

  shoot(enemie){
    if(!this.isJustShooted){
      this.distance=this.orDis
      this.distance-=this.backForce
      
      push()
        let a=atan2(player.pos.y-enemie.pos.y,player.pos.x-enemie.pos.x)+random(-this.accuracy,this.accuracy)
      pop()
      let d=dist(this.pos.x,this.pos.y,enemie.pos.x,enemie.pos.y)
      let bulletX=enemie.pos.x+cos(a)*(this.distance/2+d-8);
      let bulletY=enemie.pos.y+sin(a)*(this.distance/2+d-8);

      bullets.push(new bullet(bulletX,bulletY,a,this.bulletSpeed,this.damage,this.bulletLength,this.bulletSize,this.distToTravel,'normal',this.col,[[player]]));
        
      this.isJustShooted=true;

    setTimeout(()=>{
      this.isJustShooted=false;
    },this.shootingRate)
    }
  }
}