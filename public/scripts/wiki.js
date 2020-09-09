let hsbutton=document.getElementById("shbutton")
let content=document.getElementById('content')
let show=true;
hsbutton.addEventListener('click',()=>{
  show=!show;
  if(show){
    hsbutton.textContent='hide'
    content.style['display']='block'
  }else{
    hsbutton.textContent='show'
    content.style['display']='none'
  }
})