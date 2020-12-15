"use strict";

/*****************
 * COLOR PICKERS *
 *****************/

const lightPicker = document.getElementById("light-selector");
const mediumPicker = document.getElementById("medium-selector");
const darkPicker = document.getElementById("dark-selector");
const facePicker = document.getElementById("face-selector");
const circlePicker = document.getElementById("circle-selector");

const rules = Array.from(document.styleSheets.item(1).cssRules);
const classes = {
	light: rules.find(rule => rule.selectorText === ".light"),
	medium: rules.find(rule => rule.selectorText === ".medium"),
	dark: rules.find(rule => rule.selectorText === ".dark"),
	face: rules.find(rule => rule.selectorText === ".face"),
	circle: rules.find(rule => rule.selectorText === ".circle")
}

function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function updateColorPickers() {
	lightPicker .value = rgb2hex(classes.light .style.fill);
	mediumPicker.value = rgb2hex(classes.medium.style.fill);
	darkPicker  .value = rgb2hex(classes.dark  .style.fill);
	facePicker  .value = rgb2hex(classes.face  .style.fill);
	circlePicker.value = rgb2hex(classes.circle.style.stroke);

	return classes.circle.style.stroke;
}

function changeClassColor(name, color) {
	if (name === "circle") {
		classes[name].style.stroke = color;
	} else {
		classes[name].style.fill = color;
	}
}

function addColorPicker(picker, color) {
	picker.addEventListener("change", ev => {
		changeClassColor(color, ev.target.value);
	});
}

addColorPicker(lightPicker, "light");
addColorPicker(mediumPicker, "medium");
addColorPicker(darkPicker, "dark");
addColorPicker(facePicker, "face");
addColorPicker(circlePicker, "circle");

/**************
 * RANDOMIZER *
 **************/

const randomizerButton = document.getElementById("randomizer");

function randomizeColors() {
	let keys = Object.keys(classes);
	keys.forEach(key => {
		let class_ = classes[key];
		let color = "#" + ((1<<24) * Math.random() | 0).toString(16);
		if (key === "circle") {
			class_.style.stroke = color;
		} else {
			class_.style.fill = color;
		}
	});

	updateColorPickers();
}

randomizerButton.addEventListener("click", () => {
	randomizeColors();
});

/**************
 * SVG to PNG *
 **************/

const logoSVG = document.getElementById("logo");
const downloadButton = document.getElementById("download");

downloadButton.addEventListener("click", () => saveSvgAsPng(logoSVG, "endtech-logo.png"));

/*********
 * RESET *
 *********/

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
	classes.light .style.fill   = "#A61F8A";
	classes.medium.style.fill   = "#7D1A88";
	classes.dark  .style.fill   = "#511388";
	classes.face  .style.fill   = "#D9D4DC";
	classes.circle .style.stroke = "#A79AB0";
	updateColorPickers();
});