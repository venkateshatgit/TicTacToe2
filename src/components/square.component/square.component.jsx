import { useSelector } from "react-redux";

function Square({value, onClick}) {

  const {xColor, oColor} = useSelector((state) => state.game)

    return (
      <button 
        className="square" 
        style={{
          color : `${value ==="X" ? xColor: oColor}`,
        }}
        onClick={onClick}>
        {value}
      </button>
    );
  }

export default Square;