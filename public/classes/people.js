class person extends enemie{
  constructor(x,y,damage,speed,size,image,health,hts,si,score){
    super(x,y,damage,speed,size,image,health,hts)
    this.isDone=false;
    this.secondImage=si
    this.score=score
  }
  follow(player){
    if(!this.isDone){
      super.follow(player)
    }else{
      this.pos.x+=cos(this.a)*this.speed
      this.pos.y+=sin(this.a)*this.speed
    }
  }
  show(){
    push()
    imageMode(CENTER)
    if(this.health<=0){
      this.alive=false
    }
    translate(this.pos.x,this.pos.y)
    if(!this.isDone){
      this.a=atan2(player.pos.y-this.pos.y,player.pos.x-this.pos.x)
    }
    
    rotate(this.a-PI/2)
    if(this.isDone){
      this.image=this.secondImage
      let px=this.pos.x
      let py=this.pos.y
      if(px<-100||px>width+100||py<-100||py>height+100){
        this.alive=false
      }
    }
    image(this.image,0,0,this.size*this.image.width/this.image.height,this.size)
    pop()
  }
  attack(Hitten,idle){
    if(dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y)<=75){
      if(!this.isDone){
        player.health-=this.damage;
        player.image=Hitten;
        player.angle=-PI/12
        player.score-=3
        this.isDone=true;
        this.a+=PI
        
        setTimeout(()=>{
          player.image=idle
          player.angle=0
        },80)
      }
    }
  }
}