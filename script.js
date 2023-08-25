let mouseIsDown = false;
let selectedColor = 'green';
const MAX_GRID_SIZE = 100;
const GRID_RELATIVE_SIZE = 90; //Size of sketch-board relative to screen (actually size of each individual cell in the grid)
const root = document.querySelector(':root');
let gridSize = 16;
document.addEventListener('mouseup',()=>mouseIsDown=false)


function fillCellWithColor(cell){
    cell.style.backgroundColor = selectedColor;
 
}
//Disable built-in "Dragging" to the whole grid (the Dragging interrupts our mouseHolding for drawing)
function disableDraggingOnGrid(){
    container.addEventListener('dragstart', event => {
        event.preventDefault();
      });
      
    container.addEventListener('drop', event => {
    event.preventDefault();
    });    
}

const container = document.querySelector('.container');
const gridSizeBtn = document.querySelector('.gridSizeBtn');
const cleanBtn = document.querySelector('.cleanBtn');
disableDraggingOnGrid();

function initializeGrid(gridSize){
    for(let i=0; i<gridSize; i++){
        const col = document.createElement('div');
        col.classList.add('col');
        for(let j=0; j<gridSize; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `calc(${GRID_RELATIVE_SIZE}vh/${gridSize})`;
            cell.style.height = `calc(${GRID_RELATIVE_SIZE}vh/${gridSize})`;
            cell.addEventListener('mouseover', ()=> {
                cell.classList.add('hovered');    
                root.style.setProperty('--hover-background-color', selectedColor);            
                if(mouseIsDown){
                    fillCellWithColor(cell); 
                }
            });
            cell.addEventListener('mouseout', ()=> cell.classList.remove('hovered'));
            cell.addEventListener('mousedown',(e)=>{   
                if (e.button === 0) { //left mouse click
                    mouseIsDown=true;
                    fillCellWithColor(cell);              
                }
            })
            col.appendChild(cell);
        }
        container.appendChild(col);
    }
}

function deleteGridCells() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function validGridSize(gridSize) {
   if(!isNaN(gridSize) && gridSize > 0 && gridSize <= MAX_GRID_SIZE){
        return true;
   }
   return false;
}


function cleanGrid(){
    if (!confirm("Are you sure you want to clear the grid?")) {
        return;
    }
    
    document.querySelectorAll('.cell').forEach((cell)=>{
        cell.style.removeProperty("background-color");
    })
}


gridSizeBtn.addEventListener("click",()=>{
    let gridSize = prompt("Select Grid Size (MAX:100)");
    if (validGridSize(gridSize)) {
        deleteGridCells(); 
        initializeGrid(gridSize);
    }else{
        alert("Invalid Grid Size!");
    }
})


cleanBtn.addEventListener("click",cleanGrid )

initializeGrid(gridSize);
