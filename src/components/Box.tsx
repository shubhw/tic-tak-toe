import "./Home.css";
const Box = (props: { boxKey: any; value: String; onCellClick: any }) => {
  const value = props?.value;
  const boxKey = props?.boxKey;
  return (
    <td className="cellStyle" onClick={() => props?.onCellClick(boxKey, value)}>
      {value}
    </td>
  );
};
export default Box;
