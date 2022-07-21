import './App.css';
import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import TimeDisplayer from "./TimeDisplayer";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { useAudio } from "./useAudio"

momentDurationFormatSetup(moment);
function App() {

  const [eplased, _setEplased ] = useState(moment.duration(0));
  const [countdown, setCountdown ] = useState(moment.duration(0));
  const [number, setNumber] = useState(0);
  const [timeupShowed, setTimeupShowed] = useState(false);
  const [playing, playAlarm] = useAudio("media/alarm-clock-short-6402.mp3", {cycle: true});
  const interval  = useRef(null);
  const startTime = useRef(null);

  const setEplased = (value) => {
    if(!moment.isDuration(value)) {
      _setEplased(moment.duration(value))
    } else {
      _setEplased(value);
    }
  }

  const startCountdown = () => {
    if(interval.current !== null) {
      clearInterval(interval.current);
    }
    setTimeupShowed(false);
    //設定開始時間
    startTime.current = moment();
    //設置定時更新function, 每秒更新remaining的數值
    interval.current = setInterval( () => {
      setEplased(moment().diff(startTime.current));
    }, 1000)
  }

  const resumeCountdown = () => {
    if(interval.current !== null) {
      clearInterval(interval.current);
    }
    setTimeupShowed(false);
    startTime.current = moment().subtract(eplased);

    let firstUpdateTime = eplased.milliseconds()
    console.log(firstUpdateTime);
    interval.current = setTimeout(() => {

      setEplased(moment().diff(startTime.current));
      interval.current = setInterval(() => {
        setEplased(moment().diff(startTime.current));
      }, 1000)
    }, firstUpdateTime)

  }

  const pauseCountdown = () => {
    if(interval.current !== null) {
      
      clearInterval(interval.current);
      interval.current = null;

      setEplased(moment().diff(startTime.current));
    }
    playAlarm(false);

  }

  const resetCountdown = () => {
    if(interval.current !== null) {
      clearInterval(interval.current);
    }
    setEplased(0);
    setTimeupShowed(false);
    setCountdown(moment.duration(0));
  }

  useEffect(() => {
    if(countdown.clone().subtract(eplased).asSeconds()<=0 && !timeupShowed && interval.current) {
      //alert("Timeup!!!")
      setTimeupShowed(true);
      playAlarm(true);
    }
  }, [eplased])

  return (
    <Container className="App p-5">
      <Row className="justify-content-center">
        <Col xs="5" className="main-component">
          <Card>
            <Card.Header>Simple Timer</Card.Header>
            <Card.Body>
              <Card.Title> Now Time: </Card.Title>
              <Card.Text>
                {countdown.clone().subtract(eplased).format("hh:mm:ss [s]")}
              </Card.Text>
              <Card.Text>
                <TimeDisplayer time={countdown.clone().subtract(eplased)}/>
              </Card.Text>
              <div className="d-flex justify-content-center">
                <div className="icon-btn" onClick={() => {
                  console.log(eplased)
                  console.log(eplased.asMilliseconds())
                  if(eplased.asMilliseconds() === 0) startCountdown()
                  else resumeCountdown()
                }}>
                  <AiFillPlayCircle />
                </div>
                <div className="icon-btn" onClick={pauseCountdown}>
                  <AiFillPauseCircle />
                </div>
                <div className="icon-btn" onClick={resetCountdown}>
                  <GrPowerReset />
                </div>
              </div>
              <Button onClick={() => {
                setCountdown(countdown.clone().add(1, "minutes"))}
              }>+</Button>
              <Button onClick={() => {
                setCountdown(countdown.clone().add(10, "minutes"))}
              }>+10</Button>
              <Button onClick={() => {
                setCountdown(countdown.clone().subtract(10, "minutes"))
              }}>-10</Button>
              <Button onClick={() => {
                setCountdown(countdown.clone().subtract(1, "minutes"))
              }}>-</Button>
              <Button onClick={() => {
                setCountdown(countdown.clone().add(10, "seconds"))
              }}>+10s</Button>
              <Button onClick={() => {
                setCountdown(countdown.clone().subtract(10, "seconds"))
              }}>-10s</Button>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;