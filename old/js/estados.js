const defColor = '#dbcc72';
let int_num = 0
let border_list = {
  AC: {
    name: "AC",
    neighbors: ["AM", "RO"],
    color: undefined
  },
  AL: {
    name: "AL",
    neighbors: ["SE", "PE", "BA"],
    color: undefined
  },
  AP: {
    name: "AP",
    neighbors: ["PA"],
    color: undefined
  },
  AM: {
    name: "AM",
    neighbors: ["AC", "RR", "RO", "MT", "PA"],
    color: undefined
  },
  BA: {
    name: "BA",
    neighbors: ["MG", "PI", "PE", "SE", "GO", "AL"],
    color: undefined
  },
  CE: {
    name: "CE",
    neighbors: ["PB", "RN", "PI", "PE"],
    color: undefined
  },
  DF: {
    name: "DF",
    neighbors: ["GO", "MG"],
    color: undefined
  },
  ES: {
    name: "ES",
    neighbors: ["MG", "RJ", "BA"],
    color: undefined
  },
  GO: {
    name: "GO",
    neighbors: ["MT", "MS", "BA", "MG", "TO", "DF"],
    color: undefined
  },
  MA: {
    name: "MA",
    neighbors: ["PI", "TO", "PA"],
    color: undefined
  },
  MT: {
    name: "MT",
    neighbors: ["RO", "AM", "PA", "TO", "GO", "MS"],
    color: undefined
  },
  MS: {
    name: "MS",
    neighbors: ["MT", "GO", "SP", "PR", "MG"],
    color: undefined
  },
  MG: {
    name: "MG",
    neighbors: ["SP", "RJ", "ES", "BA", "DF", "GO", "MS"],
    color: undefined
  },
  PA: {
    name: "PA",
    neighbors: ["AP", "MA", "TO", "MT", "AM", "RR"],
    color: undefined
  },
  PR: {
    name: "PR",
    neighbors: ["SC", "SP", "MS"],
    color: undefined
  },
  PE: {
    name: "PE",
    neighbors: ["AL", "BA", "PI", "CE", "PB"],
    color: undefined
  },
  RN: {
    name: "RN",
    neighbors: ["CE", "PB"],
    color: undefined
  },
  RS: {
    name: "RS",
    neighbors: ["SC"],
    color: undefined
  },
  RO: {
    name: "RO",
    neighbors: ["MT", "AM", "AC"],
    color: undefined
  },
  RR: {

    name: "RR",
    neighbors: ["AM", 'PA'],
    color: undefined
  },
  SC: {
    name: "SC",
    neighbors: ["PR", "RS"],
    color: undefined
  },
  SP: {
    name: "SP",
    neighbors: ["PR", "MS", "MG", "RJ"],
    color: undefined
  },
  SE: {
    name: "SE",
    neighbors: ["BA", "AL", "SE"],
    color: undefined
  },
  TO: {
    name: "TO",
    neighbors: ["PA", "MT", "GO", "BA", "PI", "MA"],
    color: undefined
  },
  PI: {
    name: "PI",
    neighbors: ["CE", "PE", "BA", "TO", "MA"],
    color: undefined
  },
  RJ: {
    name: "RJ",
    neighbors: ["ES", "MG", "SP"],
    color: undefined
  },
  PB: {
    name: "PB",
    neighbors: ["RN", "CE", "PE"],
    color: undefined
  },
}



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
  state.neighbors.forEach(e => {
    let aux = buscaEstado(e)
    cores = cores.filter(c => c !== aux.color)
  });

  return cores
}

function* largura(nome, cores) {
  int_num++
  console.log(int_num);
  //Busca a instância do Estado
  const state = buscaEstado(nome)
  //Busca as cores possíveis
  const cor = getCor(nome, cores)
  //seta a cor
  setColor(nome, cor[0])
  //Para todo vizinho, chama recursivamente

  yield nome

  for (let neighbor of state.neighbors) {
    let aux = border_list[`${neighbor}`]
    if (aux.color == undefined) {
      yield* largura(aux.name, cores)
    }
  }

}

function * BuscaMenorConflito(name, cores) {
  console.log(name);
  int_num++
  console.log(int_num);
  yield name
  let state = buscaEstado(name)
  let coresPossiveis = getCor(name, cores)
  setColor(state.name, coresPossiveis[0])
  let neighbors = state.neighbors.sort((a,b) => {
    return buscaEstado(b).neighbors.length - buscaEstado(a).neighbors.length
  })
  

  for (const neighbor of neighbors) {
    if (buscaEstado(neighbor).color === undefined){
      yield* BuscaMenorConflito(neighbor,cores)}
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
  reset
}


