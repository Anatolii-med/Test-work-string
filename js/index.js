const inputText = document.querySelector(".inputString");
const outputArea = document.querySelector(".outputArea");
const form = document.querySelector(".form");
let string = null;


let startingOffsetLeft;
let startingOffsetTop;


document.addEventListener("click", ({target}) => {
	if (!target.classList.contains("item") && !(target.parentElement && target.parentElement.classList.contains("item"))) {
		return;
	}

	const item = target.classList.contains("item") ? target : target.parentElement;

	if (item.classList.contains("active")) {

		const allOtherItems = document.querySelectorAll(".item:not(.active)");

		let movedItemOffsetLeft = null;
		let movedItemOffsetTop = null;

		const X1 = Number.parseFloat(item.style.left);
		const X2 = X1 + item.clientWidth;
		const Y1 = Number.parseFloat(item.style.top);
		const Y2 = Y1 + item.clientHeight;

		const isInside = (x, y) => x > X1 && x < X2 && y > Y1 && y < Y2;


		for (let i = 0; i < allOtherItems.length; i ++) {
			const anotherItem = allOtherItems[i];

			const aX1 = Number.parseFloat(anotherItem.style.left);
			const aX2 = aX1 + anotherItem.clientWidth;
			const aY1 = Number.parseFloat(anotherItem.style.top);
			const aY2 = aY1 + anotherItem.clientHeight;

			if (
				isInside(aX1, aY1) ||
				isInside(aX1, aY2) ||
				isInside(aX2, aY1) ||
				isInside(aX2, aY2) ||
				(X1 === aX1 && X2 === aX2 && Y1 > aY1 && Y1 < aY2) ||
				(X1 === aX1 && X2 === aX2 && Y2 > aY1 && Y2 < aY2) ||
				(Y1 === aY1 && Y2 === aY2 && X1 > aX1 && X1 < aX2) ||
				(Y1 === aY1 && Y2 === aY2 && X2 > aX1 && X2 < aX2) ||
				(Y1 === aY1 && Y2 === aY2 && X1 === aX1 && X2 === aX2)
			) {
				if (movedItemOffsetLeft === null) {
					movedItemOffsetLeft = aX1;
					movedItemOffsetTop = aY1;

					anotherItem.style.left = startingOffsetLeft;
					anotherItem.style.top = startingOffsetTop;
				} else {
					anotherItem.style.left = (Number.parseFloat(startingOffsetLeft) + (aX1 - movedItemOffsetLeft)) + "px";
					anotherItem.style.top = (Number.parseFloat(startingOffsetTop) + (aY1 - movedItemOffsetTop)) + "px";
				}

			}
		}
		item.classList.remove("active");
	} else {
		item.classList.add("active");
		startingOffsetLeft = item.style.left;
		startingOffsetTop = item.style.top;
	}
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!inputText.value.trim()) {
		return;
	}

	outputArea.innerHTML = "";

	string = inputText.value;

	let offsetLeft = 20;

	for (let i = 0; i < string.length; i += 1) {
		if (!string[i].trim()) {
			offsetLeft += 20;
			continue;
		}

		outputArea.insertAdjacentHTML(
			"beforeend",
			`<div class="item" style="top:50px; left:${offsetLeft}px"><span class="item-text">${string[i]}</span></div>`
		);

		const items = document.querySelectorAll(".item");
		offsetLeft += items[items.length - 1].clientWidth;
	}

	inputText.value = "";
});

window.onmousemove = (e) => {
	const activeElement = document.querySelector(".active");
	if (activeElement) {
		activeElement.style.left =
			e.clientX - activeElement.offsetWidth / 2 + "px";
		activeElement.style.top =
			e.clientY - activeElement.offsetHeight / 2 + "px";
	}
};
