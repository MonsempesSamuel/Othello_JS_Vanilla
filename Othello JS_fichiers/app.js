let bouton=document.getElementById('bouton');
let select=document.getElementById('color');
let player=document.getElementById('player');
let current=document.getElementById('current-player');
let plateau=document.getElementById('game-board');
let bool=false;
let nb=0;
let joueur=3;
let joueur_couleur="";
let tour=0
let score_joueur=2;
let score_bot=2;
let matricecalculbot=[
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,1,0,2,2,2],
  [2,2,2,0,1,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2]
];
let matrice=[
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,1,0,2,2,2],
  [2,2,2,0,1,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2]
];
let matricecalcul=[
  [500,-150,30,10,10,30,-150,500],
  [-150,-250,0,0,0,0,-250,-150],
  [30,0,1,2,2,1,0,30],
  [10,0,2,16,16,2,0,10],
  [10,0,2,16,16,2,0,10],
  [30,0,1,2,2,1,0,30],
  [-150,-250,0,0,0,0,-250,-150],
  [500,-150,30,10,10,30,-150,500]
];
bouton.addEventListener("click",jouer);

function jouer(){
  bouton.style.display = 'none';
  select.style.display = 'none';
  joueur=parseInt(select.value,10);
  joueur_couleur=(joueur)?"white":"black";
  player.innerHTML = (joueur)?'Vous (Blanc) : <span id="joueur">2</span> <br/>Bot (Noir) : <span id="bot">2</span>':
  'Vous (Noir) : <span id="joueur">2</span> <br/>Bot (Blanc) : <span id="bot">2</span>';
  current.style.display = 'block';

  document.getElementById('bouton2').style.display="inline";
  init_tour();
}

function init_tour(){


  nb++;
  document.getElementById('joueur').innerHTML=score_joueur;
  document.getElementById('bot').innerHTML=score_bot;
  joueur_couleur=(joueur)?"white":"black";
  let table=""
  bool=false
  table="<table>"
  matrice.map((l,x)=>{
    table+="<tr>"
    l.map((c,y)=>{
      if(matrice[x][y]!==0&&matrice[x][y]!==1)matrice[x][y]=2;
      if(refresh(x,y))bool=true;
      let pion=(c===2||Array.isArray(c))?"empty":(c===0)?"black":"white";
      let fonction="";
      if(joueur===tour){
        pion=(Array.isArray(matrice[x][y]))?joueur_couleur+" attackable":pion;
        if(Array.isArray(matrice[x][y]))fonction="onclick=joue("+x+","+y+")"
      }
      table+=`<td class="cell `+pion+` "`+fonction+`><span class="disc"></span></td>`
    })
    table+="</tr>"
  })
  table+="</table>"
  plateau.innerHTML=table
  if(bool){
    if(tour!==joueur)bot();
  }else {
    tour=(tour)?0:1;
    if((score_joueur+score_bot)<64&&nb<100)init_tour();
  }
}


function refresh(x,y){
  let tab=[];
  let aux=[];
  let i;
  let j;
  if(matrice[x][y]!==1&&matrice[x][y]!==0)
  {
    i=x-1;
    j=y;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      i--;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    i=x+1;
    j=y;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      i++;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    i=x;
    j=y-1;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      j--;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    i=x;
    j=y+1;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      j++;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    i=x+1;
    j=y+1;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      i++;
      j++;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    i=x-1;
    j=y-1;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      i--;
      j--;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    i=x+1;
    j=y-1;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      i++;
      j--;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    i=x-1;
    j=y+1;
    aux=[];
    while(matrice[i]!==undefined&&matrice[i][j]!==undefined&&matrice[i][j]!==tour&&matrice[i][j]!==2&&!Array.isArray(matrice[i][j])){
      aux.push([i,j]);
      i--;
      j++;
    }
    if(matrice[i]!==undefined&&matrice[i][j]===tour)tab=[...tab, ...aux];
    if (tab.length) matrice[x][y]=tab;
  }


  return tab.length;
}

function joue(x, y){
  matrice[x][y].map(cell=>{matrice[cell[0]][cell[1]]=tour});
  if(tour===joueur){
    score_joueur=score_joueur+matrice[x][y].length+1
    score_bot=score_bot-matrice[x][y].length
  }
  else {
    score_joueur=score_joueur-matrice[x][y].length
    score_bot=score_bot+matrice[x][y].length+1
  }
  matrice[x][y]=tour;
  tour=(tour)?0:1;

  init_tour()
}

function bot(){
  let max=0;
  let xmax=0;
  let ymax=0;
  let coordAEviter=[[0, 1], [0, 6],
  [1, 0], [1, 1], [1, 6], [1, 7],
  [6, 0], [6, 1], [6, 6], [6, 7],
  [7, 1], [7, 6]];
  if (true||(score_joueur+score_bot)<50){
    matrice.map((l,i)=>l.map((c,j)=>{
      if(Array.isArray(c)&&c.length>max&&!coordAEviter.find( ([x, y]) => x === i && y === j)){
        max=c.length
        xmax=i;
        ymax=j
      }
    }
  ))
  if(max===0){matrice.map((l,i)=>l.map((c,j)=>{
    if(Array.isArray(c)&&c.length>max){
      max=c.length
      xmax=i;
      ymax=j;
    }
  }
))}
}
else{
  calculfin(matrice);
}
joue(xmax,ymax)
}

function calculbot(){
  let totalcalcul = 0;
  matrice.map((l,i)=>l.map((c,j)=>{
    if(Array.isArray(c)){
      totalcalcul+=matricecalcul[i][j];
    }
  }
));
return totalcalcul;
}

function calculfin(m){
  let comptscorebot = 0;
  let comptscorejoueur = 0;
  m.map((l,i)=>l.map((c,j)=>{
    if(c=="c")"test"
  }
))
}

function refresh2(x,y,m,tour2){
  let tab=[];
  let aux=[];
  let i;
  let j;
  if(m[x][y]!==1&&m[x][y]!==0)
  {
    i=x-1;
    j=y;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      i--;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    i=x+1;
    j=y;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      i++;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    i=x;
    j=y-1;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      j--;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    i=x;
    j=y+1;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      j++;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    i=x+1;
    j=y+1;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      i++;
      j++;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    i=x-1;
    j=y-1;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      i--;
      j--;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    i=x+1;
    j=y-1;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      i++;
      j--;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    i=x-1;
    j=y+1;
    aux=[];
    while(m[i]!==undefined&&m[i][j]!==undefined&&m[i][j]!==tour2&&m[i][j]!==2&&!Array.isArray(m[i][j])){
      aux.push([i,j]);
      i--;
      j++;
    }
    if(m[i]!==undefined&&m[i][j]===tour2)tab=[...tab, ...aux];
    if (tab.length) m[x][y]=tab;
  }


  return tab.length,m;
}
