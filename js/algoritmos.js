
import border_list from './estados.js'
import {defColor} from "./colors.js"
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
	console.log(state)
	state.neighbors.forEach(e => {
		let aux = buscaEstado(e)
		cores = cores.filter(c => c !== aux.color)
	});

	return cores
}

function* largura(nome, cores, lista_removido, textarea, src) {
	textarea.val( textarea.val() + "\n iteracao:" + int_num );

	int_num++
	console.log(int_num);
	//Busca a instância do Estado
	textarea.val( textarea.val() + "\n buscando:" + nome );
	const state = buscaEstado(nome)
	textarea.val( textarea.val() + "\n achou:" + state );
	//Busca as cores possíveis
	const cor = getPossibleColors(nome, cores)
	textarea.val( textarea.val() + "\n cores possiveis:" + cor );
	//seta a cor
	setColor(nome, cor[0])
	textarea.val( textarea.val() + "\n pintando com:" + cor[0] );
	//Para todo vizinho, chama recursivamente

	yield nome

	for (let neighbor of state.neighbors) {

		textarea.val( textarea.val() + "\n--- x ---\n verificando:" + nome );
		if(lista_removido.includes(nome)){
			// console.log(nome + " ignorado")
			continue;
		}
		// console.log("visitando " + nome)
		let aux = border_list[`${neighbor}`]
		if (!aux.color || aux.color == defColor) {
			yield* largura(aux.name, cores, lista_removido, textarea, src)
		}
	}

}

function * BuscaMenorConflito(name, cores, lista_removido, textarea, src) {
	console.log(name);
	int_num++
	console.log(int_num);
	yield name
	let state = buscaEstado(name)
	let coresPossiveis = getPossibleColors(name, cores)
	setColor(state.name, coresPossiveis[0])
	let neighbors = state.neighbors.sort((a,b) => {
		return buscaEstado(b).neighbors.length - buscaEstado(a).neighbors.length
	})
	

	for (const neighbor of neighbors) {
		var color = buscaEstado(neighbor).color
		if (!color || color == defColor){
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
	reset,
	setColor,
	getColor
}


