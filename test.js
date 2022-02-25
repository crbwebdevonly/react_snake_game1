// console.log("test===============================");

// const arr1 = Array.from(Array(5), (e, i) => {
// 	return { index: i };
// });

// console.log(arr1);

// const ff = () => {
// 	return !false;
// };

// const rand = () => {
// 	console.log("rand");
// 	let rand = null;
// 	let c = [1, 2, 3];
// 	do {
// 		console.log("doing");
// 		rand = Math.floor(Math.random() * 6);
// 	} while (
// 		ff()
// 		// () => {
// 		// 	return !true;
// 		// 	// !(arr1.findIndex((e) => e.index === rand) < 0)
// 		// }
// 	);
// 	console.log("rand is ", rand);
// };

// rand();

const arr1 = [1, 2, 3, 4, 5];

// for (const e of arr1) {
// 	if (e === 3) {
// 		return;
// 	}
// 	// if (e < 3) continue;
// 	// if (e > 4) break;
// 	console.log(e);
// }
console.log(arr1.pop());
console.log(arr1);

// const getAppleIndex = () => {
// 	// const { snakeBody } = snake;
// 	console.log("//============start");
// 	const snakeBody = [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 5 }];
// 	let newAppleIndex = null;
// 	const isAppleIndexValid = (num) => {
// 		for (const e of snakeBody) {
// 			if (e.index === num) {
// 				console.log(" hit for false");
// 				return false;
// 			}
// 		}
// 		console.log(" hit for true");
// 		return true;
// 	};
// 	do {
// 		console.log("doing");
// 		newAppleIndex = Math.floor(Math.random() * 6);
// 	} while (!isAppleIndexValid(newAppleIndex));

// 	return newAppleIndex;
// };

// console.log(getAppleIndex());
