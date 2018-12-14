

function removeFromArray(arr, elt){
  for(var i = arr.length-1; i >=0; i--){
    if(arr[i] == elt){
      arr.splice(i,1); 
    }
  }
}


function hueristic(a,b){
  //var d = abs(a.i - b.i) + abs(a.j - b.j);
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

//my global variables
var cols = 25;
var rows = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w;
var h;
var path = [];

function Spot(i,j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;


  if(random(1) < 0.1){
    this.wall = true;
  }

  this.show = function(col){
    fill(col);
    stroke(0);
    rect(this.i*w,this.j*h, w-1, h-1);
  }
  
  this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
    if(i < cols - 1){
      this.neighbors.push(grid[i+1][j]);
    }
    if(i > 0){
      this.neighbors.push(grid[i-1][j]);
    }
    if(j < rows-1){
      this.neighbors.push(grid[i][j+1]);
    }
    if(j > 0){
      this.neighbors.push(grid[i][j-1]);
    }
  }
  
  
  
  
  
}

function setup(){
  createCanvas(400,400);
  console.log("A*");

  w = width / cols;
  h = height / rows;


  for(var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
  }

  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j] = new Spot(i,j);
    }
  }
  
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j].addNeighbors(grid);
    }
  }

//-------------------start spot---------------------
  start = grid[0][0];
  //----------------End spot-------------------------
  end = grid[cols-1][rows-1];
  //-------------------------------------------------

  openSet.push(start);

  console.log(grid);


}


function draw(){

if(openSet.length > 0){
  //we can keep going!
  
  var winner = 0;
  for( var i = 0; i < this.openSet.length; i++){
    if(this.openSet[i].f < this.openSet[winner].f){
      winnner = i;
    }
    
  }
  
  var current = openSet[winner];
  
  if(current === end){


   noLoop();
   console.log("Done"); 
  }
  
  removeFromArray(openSet, current);
  closedSet.push(current);
  
  var neighbors = current.neighbors;
  for(var i = 0; i < neighbors.length; i++){
    var neighbor = neighbors[i]; 


    if(!closedSet.includes(neighbor)){
      var tempG = current.g+1;  
      
      if(openSet.includes(neighbor)){
        if(tempG < neighbor.g){
          neighbor.g = tempG; 
        }
      }else {
        neighbor.g = tempG;
        openSet.push(neighbor);
        
      }
      
      neighbor.h = hueristic(neighbor,end);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.previous = current;
      
    }
  }
  
  
}else{
  //no solution
}

  background(0);


  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j].show(color(255));
    }
  }

//closed set is red
  for(var i = 0; i < closedSet.length; i++){
    closedSet[i].show(color(255,0,0));

  }

  //open set is green
  for(var i = 0; i < openSet.length; i++){
    openSet[i].show(color(0,255,0));
  }


    //path is found
    path = [];
    var temp = current;
    path.push(temp);

    while(temp.previous){
      path.push(temp.previous);
      temp = temp.previous;
    }

//path is blue
  for(var i = 0; i < path.length; i++){
    path[i].show(color(0,0,255));
  }


}



















