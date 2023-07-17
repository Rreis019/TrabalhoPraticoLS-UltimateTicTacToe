import React, { useState,useEffect } from "react";


function Timer({totalSeconds ,bReset,setbReset , onTimeout, borderColor})
{
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerFinished, setTimerFinished] = useState(false);
    const [textColor, setTextColor] = useState('#ABFAC6'); // Cor padrão
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        let interval = null;

        // Função para atualizar o timer
        const updateTimer = () => {
            // Verifica se o tempo acabou
            if (minutes === 0 && seconds === 0) {
            clearInterval(interval);
            setTimerFinished(true);
            onTimeout(); // Chama a função onTimeout fornecida pelos props
            } else {
            // Define a cor do texto com base no tempo restante
            if ((minutes*60+seconds) >  totalSeconds * 0.5) {
                setTextColor('#ABFAC6'); // Verde
            } else if ((minutes*60+seconds) > totalSeconds  * 0.1) {
                setTextColor('#FAF7AB'); // Amarelo
            } else {
                setTextColor('#FAABAB'); // Vermelho
            }
            
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500); // Define o tempo da animação em milissegundos
            
            // Atualiza os segundos
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                // Se os segundos chegarem a 0, decrementa os minutos e define os segundos para 59
                setMinutes((prevMinutes) => prevMinutes - 1);
                return 59;
                }
                return prevSeconds - 1;
            });
            }
        };

        // Inicia o timer
        interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
        }, [minutes, seconds, onTimeout]);

    useEffect(() => {
    if (bReset) {
        setMinutes(Math.floor(totalSeconds / 60));
        setSeconds(totalSeconds % 60);
        setTimerFinished(false);
        setbReset(false);
        setTextColor('#ABFAC6');
    }
    }, [bReset, totalSeconds]);

    return (
        <div className='timer' style={{ borderColor: `${borderColor}` }}>
          <h1 className={isAnimating ? 'animated' : ''} style={{color:textColor}}>  {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        </div>
    );
}


export default Timer;