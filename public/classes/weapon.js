class weapon{
  constructor(dps,bs,bSize,bLength,shootingRate,image,size,distance,force,accuracy,type,icon,distTotravel,numberOfBullet,isShootGun,ShootsAngle,col){
    this.pos=createVector();
    this.dps=dps;
    this.shootingRate=shootingRate;
    this.image=image;
    this.dis=distance;
    this.size=size;
    this.orDis=distance;
    this.backForce=force;
    this.accuracy=accuracy;
    this.type=type;
    this.icon=icon;
    this.bulletSpeed=bs
    this.bSize=bSize
    this.bLength=bLength
    this.isJustShooted=false
    this.distTotravel=distTotravel
    this.numberOfBullet=numberOfBullet
    this.isShootGun=isShootGun
    this.shootsAngle=ShootsAngle
    this.APS=ShootsAngle/numberOfBullet
    this.col=col
  }
  show(player){
    push()
    if(this.dis<= this.orDis){
      this.dis++
    }
    
    let a=atan2(mouseY-player.pos.y,mouseX-player.pos.x)
    this.pos.x=player.pos.x+cos(a)*this.dis
    this.pos.y=player.pos.y+sin(a)*this.dis
    translate(this.pos.x,this.pos.y)
    
    rotate(a-PI/2)
    imageMode(CENTER)
    image(this.image,0,0,this.size,this.size*this.image.height/this.image.width)
    pop()
  }
  shoot(){
    if(!this.isJustShooted){
      this.dis=this.orDis
      this.dis-=this.backForce
      let a;
      push()
        translate(player.pos.x,player.pos.y)
        a=atan2(mouseY-player.pos.y,mouseX-player.pos.x)+random(-this.accuracy,this.accuracy)
      pop()
      let d=dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y)
      let bulletX=player.pos.x+cos(a)*(this.dis/2+d-8);
      let bulletY=player.pos.y+sin(a)*(this.dis/2+d-8);
      if(this.isShootGun=='gun'||(this.isShootGun!='shotGun'&&this.isShootGun!='explosiveGL')){
        bullets.push(new bullet(bulletX,bulletY,a,this.bulletSpeed,this.dps,this.bLength,this.bSize,this.distTotravel,'normal',this.col,[enemies,shooters]));
        
        if(this.isShootGun=='gunButChangingBow'){
          this.oldImage=this.image;
          this.image=gunBowShooting
        }
      }else if(this.isShootGun=='shotGun'){
        for(let i=0;i<this.numberOfBullet;i++){
          let newA=a
          newA-=this.shootsAngle/2
          newA+=i*this.APS

          bullets.push(new bullet(bulletX,bulletY,newA,this.bulletSpeed,this.dps,this.bLength,this.bSize,this.distTotravel,'normal',this.col,[enemies,shooters]));
        }
        }else if(this.isShootGun=='explosiveGL'){
          bullets.push(new bullet(bulletX,bulletY,a,this.bulletSpeed,this.dps,this.bLength,this.bSize,this.distTotravel,'explosiveGL',this.col,[enemies,shooters]));
          
          this.oldImage=this.image;
          this.image=gunGLShooting;
        



      }
      this.isJustShooted=true;

    setTimeout(()=>{
      this.isJustShooted=false;
      if(this.isShootGun=='gunButChangingBow'||this.isShootGun=='explosiveGL'){
      this.image=this.oldImage
      }
    },this.shootingRate)
    }
}
   
  
}