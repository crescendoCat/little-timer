import { ReactComponent as ColonSvg } from "./colon.svg";
import "./colon.scss";
function Colon(props) {
  const orig_w = 96,
        orig_h = 320;

  const target_w = 30;
  let w = 30;
  let h = target_w/orig_w * orig_h;
  let color = props.color || "green";
  return (
    <ColonSvg className="colon" width={`${w}px`} height={`${h}px`} style={{fill: color}}/>
  )
}

export default Colon;