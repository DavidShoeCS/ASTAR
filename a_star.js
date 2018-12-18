

function removeFromArray(arr, elt){
  for(var i = arr.length-1; i >=0; i--){
    if(arr[i] == elt){
      arr.splice(i,1); 
    }
  }
}

function hueristic(a,b){
  return Math.sqrt(Math.pow(a.i-b.i, 2) + Math.pow(a.j-b.j, 2))
}

//my global variables
var cols = 30;
var rows = 30;
var grid = new Array(rows);

var openSet = [];
var closedSet = [];
var start;
var end;
var w;
var h;
var path = [];
var lastCheckedNode=start;
//var noSolution = false;

function Spot(i,j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;


  if(random(1) < 0.3){
    if (!(this.i === rows-1 && this.j === cols-1))
      this.wall = true;
  }

  this.show = function(col){
    fill(col);
    stroke(0);
    rect(this.i*w,this.j*h, w-1, h-1);
  }

  this.isValid = function(row, col, grid){
    return (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col].wall);
  }
  
  this.addNeighbors = function(grid){
    var row = this.i;
    var col = this.j;
    for (var r = row-1; r <= row+1; r++){
      for (var c = col-1; c <= col+1; c++){
        if (r === row && c === col){
          continue;
        }
        if (this.isValid(r,c,grid)){
          this.neighbors.push(grid[r][c]);
        }
      }
    }
  }
}

function setup(){
  createCanvas(600,600);
  console.log("A*");

  w = width / cols;
  h = height / rows;


  for(var r = 0; r < rows; r++){
    grid[r] = new Array(cols);
  }

  for(var r = 0; r < rows; r++){
    for(var c = 0; c < cols; c++){
      grid[r][c] = new Spot(r,c);
    }
  }


  for(var r = 0; r < rows; r++){
    for(var c = 0; c < cols; c++){
      grid[r][c].addNeighbors(grid);
    }
  }

//-------------------start spot---------------------
  start = grid[0][0];
  start.wall = false;
  //----------------End spot-------------------------
  end = grid[rows-1][cols-1];
  
  end.wall = false;
  //-------------------------------------------------

  openSet.push(start);

  console.log("grid", grid);


}


function draw(){

  if(openSet.length > 0){
    //we can keep going!
    
    var winner = [0];
    for( var i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[winner[0]].f){
        winner[0] = i;
      }
      
    }
    var current = openSet[winner[0]];
    
    if(current === end){
     noLoop();
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


    for(var i = 0; i < rows; i++){
      for(var j = 0; j < cols; j++){
        if (grid[i][j].wall){
          grid[i][j].show(color(0));
        }else{
          grid[i][j].show(color(255));
        }
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


      end.show(color(255,0,255));
       
  //path is blue
    for(var i = 0; i < path.length; i++){
      path[i].show(color(0,0,255));
    }


}