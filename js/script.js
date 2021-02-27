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
})
