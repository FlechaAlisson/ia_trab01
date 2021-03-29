
import border_list from './estados.js'
import { defColor } from "./colors.js"
let int_num = 0




function buscaEstado(nome) {
	return border_list[`${nome}`]
}

function setColor(nome, cor) {
	buscaEstado(nome).color = cor
	document.getElementById(nome)
		.getElementsByTagName('path')[0]
		.setAttribute('style', `fill: ${cor};`)
}

function getColor(nome) {
	let state = buscaEstado(nome)
	return state.color;
}

function getPossibleColors(nome, cores) {
	let state = buscaEstado(nome)
	console.log(state);
	state.neighbors.forEach(e => {
		let aux = buscaEstado(e)
		cores = cores.filter(c => c !== aux.color)
	});

	return cores
}

function* largura(nome, cores, lista_removido, textarea, src) {
	var lista_not_pintados = [nome]
	for (let i = 0; i < lista_not_pintados.length; i++) {
		const cor = getPossibleColors(lista_not_pintados[i], cores)
		setColor(lista_not_pintados[i], cor[0])

		textarea.val(src)
		textarea.val(textarea.val() + "\nverificando:" + lista_not_pintados[i]);
		textarea.val(textarea.val() + "\ncores possíveis:" + cor);
		textarea.val(textarea.val() + "\ncor escolhida:" + cor[0]);
		textarea.val(textarea.val() + "\niteracao:" + int_num);
		int_num++
		yield lista_not_pintados[i]
		buscaEstado(lista_not_pintados[i]).neighbors.forEach(element => {
			if (buscaEstado(element).color == undefined &&
				!lista_not_pintados.includes(element) &&
				!lista_removido.includes(element)) {
				lista_not_pintados.push(element)
			}
		});

	}
}


function* algoritmoC(nome, cores, lista_removido, textarea, src) {
	textarea.val(textarea.val() + "\n verificando:" + nome);
	textarea.val(textarea.val() + "\n iteracao:" + int_num);
	int_num++
	console.log(int_num);
	//Busca a instância do Estado
	const state = buscaEstado(nome)
	textarea.val(textarea.val() + "\n achou:" + state.name);
	//Busca as cores possíveis
	const cor = getPossibleColors(nome, cores)
	textarea.val(textarea.val() + "\n cores possiveis:" + cor);
	//seta a cor
	setColor(nome, cor[0])
	textarea.val(textarea.val() + "\n pintando com:" + cor[0]);
	//Para todo vizinho, chama recursivamente

	yield nome

	for (let neighbor of state.neighbors) {

		textarea.val(src);
		if (lista_removido.includes(nome)) {
			// console.log(nome + " ignorado")
			continue;
		}
		// console.log("visitando " + nome)
		let aux = border_list[`${neighbor}`]
		if (!aux.color || aux.color == defColor) {
			yield* algoritmoC(aux.name, cores, lista_removido, textarea, src)
		}
	}
}

function* BuscaMenorConflito(name, cores, lista_removido, textarea, src) {
	textarea.val(textarea.val() + "\nverificando:" + name);
	textarea.val(textarea.val() + "\n iteracao:" + int_num);
	console.log(name);
	int_num++
	console.log(int_num);
	let state = buscaEstado(name)
	textarea.val(textarea.val() + "\n achou:" + state.name);
	let coresPossiveis = getPossibleColors(name, cores)
	textarea.val(textarea.val() + "\n cores possiveis:" + coresPossiveis);
	setColor(state.name, coresPossiveis[0])

	textarea.val(textarea.val() + "\n pintando com:" + coresPossiveis[0]);
	let neighbors = state.neighbors.sort((a, b) => {
		return buscaEstado(a).neighbors.length - buscaEstado(b).neighbors.length
	})
	yield name
	console.log(neighbors);
	for (const neighbor of neighbors) {
		var color = buscaEstado(neighbor).color
		if (!color || color == defColor) {
			textarea.val(src);
			yield* BuscaMenorConflito(neighbor, cores, lista_removido, textarea, src)
		}
	}

}

function reset() {
	for (const value in border_list) {
		setColor(border_list[value].name, defColor)
		border_list[value].color = undefined
	}
}
export {
	largura,
	BuscaMenorConflito,
	algoritmoC,
	reset,
	setColor,
	getColor
}


