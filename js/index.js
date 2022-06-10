const inputText = document.querySelector(".inputString");
const outputArea = document.querySelector(".outputArea");
const form = document.querySelector(".form");
let string = null;

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!inputText.value.trim()) {
		return;
	}

	outputArea.innerHTML = "";

	string = inputText.value;

	for (let i = 0; i < string.length; i += 1) {
		console.log(string[i]);
		let left = 20 + i * 15;

		outputArea.insertAdjacentHTML(
			"beforeend",
			`<div class="item" style="left:${left}px"><span class="item-text">${string[i]}</span></div>`
		);
	}

	const items = document.querySelectorAll(".item");

	if (items) {
		for (let i = 0; i < items.length; i += 1) {
			items[i].addEventListener("click", (e) => {
				if (items[i].classList.contains("active")) {
					items[i].classList.remove("active");
					console.log("remove if");
				} else {
					unSetActive();
					console.log("add else");
					items[i].classList.add("active");
				}

				e.stopPropagation();
			});
		}
	}

	inputText.value = "";
});

function unSetActive(e) {
	const activeItem = document.querySelector(".active");
	if (activeItem) {
		activeItem.classList.remove("active");
		console.log("unset");
	}
}
window.onmousemove = (e) => {
	const activeElement = document.querySelector(".active");
	if (activeElement) {
		activeElement.style.left =
			e.clientX - activeElement.offsetWidth / 2 + "px";
		activeElement.style.top =
			e.clientY - activeElement.offsetHeight / 2 + "px";
		window.onmousedown = (e) => {
			unSetActive();
		};
	}
};

window.addEventListener("click", (e) => {
	if (document.querySelectorAll(".active")) {
		unSetActive();

		console.log("window.addEventListener ~ e.clientX", e.clientX);
		console.log("window.addEventListener ~ e.clientY", e.clientY);
	}
});
