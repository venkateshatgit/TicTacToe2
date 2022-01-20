import { useSelector } from "react-redux";
import Square from "./components/square.component/square.component";



function Board({squares, onClick}) {
  
    function renderSquare(rowIndex, i){

         return (
          
            <Square
              key={rowIndex, i}
              value={squares[rowIndex][i]}
              onClick={() => onClick(rowIndex, i)}
            />
          );
    }

    const {coloums, rows} = useSelector((state) => state.game)

    return (

      <div 
        className="board" 
      >
        {
          squares.map((rows, rowIndex) => (
            <div 
              className="board-row-div" 
              key={rowIndex} 
              style={{
                gridTemplateColumns : `repeat(${coloums}, 1fr)`, 
                gridTemplateRows: `repeat(${rows}, 1fr)`
              }}
            >
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
