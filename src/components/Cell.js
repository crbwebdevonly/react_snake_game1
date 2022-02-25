import React from "react";
import styled from "styled-components";
const Cell = (props) => {
	//============
	const { cellIndex, cellType } = props;
	//============
	const getColor = (cellType) => {
		if (cellType === "blank") return "grey";
		if (cellType === "snake") return "green";
		if (cellType === "snakeHead") return "purple";
		if (cellType === "apple") return "red";
	};
	//============
	const cellColor = getColor(cellType);
	//============
	// console.log(cellType, cellColor);
	//============
	//============
	//============
	//============
	//============
	//============
	return (
		<StyledWrapper cellColor={cellColor}>
			<div className="cell"></div>
		</StyledWrapper>
	);
};

export default Cell;

const StyledWrapper = styled.div`
	.cell {
		color: pink;
		font-size: 12px;
		height: 20px;
		width: 20px;
		background-color: ${(props) => `${props.cellColor}`};
	}
`;
