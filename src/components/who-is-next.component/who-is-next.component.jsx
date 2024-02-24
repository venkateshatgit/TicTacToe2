import { useSelector } from "react-redux";

function WhoIsNext({isXNext}) {

    const {xColor, oColor} = useSelector((state) => state.game)
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