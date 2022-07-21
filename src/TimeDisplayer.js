import SevenSegment from "./SevenSegment.js";
import Colon from "./Colon.js";
import PropTypes from 'prop-types';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useState, useEffect } from "react";

//set up moment duration format
momentDurationFormatSetup(moment);

function TimeDisplayer(props) {
  let [timeStr, setTimeStr] = useState(props.time.format("hh:mm:ss"));
  let [color, setColor] = useState(null);
  useEffect(() => {
    setTimeStr(props.time.format("hh:mm:ss"));
    setColor("#55a630")
    if(props.time.asSeconds() <= 60) {
      setColor("#ff5400")
    }
    if(props.time.asSeconds() <= 10) {
      setColor("#d00000")
    }
  }, [props.time])

  return (
    <>
    {
      timeStr.split("").map((digit, idx) => {
        let key = `time-displayer-digit-${idx}`
        if(digit === ":") return <Colon key={key} color={color}/>
        return <SevenSegment number={digit} key={key} color={color}/>
      })
    }
    </>
  )
}

export default TimeDisplayer;

TimeDisplayer.propTypes = {
  time: (props, propName, componentName) => {
    if(!moment.isDuration(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed. Prop `' + propName + '` must be a moment.duration opject.'
      )
    }
  }
}