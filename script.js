"use strict";

const lightPicker = document.getElementById("light-selector");
const mediumPicker = document.getElementById("medium-selector");
const darkPicker = document.getElementById("dark-selector");
const facePicker = document.getElementById("face-selector");

const rules = Array.from(document.styleSheets.item(1).cssRules);
const classes = {
	light: rules.find(rule => rule.selectorText === ".light"),
	medium: rules.find(rule => rule.selectorText === ".medium"),
	dark: rules.find(rule => rule.selectorText === ".dark"),
	face: rules.find(rule => rule.selectorText === ".face")
}

function changeClassColor(name, color) {
	console.log(name, color);
	classes[name].style.fill = color;
	console.log(classes[name]);
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