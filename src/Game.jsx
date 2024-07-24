import React, { useEffect, useState } from 'react';

export default function Game({ data }) {
    const dataFlat = Object.entries(data).flat();
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(0);
    const [shuffledData, setShuffledData] = useState([]);

    const shuffleArray = (array) => {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }
        return shuffledArray;
    };

    useEffect(() => {
        setShuffledData(shuffleArray(dataFlat));
    }, []);

    const handleClick = (e) => {
        const div = e.target;
        if (div.classList.contains('selected') || selected.length === 2) return;
        div.classList.toggle('selected');
        setSelected((prev) => [...prev, div]);
    };

    useEffect(() => {
        if (selected.length === 2) {
            handleTest();
        }
    }, [selected]);

    useEffect(() => {
        if (score === 7) {
            setTimeout(() => {
                handleEndGame();
            }, 1500);
        }
    }, [score]);

    const handleTest = () => {
        const firstValue = selected[0].innerText;
        const secondValue = selected[1].innerText;
        const formatData = Object.entries(data);
        const key = formatData.findIndex((item) =>
            item.includes(selected[0].innerText)
        );
        const correctValues = formatData[key];

        if (
            correctValues.includes(firstValue) &&
            correctValues.includes(secondValue)
        ) {
            selected[0].classList.add('correct');
            selected[1].classList.add('correct');
            setSelected([]);
            setScore((prev) => prev + 1);
        } else {
            selected[0].classList.add('wrong');
            selected[1].classList.add('wrong');
            setSelected([]);
            setTimeout(() => {
                selected[0].classList.remove('wrong');
                selected[1].classList.remove('wrong');
                selected[0].classList.remove('selected');
                selected[1].classList.remove('selected');
            }, 1000);
        }
    };

    const handleEndGame = () => {
        const div = document.querySelector('.congratulations');
        div.classList.add('endGame');
    };
    return (
        <>
            <div className="grid">
                {shuffledData.map((items, index) => {
                    return (
                        <div
                            onClick={handleClick}
                            key={`${items}-${index}`}
                            className="default"
                        >
                            {items}
                        </div>
                    );
                })}
                <div className="congratulations">Congratulations</div>
            </div>
        </>
    );
}
