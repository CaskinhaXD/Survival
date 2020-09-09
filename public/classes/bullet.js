class bullet{
  constructor(x,y,angle,speed,damage,length,size,distTotravel,type,col,shooter){
    this.pos=createVector(x,y);
    this.angle=angle;
    this.damage=damage;
    this.speed=speed;
    this.exist=true;
    this.length=length;
    this.size=size;
    this.distTotravel=distTotravel;
    this.distTraveled=0;
    this.type=type;
    this.area=100;
    this.col=col;
    this.firstTime=true;
    this.shooter=shooter;
  }
  shoot(enemie){
    let vector=createVector(cos(this.angle),sin(this.angle)).setMag(this.speed);
    let d=vector.copy()
    d.normalize()
    for(let i=0;i<vector.mag();i++){
      this.distTraveled++
      this.pos.add(d)
      this.check(enemie)
    }

  }
  show(){
    push()
    stroke(this.col[0],this.col[1],this.col[2])
    strokeWeight(this.size)
    line(this.pos.x,this.pos.y,this.pos.x+cos(this.angle)*this.length,this.pos.y+sin(this.angle)*this.length)
    pop()
  }
  check(enemies){
    let dissss=200
    if(this.pos.x>width+dissss||this.pos.x<-dissss||this.pos.y<60||this.pos.y>height+dissss){
      this.stop()
    }
    if(this.type=='normal'){
      for(let i=0;i<enemies.length;i++){
        if(dist(enemies[i].pos.x,enemies[i].pos.y,this.pos.x,this.pos.y)<=enemies[i].size){
          if(this.exist&& enemies[i].health>=0){
          enemies[i].health-=this.damage
          if(enemies[i]==player){
            player.image=playerHitten;
            player.angle=-PI/12
            
            setTimeout(()=>{
              player.image=idle
              player.angle=0
            },80)
          }
          this.stop()

          }
        }
      }
    }else if(this.type=='explosiveGL'){
      for(let i=0;i<enemies.length;i++){
        if(dist(enemies[i].pos.x,enemies[i].pos.y,this.pos.x,this.pos.y)<=enemies[i].size){
          for(let i=0;i<enemies.length;i++){
            if(dist(enemies[i].pos.x,enemies[i].pos.y,this.pos.x,this.pos.y)<=enemies[i].size+this.area/2){
              if(!enemies[i].justGetHitten && enemies[i].health>=0){
                enemies[i].health-=this.damage;
                this.stop()
                enemies[i].justGetHitten=true;
              }
            }
          }
          break;
        }
      }
    }
    if(this.distTraveled>=this.distTotravel){
      //print('rr')
      this.stop();
    }
  }
  stop(){
    if(this.type=='explosiveGL'){
      if(this.firstTime){
        this.firstTime=false
        push()
        decScreen.stroke(255,0,0,100)
        decScreen.fill(255,200,200,100)
        decScreen.ellipse(this.pos.x,this.pos.y,this.area)
        pop()
      } 
    }
    this.exist=false
  }
}