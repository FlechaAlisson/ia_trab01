
import srcBlocks from "./srcBlocks.js"


const fade_duration = 350
let colors = ["#fd9b70", "#84e2d2", "#ade09d", "#d08bec","#b6e600"];
let defColor = '#dbcc72';
let i = 0;
let lockedColor = '#aaa';
let remover_estados = false;
let mao_livre = false;
let estado_inicial = false;
window.colors = colors

const loadMap = async () => {
	const map = await $.get('/map.svg')
	$('#map').append(map)
}
const showMenu = () => new Promise((done) => {
	$('#menu').fadeIn(fade_duration, done)
})
const hideMenu = () => new Promise((done) => {
	$('#menu').fadeOut(fade_duration, done)
})
const showSource = () => new Promise((done) => {
	$('#source').fadeIn(fade_duration, done)
})
const hideSource = () => new Promise((done) => {
	$('#source').fadeOut(fade_duration, done)
})

const showAlg = async (name) => {
	const source = await $.get(`/algs/${name}.txt`)
	await hideMenu()
	window.obj = srcBlocks(source, $('#source textarea'))
	// 	.set({
	// 		id: 1,
	// 		first_line: 0,
	// 		last_line: 3
	// 	})
	// 	.set({
	// 		id: 2,
	// 		first_line: 4,
	// 		last_line: 5
	// 	}).set({
	// 		id: 3,
	// 		first_line: 8,
	// 		last_line: 9
	// })
	await showSource()
}
const quitAlg = async (name) => {
	await hideSource();
	await showMenu();
}


// item.removeAttr('color-id')
// item.attr('color-id', i)
// i = item.attr('color-id')*1

function updateColors() {
	const content = colors.map((color, i) => `[color-id="${i}"] {fill: '${color}';}`).join('\n')
	$('#colors').html(content)
}
function putColors() {
	const color_bar = $('#color_bar')
	colors.forEach((color) => {
		color_bar.append('<input type="color"/>')
	})
	color_bar.find('input').each(function(index){
		const input = $(this)
		input.val(colors[index])
		input.wrap('<div></div>')
		input.parent().css({
			width: input.css('width'),
			height: input.css('height'),
			overflow: 'hidden'
		})
		input.css({
			transform: 'scale(2)'
		})
		input.bind('change', () => {
			colors[index] = input.val()
			updateColors()
		})
	})
}

$(document).ready(async () => {
	putColors()
	updateColors()
	await loadMap()
	// await hideMenu()
	// await showSource()
	// await showAlg("a")
	$('body').on('click', '.alg', async function(e) {
		const button = $(this)
		const name = button.attr('alg-name')
		await showAlg(name)
	})
	$('body').on('click', '#sair', async function(e) {
		const button = $(this)
		const name = button.attr('alg-name')
		await quitAlg(name)
	})
	$("#remover_estados").click(function() {
		if(!remover_estados){
			$(this).addClass("selected");
			$("#mao_livre").prop("disabled", true);
			$("#estado_inicial").prop("disabled", true);
			$(".alg").prop("disabled", true);
		}else{
			$(this).removeClass("selected");
			$("#mao_livre").prop("disabled", false);
			$("#estado_inicial").prop("disabled", false);
			$(".alg").prop("disabled", false);
		}
		remover_estados = !remover_estados;
	});
	$("#mao_livre").click(function() {
		if(!mao_livre){
			$(this).addClass("selected");
			$("#remover_estados").prop("disabled", true);
			$("#estado_inicial").prop("disabled", true);
			$(".alg").prop("disabled", true);
		}else{
			$(this).removeClass("selected");
			$("#remover_estados").prop("disabled", false);
			$("#estado_inicial").prop("disabled", false);
			$(".alg").prop("disabled", false);
		}
		mao_livre = !mao_livre;
	});
	$("#estado_inicial").click(function() {
		if(!estado_inicial){
			$(this).addClass("selected");
			$("#remover_estados").prop("disabled", true);
			$("#mao_livre").prop("disabled", true);
			$(".alg").prop("disabled", true);
		}else{
			$(this).removeClass("selected");
			$("#remover_estados").prop("disabled", false);
			$("#mao_livre").prop("disabled", false);
			$(".alg").prop("disabled", false);
		}
		estado_inicial = !estado_inicial;
	});

	// $('body').on('click', 'a', function() {
	// 	if(!remover_estados){
	// 		console.log({i})
	// 		$(this).find('path').addClass("colored");
	// 		$(this).find('path').css({
	// 			fill: colors[i]
	// 		})
	// 		i ++
	// 		i %= colors.length
	// 	}else{
	// 		let estado = $(this).find('path');
	// 		if(!estado.hasClass("removido")){
	// 			estado.addClass("removido")
	// 			estado.css({
	// 				fill: "#A9A9A9"
	// 			})
	// 		}else{
	// 			estado.removeClass("removido")
	// 			estado.css({
	// 				fill: "#dbcc72"
	// 			})
	// 		}
	// 	}
	// })

})



