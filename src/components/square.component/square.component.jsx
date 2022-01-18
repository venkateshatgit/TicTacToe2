function Square({value, onClick, xColor, oColor, rows, columns}) {
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