import { useState, useEffect } from "react";
import Board from "./board.component";


function Game() {
    const [rows, setRows] = useState(3)
    const [coloums, setColoums] = useState(3) 
    const [matrix, setMatrix] = useState(Array.from(Array(rows), () => new Array(coloums).fill(null)))
    const [isXNext, setIsXNext] = useState(true)
    const [winner, setWinner] = useState("")
    const [play , setPlay] = useState(true);
    const [history, setHistory] = useState([])
    const [stepNumber, setStepNumber] = useState(0);
    const [matMove, setMatMove] = useState(0);
    const [xColor, setXColor] = useState('#000000');
    const [oColor, setOColor] = useState('#000000');
  


    useEffect(() => {
        setMatrix(Array.from(Array(rows), () => new Array(coloums).fill(null)))
        setHistory([Array.from(Array(rows), () => new Array(coloums).fill(null))])
        matrixSetup()
        
    }, [rows, coloums])


    const calculateWinner = (rowIndex, colIndex) => {
      let check = matrix[rowIndex][colIndex]
      let row = false, col = false, diagonal = false;
      
      //row check, changing columns
      for(let i = 0; i<coloums; ++i){
        if(matrix[rowIndex][i] !== check)
          break;
        if(i==rows-1){
          row = true;
        }
      }

      //column check, chaning row
      for(let i = 0; i<rows; ++i){
        if(matrix[i][colIndex] !== check)
          break;
        if(i==rows-1){
          col = true;
        }
      }

      //diagonal check from 0,0 to n,n
      if(rowIndex===colIndex){
        for(let i=0, j=0; i<rows && j<coloums; ++i, ++j){
          if(matrix[i][j]!==check)
            break;
          if(i==rows-1 && j==coloums-1)
            diagonal = true;
        }
      }

      //diagonal check from n,0 to 0,n
      for(let i=rows-1, j=0;  i>=0 && j<coloums; --i, ++j){

        if(matrix[i][j]!==check)
          break;
        if(i==0 && j==rows-1)
          diagonal = true;
      }


      
      //deciding winner
      if( (row || col) || diagonal){
        setWinner(`<h1>Winner is ${check}<h1>`)
        setPlay(false);
      }
    }







    //changing matrix size
    const handleChange = (e) =>{

        console.log(history)

        let change = e.target.value;
        if(change < 3)
          change=3;


        if(e.target.name === "row")
          setRows(Number(change))
        else 
          setColoums(Number(change))
        setIsXNext(true)
        setPlay(true)
        setWinner("")
        console.log(history)
    }


    //Adding History to history with shallow copy of matrix
    const matrixSetup = () =>{

      const newMatrix = []
      matrix.map( (x) => {
          newMatrix.push(x.slice())
      })


      history.push(newMatrix)
    } 



    //assigning square required value and deleting history
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


    //Jumping to specific matrix
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

    //build list of moves with history data
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

          {/* Displaying winner */}
          <h1>{winner}</h1>

          {/* Color input of x and o */}
          <div className="color">
          <label>X:</label>
            <input
              type="color"
              value={xColor}
              name="x"
              onChange={ e => handleColorChange(e)}
            />

            <label>O :</label>
            <input
              type="color"
              value={oColor}
              name="o"
              onChange={ e => handleColorChange(e)}
            />
          </div>


          {/* Display Who is next */}
          <div>
            <h1>{isXNext ? "X": "O"}</h1>
          </div>
          
          {/* Input for dropdown  */}
          <div>
              <div>
                <input 
                  list="row-size"  
                  name="row"
                  onChange={handleChange}
                  placeholder="Enter row "
                />

                <datalist id="row-size">
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="21">21</option>
                </datalist>
              </div>
              
              <div>
                <input 
                  list="column-size"  
                  name="column"
                  onChange={handleChange}
                  placeholder="Enter column"
                />

                <datalist id="column-size">
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="21">21</option>
                </datalist>
              </div>
              
            </div>

          {/* Game Board */}
          <div className="game-board">
            <Board 
                squares={matrix}
                onClick={handleClick}
                xColor={xColor}
                oColor={oColor}
            />
          </div>

          {/* Game Info displaying moves */}
          <div className="game-info">
              <ol>{moves}</ol>
          </div>

        </div>
      );
}

export default Game;