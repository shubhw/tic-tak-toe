import React from "react";
import "./Home.css";
import Box from "./Box";
import { promises } from "dns";
const Home = () => {
  const defaultData: {}[] = [
    { c1: null, c2: null, c3: null },
    { c1: null, c2: null, c3: null },
    { c1: null, c2: null, c3: null },
  ];

  const [ticTacData, setTicTacData] = React.useState(defaultData);
  const [turn, setTurn] = React.useState<String>("O");
  const [win, setWinner] = React.useState<String>("");

  const diagnonalCheck = (newData: any) => {
    var diagnonalCheckL = [];
    var diagnonalCheckR = [];
    for (let i = 0; i < newData.length; i++) {
      const Lk = `c${i + 1}`;
      const Rk = `c${newData.length - i}`;
      diagnonalCheckL.push(newData[i][Lk]);
      diagnonalCheckR.push(newData[i][Rk]);
    }
    console.log("diagnonalCheckL ==>>", diagnonalCheckL);
    console.log("diagnonalCheckR ==>>", diagnonalCheckR);
  };

  //   const horizontalCheck = (newData: any) => {
  //     var horizontalCheck = [];
  //     for (let i = 0; i < newData.length; i++) {
  //       const k = `c${i + 1}`;
  //       horizontalCheck.push(newData[i][k]);
  //     }
  //   };

  const getWinner = (newData: any) => {
    return new Promise((resolve, reject) => {
      console.log("newData ==>>", newData);
      const diagnonalCheckValues = diagnonalCheck(newData);
      //   const horizontalCheckValues = horizontalCheck(newData);
      resolve(false);
    });
  };

  const onCellClick = (boxKey: any, value: String) => {
    if (!value) {
      const newData: { [key: number]: String }[] = ticTacData;
      const row = boxKey.row;
      const cell = boxKey.cell;
      newData[row][cell] = turn;
      setTicTacData(newData);

      getWinner(newData).then((win) => {
        if (win) {
          setWinner("Winner is " + turn);
        } else {
          setTurn((prev) => {
            return prev === "O" ? "X" : "O";
          });
        }
      });
    }
  };

  const handleReset = () => {
    setTicTacData(defaultData);
  };

  return (
    <div>
      <h1>
        Tic Tac Toe &nbsp;
        <span className="red">X</span>/<span className="red">O</span>
      </h1>
      <hr />
      <div>
        <button onClick={handleReset}>Reset</button>
        <table border={2} className="tableStyle">
          <tbody>
            {ticTacData.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <Box
                    boxKey={{ row: index, cell: "c1" }}
                    value={item?.c1}
                    onCellClick={onCellClick}
                  />
                  <Box
                    boxKey={{ row: index, cell: "c2" }}
                    value={item?.c2}
                    onCellClick={onCellClick}
                  />
                  <Box
                    boxKey={{ row: index, cell: "c3" }}
                    value={item?.c3}
                    onCellClick={onCellClick}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
