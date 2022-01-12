import { useState, useEffect } from "react";
import DropdownInput from "react";
import Board from "./board.component";


function Game() {
    const [rows, setRows] = useState(3)
    const [matrix, setMatrix] = useState(Array.from(Array(rows), () => new Array(rows).fill(null)))
    const [isXNext, setIsXNext] = useState(true)
    const [winner, setWinner] = useState("")
    const [play , setPlay] = useState(true);
    const [history, setHistory] = useState([])
    const [stepNumber, setStepNumber] = useState(0);
    const [matMove, setMatMove] = useState(0);
    const [xColor, setXColor] = useState('#000000');
    const [oColor, setOColor] = useState('#000000');


    useEffect(() => {
        setMatrix(Array.from(Array(rows), () => new Array(rows).fill(null)))
        matrixSetup()
    }, [rows])


    const calculateWinner = (rowIndex, colIndex) => {
      let check = matrix[rowIndex][colIndex]
      let row = false, col = false, diagonal = false;

      for(let i = 0; i<rows; ++i){
        if(matrix[rowIndex][i] !== check)
          break;
        if(i==rows-1){
          row = true;
        }
      }

      for(let i = 0; i<rows; ++i){
        if(matrix[i][colIndex] !== check)
          break;
        if(i==rows-1){
          col = true;
        }
      }

      if(rowIndex===colIndex){
        for(let i=0, j=0; i<rows && j<rows; ++i, ++j){
          if(matrix[i][j]!==check)
            break;
          if(i==rows-1 && j==rows-1)
            diagonal = true;
        }
      }

      for(let i=rows-1, j=0;  i>=0 && j<rows; --i, ++j){

        if(matrix[i][j]!==check)
          break;
        if(i==0 && j==rows-1)
          diagonal = true;
      }


      

      if( (row || col) || diagonal){
        setWinner(`<h1>Winner is ${check}<h1>`)
        setPlay(false);
      }
    }








    const handleChange = (e) =>{

        setRows(Number(e.target.value))
        setIsXNext(true)
        setPlay(true)
        setWinner("")
        setHistory([])
    }



    const matrixSetup = () =>{

      const newMatrix = []
      matrix.map( (x) => {
          newMatrix.push(x.slice())
      })


      history.push(newMatrix)
    } 




    const handleClick = (rowIndex, i) =>{

        if(matMove < history.length){
          while(matMove < history.length){
            history.pop()
          }

          matrixSetup()
        }

        

        if(play && !matrix[rowIndex][i]){
          if(isXNext){
            matrix[rowIndex][i]="X"
            setIsXNext(false)
          }
            
          else{
            matrix[rowIndex][i]="O"
            setIsXNext(true);
          }
  
          calculateWinner(rowIndex, i);

          matrixSetup()

          setMatMove(matMove+1)
          setStepNumber(history.length)
          
        }

    }

    const jumpTo = (step, move) =>{

      setMatrix(step)
      setMatMove(move)

      if(move%2 !==0){
        setIsXNext(false)
      }
      else{
        setIsXNext(true)
      }
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      return (
        <li key={move}>
          <button 
            onClick={() => jumpTo(step, move)}
          >{desc}</button>
        </li>
      );
    });

    const handleColorChange = e =>{
      
      if(e.target.name==="x")
        setXColor(e.target.value);
      else
        setOColor(e.target.value)
    }

    
    return (
        <div className="game">

          <div className="color">
            <label>X</label>
            <input
              type="color"
              value={xColor}
              name="x"
              onChange={ e => handleColorChange(e)}
            />

            <label>O</label>
            <input
              type="color"
              value={oColor}
              name="o"
              onChange={ e => handleColorChange(e)}
            />
          </div>



          <div>
            <h1>{isXNext ? "X": "O"}</h1>
          </div>
          
          <div>
              <input 
                list="matrix-size"  
                onChange={handleChange}
                placeholder="Enter matrix size"
              />

              <datalist id="matrix-size">
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="21">21</option>
              </datalist>

            </div>

          <div className="game-board">
            <Board 
                squares={matrix}
                rows={rows}
                onClick={handleClick}
                xColor={xColor}
                oColor={oColor}
            />

            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>

          <h1>{winner}</h1>
        </div>
      );
}

export default Game;