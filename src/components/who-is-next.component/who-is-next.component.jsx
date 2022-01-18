function WhoIsNext({isXNext, xColor, oColor}) {
    return (  
        <div>
            <h1 style={{color: "#fff"}}>
              Next player: 
              <span 
                style={{
                  color: `${isXNext ? xColor: oColor}`}}
              >
                {isXNext ? " X ": " O "}
              </span> 
            </h1>
        </div>
    );
}

export default WhoIsNext;