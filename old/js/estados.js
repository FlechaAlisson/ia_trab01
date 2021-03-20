
let border_list = {
  AC: {
    name:"AC",
    neighbors: ["AM", "RO"],
    visited: false
  },
  AL: {
    name:"AL",
    neighbors: ["SE", "PE", "BA"],
    visited: false
  },
  AP: {
    name:"AP",
    neighbors: ["PA"],
    visited: false
  },
  AM: {
    name:"AM",
    neighbors: ["AC", "RO", "MT", "PA", "RR"],
    visited: false
  },
  BA: {
    name:"BA",
    neighbors: ["GO", "PI", "PE", "SE", "GO", "AL"],
    visited: false
  },
  CE: {
    name:"CE",
    neighbors: ["PB", "RN", "PI", "PE"],
    visited: false
  },
  DF: {
    name:"DF",
    neighbors: ["GO", "MG"],
    visited: false
  },
  ES: {
    name:"ES",
    neighbors: ["MG", "RJ", "BA"],
    visited: false
  },
  GO: {
    name:"GO",
    neighbors: ["MT", "MS", "BA", "MG", "TO", "DF"],
    visited: false
  },
  MA: {
    name:"MA",
    neighbors: ["PI", "TO", "PA"],
    visited: false
  },
  MT: {
    name:"MT",
    neighbors: ["RO", "AM", "PA", "TO", "GO", "MS"],
    visited: false
  },
  MS: {
    name:"MS",
    neighbors: ["MT", "GO", "SP", "PR", "MG"],
    visited: false
  },
  MG: {
    name:"MG",
    neighbors: ["SP", "RJ", "ES", "BA", "DF", "GO", "MS"],
    visited: false
  },
  PA: {
    name:"PA",
    neighbors: ["MA", "TO", "MT", "AM", "RR", "AP"],
    visited: false
  },
  PR: {
    name:"PR",
    neighbors: ["SC", "RS", "SP", "MS"],
    visited: false
  },
  PE: {
    name:"PE",
    neighbors: ["AL", "BA", "PI", "CE", "PB"],
    visited: false
  },
  RN: {
    name:"RN",
    neighbors: ["CE", "PB"],
    visited: false
  },
  RS: {
    name:"RS",
    neighbors: ["SC"],
    visited: false
  },
  RO: {
    name:"RO",
    neighbors: ["MT", "AM", "AC"],
    visited: false
  },
  RR: {
    name:"RR",
    neighbors: ["AM"],
    visited: false
  },
  SC: {
    name:"SC",
    neighbors: ["PR", "RS"],
    visited: false
  },
  SP: {
    name:"SP",
    neighbors: ["PR", "MS", "MG", "RJ"],
    visited: false
  },
  SE: {
    name:"SE",
    neighbors: ["BA", "SE"],
    visited: false
  },
  TO: {
    name:"TO",
    neighbors: ["PA", "MT", "GO", "BA", "PI", "MA"],
    visited: false
  },
  PI: {
    name:"PI",
    neighbors: ["CE", "PE", "BA", "TO", "MA"],
    visited: false
  },
  RJ: {
    name:"RJ",
    neighbors: ["ES", "MG", "SP"],
    visited: false
  },
  PB: {
    name:"PB",
    neighbors: ["RN", "CE", "PE"],
    visited: false
  },
}

console.log(border_list)

hill(border_list.AC)

function percorre(state) {
  console.log(state)
  state.visited = true
  state.neighbors.forEach(e => {
    let aux = border_list[`${e}`]
    console.log(aux)
    if (aux.visited != true)
      percorre(aux)
  });
}

function hill(state) {
  console.log("============")
  if (state.visited != false)
    return;
  console.log("ESTADO ATUAL:",state)
  state.visited = true
  let vizinhos = []
  state.neighbors.forEach(e => {
    vizinhos.push(border_list[`${e}`])
  })
  //pega o vizinho com o menor numeros de vizinhos
  
  let next = vizinhos.reduce((prev, curr) => prev.Cost < curr.Cost ? prev : curr)
  next.neighbors = next.neighbors.filter(function (value,index,arr) {
    return value !== state.name
  })
  console.log("VIZINHOS FILTRADOS: ",next)
  console.log("PROXIMO:", next)
  
  hill(next)

}




