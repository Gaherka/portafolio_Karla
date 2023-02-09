import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import headerImg from '../assets/img/header-img.svg'
import { ArrowRightCircle } from 'react-bootstrap-icons'
import 'animate.css'
import TrackVisibility from 'react-on-screen'

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = [ "Web Developer", "Web Designer", "Entrepreneur" ];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text, delta, isDeleting, loopNum])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    
        setText(updatedText);
    
        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }
    
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="aligh-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                <span className="tagline">Welcome to my Portfolio</span>
                                <h1>{`Hi! I'm Karla`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "Entrepreneur" ]'><span className="wrap">{text}</span></span></h1>
                                <p>
                                    Con un comienzo de nulo entendimiento en informatica, me adapté con facilidad a los sistemas de programación. 
                                    He tenido una amplia experiencia en ONGs, trabajando en "Un Techo Para Mi País" y otros. 
                                    Recientemente participé en un programa de emprendedores llamado "Geek Show", desarrollando un programa de 
                                    aguas potables, quedando dentro de los primeros cinco lugares y entrando en un programa de incubación a nivel centroamericano. 
                                    En la actualidad estudio en la academia Kodigo, en el programa de Full Stack Junior. 
                                    Mis capacidades son variadas, desde diseño y artes, hasta diplomas de primer lugar en Matematicas 
                                    y medallas en deporte. Mi nombre es Karla Hernández y lo que más disfruto es aprender.
                                </p>
                                <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
                            </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                <img src={headerImg} alt="Header Img"/>
                            </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
