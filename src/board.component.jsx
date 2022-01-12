import Square from "./square.component";

function Board({squares, onClick, xColor, oColor}) {
  
    function renderSquare(rowIndex, i){

         return (
          
            <Square
              key={rowIndex, i}
              value={squares[rowIndex][i]}
              onClick={() => onClick(rowIndex, i)}
              xColor={xColor}
              oColor={oColor}
            />
          );
    }

    return (
      <div className="board">
        {
          squares.map((rows, rowIndex) => (
            <div key={rowIndex} >
              {
                  rows.map( (square, index) => renderSquare(rowIndex, index))
              }
            </div>
           
          ))
        }
      </div>
    );
}

export default Board;
