import { ReactComponent as Segment } from "./seven-segment.svg";
import "./seven-segment.scss";
import {useState, useEffect} from "react";

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

function SevenSegment(props) {
  const orig_w = 192,
        orig_h = 320;

  const target_w = 60;
  let w = 60;
  let h = target_w/orig_w * orig_h;
  const [number, setNumber] = useState(props.number);
  let color = props.color || "green";
  useEffect(() => {
    if(props.number === "-") {
      setNumber("minus");
      return;
    }
    let raw_number = parseInt(props.number);
    if(!isNumber(raw_number)) {
      setNumber(0);
    } else {
      setNumber(raw_number);
    }
  }, [props.number])

  useEffect(() => {
    if(number === "minus") return;
    if(number >= 10 || number < 0) {
      throw `Invalid Number: ${number}, number must between 0 and 10 or "-"`
    }
  }, [number])

  return (
    <Segment className={`seven-segment seven-seg-${number}`} width={`${w}px`} height={`${h}px`} style={{fill: color}}/>
  )
}

export default SevenSegment;
