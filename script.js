function fillCellWithColor(){
    
}

const container = document.querySelector('.container');
for(let i=0; i<16; i++){
    const col = document.createElement('div');
    col.classList.add('col');
    for(let j=0; j<16; j++){
        cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click',fillCellWithColor)
        col.appendChild(cell);
    }
    container.appendChild(col);
}