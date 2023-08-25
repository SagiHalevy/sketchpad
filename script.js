let mouseIsDown = false;
let selectedColor = 'green';
const MAX_GRID_SIZE = 100;
const root = document.querySelector(':root');
let gridSize = 20;
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
disableDraggingOnGrid();

function initializeGrid(gridSize){
    for(let i=0; i<gridSize; i++){
        const col = document.createElement('div');
        col.classList.add('col');
        for(let j=0; j<gridSize; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
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

function clearGrid() {
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



gridSizeBtn.addEventListener("click",()=>{
    let gridSize = prompt("Select Grid Size (MAX:100)");
    if (validGridSize(gridSize)) {
        clearGrid(); 
        initializeGrid(gridSize);
    }else{
        alert("Invalid Grid Size!");
    }
})

initializeGrid(gridSize);
