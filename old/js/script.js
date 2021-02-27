let colors = ["#FD9B70", "#84e2d2", "#ADE09D", "#d08bec","#B6E600"];
let i = 0;

$(document).ready(() => {
	$('body').on('click', 'a', function() {
		console.log({i})
		$(this).find('path').css({
			fill: colors[i]
		})
		i ++
		i %= colors.length
	})

	$("#paleta_de_cores").click(function() {
		console.log("#paleta_de_cores")
		// $(this).find('path').css({
		// 	fill: colors[i]
		// })
	});

	let remover_estados = false;
	$("#remover_estados").click(function() {
		console.log("#remover_estados")
		remover_estados = !remover_estados;
		if(remover_estados){
			$("#remover_estados").css({
				background : "red"
			})
		}else{
			$("#remover_estados").css({
				background : "transparent"
			})
		}
		$('body').on('click', 'a', function() {
			if($(this).hasClass("removido")){
				$(this).removeClass("removido")
				$(this).find('path').css({
					fill: "#dbcc72"
				})
			}else{
				$(this).addClass("removido")
				$(this).find('path').css({
					fill: "#A9A9A9"
				})
			}
		})		
	});
	
	$("#selecionar_estado").click(function() {
		console.log("#selecionar_estado")
	});
	
	// $("#algoritmo_a").click(function() {
	// 	console.log("#algoritmo_a")
	// });
	
	$("#algoritmo_b").click(function() {
		console.log("#algoritmo_b")
	});
	
	$("#algoritmo_c").click(function() {
		console.log("#algoritmo_c")
	});
	
	let algoritmo_a = false;
	let first_time_algoritmo_a = true;
	// $("#algoritmo_a").click(function() {
	// 	console.log("#algoritmo_a")
	// 	algoritmo_a = !algoritmo_a;
	// 	if(first_time_algoritmo_a){
	// 		first_time_algoritmo_a = false;
	// 		$('#textarea').removeClass("display-none");
	// 	}
	// 	if(algoritmo_a){
	// 		$('#textarea').removeClass("m-fadeOut");
	// 		$('#textarea').addClass("m-fadeIn");
	// 		$('#buttons-div').addClass("display-none");
	// 	}else{
	// 		$('#textarea').removeClass("m-fadeIn");
	// 		$('#textarea').addClass("m-fadeOut");
	// 		$('#buttons-div').removeClass("display-none");
	// 	}
	// });

	$('body').on('click', '.alg', async function(e) {
		const button = $(this)
		const id = button.attr('id')
		const letter = id.replace('algoritmo_', '')
		const textarea = $('#textarea').removeClass('display-none').find('textarea')
		const source = await $.get(`/algs/${letter}.txt`)
		textarea.val(source)
	})
	
	$("#direitos_autorais").click(function() {
		console.log("#direitos_autorais")
		// var win = window.open('http://stackoverflow.com/', '_blank');
		var win = window.open('direitos_autorais.html', '_blank');
		if (win) {
		    //Browser has allowed it to be opened
		    win.focus();
		} else {
		    //Browser has blocked it
		    alert('Please allow popups for this website');
		}
	});

})
