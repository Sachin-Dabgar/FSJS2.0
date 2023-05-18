import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandRock,
    faHandPaper,
    faHandScissors,
} from "@fortawesome/free-solid-svg-icons";

const Game = () => {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 });

    const determineResult = () => {
        if (playerChoice === computerChoice) {
            setResult("It's a draw!");
            setScore((prevScore) => ({
                ...prevScore,
                draw: prevScore.draw + 1,
            }));
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            setResult("You win!");
            setScore((prevScore) => ({
                ...prevScore,
                player: prevScore.player + 1,
            }));
        } else {
            setResult("Computer wins!");
            setScore((prevScore) => ({
                ...prevScore,
                computer: prevScore.computer + 1,
            }));
        }
    };

    useEffect(() => {
        if (playerChoice) {
            generateComputerChoice();
            determineResult();
        }
        // eslint-disable-next-line
    }, [playerChoice]);

    const handlePlayerChoice = (choice) => {
        setPlayerChoice(choice);
    };

    const generateComputerChoice = () => {
        const choices = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * 3);
        const choice = choices[randomIndex];
        setComputerChoice(choice);
    };

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-3xl mb-4 font-bold">Rock Paper Scissors</h1>
            <div className="flex justify-between items-center w-96 p-4 rounded-lg shadow-lg bg-gray-200">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-medium">You</p>
                    <div className="mt-4">
                        <button
                            className={`btn-choice ${
                                playerChoice === "rock" ? "selected" : ""
                            }`}
                            onClick={() => handlePlayerChoice("rock")}
                        >
                            <FontAwesomeIcon
                                icon={faHandRock}
                                className="text-4xl text-blue-500"
                            />
                        </button>
                        <button
                            className={`btn-choice ${
                                playerChoice === "paper" ? "selected" : ""
                            }`}
                            onClick={() => handlePlayerChoice("paper")}
                        >
                            <FontAwesomeIcon
                                icon={faHandPaper}
                                className="text-4xl text-blue-500"
                            />
                        </button>
                        <button
                            className={`btn-choice ${
                                playerChoice === "scissors" ? "selected" : ""
                            }`}
                            onClick={() => handlePlayerChoice("scissors")}
                        >
                            <FontAwesomeIcon
                                icon={faHandScissors}
                                className="text-4xl text-blue-500"
                            />
                        </button>
                    </div>
                </div>
                <div className="text-3xl">VS</div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-medium">Computer</p>
                    <div className="mt-4">
                        {computerChoice === "rock" && (
                            <FontAwesomeIcon
                                icon={faHandRock}
                                className="text-4xl text-red-500"
                            />
                        )}
                        {computerChoice === "paper" && (
                            <FontAwesomeIcon
                                icon={faHandPaper}
                                className="text-4xl text-red-500"
                            />
                        )}
                        {computerChoice === "scissors" && (
                            <FontAwesomeIcon
                                icon={faHandScissors}
                                className="text-4xl text-red-500"
                            />
                        )}
                    </div>
                </div>
            </div>
            {result && <p className="text-lg mt-4">{result}</p>}
            <div className="mt-6">
                <p className="text-lg font-medium">Score:</p>
                <div className="flex items-center justify-center space-x-4 mt-2">
                    <div className="score-card bg-blue-500">
                        <p className="text-center text-2xl font-semibold text-white">
                            Player
                        </p>
                        <p className="text-center text-lg font-medium text-white">
                            {score.player}
                        </p>
                    </div>
                    <div className="score-card bg-red-500">
                        <p className="text-center text-2xl font-semibold text-white">
                            Computer
                        </p>
                        <p className="text-center text-lg font-medium text-white">
                            {score.computer}
                        </p>
                    </div>
                    <div className="score-card bg-gray-500">
                        <p className="text-center text-2xl font-semibold text-white">
                            Draw
                        </p>
                        <p className="text-center text-lg font-medium text-white">
                            {score.draw}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
