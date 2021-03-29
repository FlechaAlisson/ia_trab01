
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


function getCor(nome, cores) {
	let state = buscaEstado(nome)
	console.log(state);
	state.neighbors.forEach(e => {
		let aux = buscaEstado(e)
		cores = cores.filter(c => c !== aux.color)
	});

	return cores
}

function* largura(nome, cores, lista_removido) {
	var lista_not_pintados = [nome]
	for (let i = 0; i < lista_not_pintados.length; i++) {
		const cor = getCor(lista_not_pintados[i], cores)
		setColor(lista_not_pintados[i], cor[0])
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


function * algoritmoC(name, cores, lista_removido) {
	int_num++
	console.log(int_num);
	//Busca a instância do Estado
	const state = buscaEstado(nome)
	const cor = getCor(nome, cores)
	setColor(nome, cor[0])
	//Para todo vizinho, chama recursivamente

	yield nome

	for (let neighbor of state.neighbors) {
		if(lista_removido.includes(nome)){
			// console.log(nome + " ignorado")
			continue;
		}
		// console.log("visitando " + nome)
		let aux = border_list[`${neighbor}`]
		if (!aux.color || aux.color == defColor) {
			yield* largura(aux.name, cores, lista_removido)
		}
	}
}

function * BuscaMenorConflito(name, cores, lista_removido) {
	console.log(name);
	int_num++
	console.log(int_num);
	yield name
	let state = buscaEstado(name)
	let coresPossiveis = getCor(name, cores)
	setColor(state.name, coresPossiveis[0])
	let neighbors = state.neighbors.sort((a,b) => {
		return buscaEstado(a).neighbors.length - buscaEstado(b).neighbors.length
	})
	
	console.log(neighbors);
	for (const neighbor of neighbors) {
		var color = buscaEstado(neighbor).color
		if (!color || color == defColor){
			yield* BuscaMenorConflito(neighbor, cores, lista_removido)
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
	algoritmoC
}


