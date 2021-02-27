const loadMap = async () => {
	const map = await $.get('/map.svg')
	$('#map').append(map)
}

const fade_duration = 350

const hideMenu = () => new Promise((done) => {
	$('#menu').fadeOut(fade_duration, done)
})

const showSource = () => new Promise((done) => {
	$('#source').fadeIn(fade_duration, done)
})

const showAlg = async (name) => {
	const source = await $.get(`/algs/${name}.txt`)
	await hideMenu()
	$('#source textarea').val(source)
	await showSource()
}

$(document).ready(async () => {
	await loadMap()
	$('body').on('click', '.alg', async function(e) {
		const button = $(this)
		const name = button.attr('alg-name')
		await showAlg(name)
	})
})


	// let colors = ["#FD9B70", "#84e2d2", "#ADE09D", "#d08bec","#B6E600"];
	// let i = 0;
	// $('body').on('click', 'a', function() {
	// 	console.log({i})
	// 	$(this).find('path').css({
	// 		fill: colors[i]
	// 	})
	// 	i ++
	// 	i %= colors.length
	// })


	// let remover_estados = false;
	// $("#remover_estados").click(function() {
	// 	console.log("#remover_estados")
	// 	remover_estados = !remover_estados;
	// 	if(remover_estados){
	// 		$("#remover_estados").css({
	// 			background : "red"
	// 		})
	// 	}else{
	// 		$("#remover_estados").css({
	// 			background : "transparent"
	// 		})
	// 	}
	// 	$('body').on('click', 'a', function() {
	// 		if($(this).hasClass("removido")){
	// 			$(this).removeClass("removido")
	// 			$(this).find('path').css({
	// 				fill: "#dbcc72"
	// 			})
	// 		}else{
	// 			$(this).addClass("removido")
	// 			$(this).find('path').css({
	// 				fill: "#A9A9A9"
	// 			})
	// 		}
	// 	})		
	// });