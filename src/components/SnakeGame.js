import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cell from "./Cell";

//============
//============
// constants
const NUM_ROWS = 20;
const NUM_CELLS_PER_ROW = 10;
const totalCells = NUM_ROWS * NUM_CELLS_PER_ROW;

//============
//============
const generateInitialBoard = () => {
	return Array.from(Array(totalCells), (e, i) => ({
		cellIndex: i,
		cellType: "blank", //blank/snake/snakeHead/apple
	}));
};
//============
//============
const getInitialSnake = () => {
	const snakeHeadIndex = Math.floor(NUM_ROWS / 2) * NUM_CELLS_PER_ROW;
	return {
		snakeBody: [{ index: snakeHeadIndex }],
	};
};

//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============

const SnakeGame = () => {
	//============
	//============
	const [board, setBoard] = useState(generateInitialBoard());
	const [appleIndex, setAppleIndex] = useState(null);
	const [snake, setSnake] = useState({
		snakeBody: [],
	});
	const [direction, setDirection] = useState("right");
	const [score, setScore] = useState(0);
	const [level, setLevel] = useState(1);
	const [speed, setSpeed] = useState(null);
	const [play, setPlay] = useState(false);
	const [gameOver, setGameOver] = useState(null);
	//============
	// console.log(getAppleIndex(), "apple");
	//============
	//============
	// console.log(generateInitialBoard(5));
	//============
	//============
	//============
	useEffect(() => {
		// Timer for game loop
		//   first
		if (play && speed && !gameOver) {
			const myInterval = setInterval(() => {
				gameLoop();
			}, speed);

			return () => {
				//     second
				clearInterval(myInterval);
			};
		}
	}, [play, direction, speed, snake, board, gameOver]);

	//============
	//============
	useEffect(() => {
		// handle board update upon snake update/change
		//   first
		if (!play) return;
		updateBoard();

		return () => {
			//     second
		};
	}, [snake]);
	//============
	//============
	//============
	//============
	useEffect(() => {
		//   first
		if (score === 0) {
			setLevel(1);
			return;
		} else if (score % 2 === 0) {
			setLevel((p) => p + 1);
		}
		return () => {
			//     second
		};
	}, [score]);

	//============
	//============
	//============
	useEffect(() => {
		//   first
		setSpeed((p) => (p < 200 ? 100 : p - 100));
		return () => {
			//     second
		};
	}, [level]);
	//============
	//============
	//============
	const handleStart = () => {
		setSpeed(400);
		setPlay(true);
		setScore(0);
		setLevel(1);

		setDirection("right");
		setSnake(getInitialSnake());
		setAppleIndex(getAppleIndex());
		setGameOver(false);
	};
	//============
	//============
	//============
	const handleReset = () => {
		setBoard(generateInitialBoard());
		setSpeed(null);
		setPlay(false);
		setScore(0);
		setLevel(1);
		setDirection("right");
		setSnake(null);
		setAppleIndex(null);
		setGameOver(null);
	};
	//============
	//============
	const handlePause = () => {
		if (speed) setSpeed(null);
		else setSpeed(300);
	};
	//============
	//============
	const handleGameOver = () => {
		setSpeed(null);
		setPlay(false);
		gameOver(true);
	};
	//============
	//============
	const gameLoop = () => {
		//1 check currentpos for apple
		//    if apple >> update score/level +  generate new apple
		//2 check new position valid
		//3 if valid move then updateboard]
		//4 if invalid handle gameover
		// repeat
		moveSnake();
		// console.log(getAppleIndex(), "apple");
		//
		// checkAppleCollision();
	};
	//============
	//============
	//============
	//============
	const checkAppleCollision = (snakeBody) => {
		// const { snakeBody } = snake;
		let updatedSnakeBody = [...snakeBody];
		let currentHeadIndex = snakeBody[0].index;
		if (currentHeadIndex === appleIndex) {
			console.log("apple eat__-----", appleIndex);
			// handle eat apple --delete current apple index
			// or set new index
			// setAppleIndex(null);
			let oldApple = appleIndex;
			setAppleIndex(getAppleIndex());
			setScore((p) => p + 1);

			console.log(snakeBody, "old body");
			console.log(updatedSnakeBody, "new body");
			// updatedSnakeBody.unshift({ index: oldApple });
			updatedSnakeBody.unshift({ index: getNewIndex() });
			// console.log(updatedSnakeBody);
			// setSnake({ ...snake, snakeBody: updatedSnakeBody });
		}
		return updatedSnakeBody;
	};

	//============
	//============
	//============
	//============
	const isAppleCollision = () => {
		const { snakeBody } = snake;
		// let updatedSnakeBody = [...snakeBody];
		let currentHeadIndex = snakeBody[0].index;
		if (currentHeadIndex === appleIndex) return true;

		return false;
	};
	//============
	//============
	//============
	const growSnake = () => {
		const { snakeBody } = snake;
		let updatedSnakeBody = [...snakeBody];

		// let oldApple = appleIndex;
		updatedSnakeBody.unshift({ index: getNewIndex() });
		setSnake({ ...snake, snakeBody: updatedSnakeBody });
		setAppleIndex(getAppleIndex());
		setScore((p) => p + 1);

		// let currentHeadIndex = snakeBody[0].index;

		// if (currentHeadIndex === appleIndex) {
		// 	console.log("apple eat__-----", appleIndex);
		// 	// handle eat apple --delete current apple index
		// 	// or set new index
		// 	// setAppleIndex(null);

		// 	console.log(snakeBody, "old body");
		// 	console.log(updatedSnakeBody, "new body");
		// 	// updatedSnakeBody.unshift({ index: oldApple });

		// 	// console.log(updatedSnakeBody);
		// 	//
		// }
		// return updatedSnakeBody;
	};
	//============
	//============
	//============
	//============
	//============
	const getAppleIndex = () => {
		if (!snake) return 35;
		const { snakeBody } = snake;
		let newAppleIndex = null;
		const isAppleIndexValid = (num) => {
			for (const e of snakeBody) {
				if (e.index === num) {
					return false;
				}
			}
			return true;
		};
		do {
			// console.log("doing");
			newAppleIndex = Math.floor(Math.random() * totalCells);
		} while (!isAppleIndexValid(newAppleIndex));

		return newAppleIndex;
	};
	//============
	//============
	//============
	const handleButtonPressDown = ({ keyCode }) => {
		// console.log(keyCode, isNaN(keyCode));
		if (keyCode === 37) setDirection("left");
		if (keyCode === 39) setDirection("right");
		if (keyCode === 38) setDirection("up");
		if (keyCode === 40) setDirection("down");
	};
	//============
	//============
	const moveSnake = () => {
		// console.log("k1");
		if (isSelfCollide()) {
			// console.log("k2");
			setGameOver(true);
			return;
		}

		if (isAppleCollision()) {
			growSnake();
			return;
		}

		// console.log("k3");
		// snakeBody: [{ index: snakeHeadIndex }],

		const { snakeBody } = snake;
		let clonedSnakeBody = [...snakeBody];
		// let clonedSnakeBody = checkAppleCollision(clonedSnakeBody_pre);
		// if (clonedSnakeBody_pre !== clonedSnakeBody) return;
		let currentHeadIndex = snakeBody[0].index;
		//
		// if (currentHeadIndex === appleIndex) return;
		//
		let tail = clonedSnakeBody.pop();
		clonedSnakeBody.unshift(tail);
		let newIndex = getNewIndex();
		// console.log(isValidNewIndex(newIndex), "isvalid result");
		if (!isValidNewIndex(newIndex)) {
			setGameOver(true);
			return;
		}
		clonedSnakeBody[0].index = newIndex;
		setSnake({ ...snake, snakeBody: clonedSnakeBody });
	};
	//============
	//============
	//============
	//============
	const getNewIndex = () => {
		const { snakeBody } = snake;
		let newIndex = null;
		// let clonedSnakeBody = [...snakeBody];
		let currentHeadIndex = snakeBody[0].index;
		if (direction === "left") {
			// console.log("move left");
			// setScore((p) => p - 1);
			return (newIndex = currentHeadIndex - 1);
		}
		if (direction === "right") {
			// console.log("move right");
			// setScore((p) => p + 1);
			return (newIndex = currentHeadIndex + 1);
		}
		if (direction === "up") {
			// console.log("move up");
			// setScore((p) => p + 1);
			return (newIndex = currentHeadIndex - 10);
		}
		if (direction === "down") {
			// console.log("move down");
			// setScore((p) => p + 1);
			return (newIndex = currentHeadIndex + 10);
		}
	};
	//============
	//============
	//============
	const isValidNewIndex = (newIndex) => {
		// console.log("isvalid>>", newIndex, direction);
		// if (isSelfCollide(newIndex)) return false;
		if (direction === "left") {
			// console.log("case1");
			if ((newIndex + 1) % NUM_CELLS_PER_ROW === 0) return false;
			else return true;
		}
		if (direction === "right") {
			// console.log("case2");
			if (newIndex % NUM_CELLS_PER_ROW === 0) return false;
			else return true;
		}
		if (direction === "up") {
			// console.log("case3");
			if (newIndex < 0) return false;
			else return true;
		}
		if (direction === "down") {
			// console.log("case4");
			if (newIndex > totalCells) return false;
			else return true;
		} else return true;
	};

	//============
	//============
	//============
	const isSelfCollide = () => {
		// console.count("--------start loop");
		const { snakeBody } = snake;
		// // let newIndex = null;
		// let clonedSnakeBody = [...snakeBody];
		// clonedSnakeBody.shift();
		let currentHeadIndex = snakeBody[0].index;
		// console.log("head>", currentHeadIndex);
		let body = snakeBody.map((e) => e.index);
		// console.log("ALLbody>>", body);
		body.shift();
		// body.pop();
		// console.log("head-less-body>>", body);
		if (body.includes(currentHeadIndex)) {
			// console.count("--self collide-");
			return true;
		}
		// let result = false;
		// for (const e of clonedSnakeBody) {
		// 	console.count("--------");
		// 	console.log(e, "for");
		// 	if (e.index === currentHeadIndex) {
		// 		console.count("--self collide-");
		// 		result = true;
		// 	}
		// }
		// console.count("--------end loop");
		// // clonedSnakeBody

		// // for (const e of snake.snakeBody) {
		// // 	console.log("check self >>new is ", newIndex);
		// // 	console.log("check self", e.index, newIndex);
		// // 	// if (e.index === newIndex) return true;
		// // }
		// return result;
		return false;
	};
	//============
	//============
	//============
	const updateBoard = () => {
		// console.log(snake);
		const { snakeBody } = snake;
		// let clonedSnakeBody = [...snakeBody];
		let currentHeadIndex = snakeBody[0].index;
		// console.log(currentHeadIndex);
		// console.log();
		let newBoard = board.map((e, i) => {
			// console.log(e);
			e.cellType = "blank";
			if (e.cellIndex === currentHeadIndex) {
				e.cellType = "snakeHead";
			}
			if (e.cellIndex === appleIndex) {
				e.cellType = "apple";
			}
			return e;
		});
		for (const e of snakeBody) {
			newBoard.forEach((k) => {
				if (k.cellIndex === e.index) {
					k.cellType = "snake";
				}
			});
		}
		newBoard[snakeBody[0].index].cellType = "snakeHead";
		// console.log(newBoard, "<<new", board);
		setBoard(newBoard);
	};

	//============
	//============

	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	return (
		<StyledWrapper
			nCols={NUM_CELLS_PER_ROW}
			nRows={NUM_ROWS}
			role="button"
			tabIndex={0}
			onKeyDown={handleButtonPressDown}
		>
			<div>SnakeGame</div>
			{gameOver && <h1 className="alert-danger">GameOver</h1>}
			<div className=" row buttons-wrap my-3 gap-2">
				<div
					className=" col btn  btn-primary p-1"
					onClick={handleStart}
				>
					Start
				</div>
				<div
					className=" col btn  btn-warning p-1"
					onClick={handlePause}
				>
					pause
				</div>
				<div
					className="col btn  btn-danger p-1"
					onClick={handleReset}
				>
					Reset
				</div>
			</div>
			<div className="row">
				<div className="col">play : {play ? "on" : "off"}</div>
				<div className="col">
					<div className="col">speed: {speed}</div>
				</div>
			</div>
			<div className=" row score my-3">
				<div className="col ">Score: {score}</div>
				<div className="col">level: {level}</div>
			</div>
			<div className="board">
				{board.map((e, i) => (
					<Cell key={e.cellIndex} {...e} />
				))}
			</div>
		</StyledWrapper>
	);
};

export default SnakeGame;

const StyledWrapper = styled.div`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		/* border: 2px solid black; */
	}

	/* height: 300px; */
	width: min-content;
	/* border: 2px solid red; */
	outline: 13px solid gray;
	padding: 20px;
	box-shadow: 0 0 5px 5px grey;
	margin: 20px;

	.board {
		/* outline: 3px solid blue; */
		display: grid;
		place-content: center;
		/* place-items: center; */
		padding: 5px;
		gap: 1px;
		grid-template-columns: ${(props) => `repeat(${props.nCols},1fr)`};
		grid-template-rows: ${(props) => `repeat(${props.nRows},1fr)`};
		width: min-content;
	}
`;
