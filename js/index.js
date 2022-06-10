const submitBtn = document.querySelector(".submitButton");
const inputText = document.querySelector(".inputString");
const outputArea = document.querySelector(".outputArea");
const form = document.querySelector(".form");
let string = null;

form.addEventListener("click", (e) => {
	e.preventDefault();
	if (!inputText.value.trim()) {
		// alert("Enter a vulue for magic %)");
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
				unSetActive();
				items[i].classList.add("active");
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
	}
}

window.addEventListener("click", (e) => {
	if (document.querySelectorAll(".active")) {
		document.querySelector(".active").style.left = e.clientX + "px";
		document.querySelector(".active").style.top = e.clientY + "px";
		unSetActive();

		console.log("window.addEventListener ~ e.clientX", e.clientX);
		console.log("window.addEventListener ~ e.clientY", e.clientY);
	}
});
