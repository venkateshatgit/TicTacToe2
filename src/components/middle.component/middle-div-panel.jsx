import { useSelector } from "react-redux";
import Board from "../../board.component";
import gameSlice from "../../redux/game-state/gameSlice";

function MiddleDivPanel({isXNext, matrix, handleClick}) {

    const {xColor, oColor} = useSelector((state) => state.game)

    return (  
        <div 
          className="middle-div panel matrix"
          style={{
            backgroundColor: `${isXNext ? xColor: oColor}`

          }}
        >
            <Board 
                squares={matrix}
                onClick={handleClick}
            />
        </div>
    );
}

export default MiddleDivPanel;