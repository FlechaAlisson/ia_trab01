import List from './Lista.js'

let border_list = {
    AC:  new List("AC"),
    AL:  new List("AL"),
    AP:  new List("AP"),
    AM:  new List("AM"),
    BA:  new List("BA"),
    CE:  new List("CE"),
    DF:  new List("DF"),
    ES:  new List("ES"),
    GO:  new List("GO"),
    MA:  new List("MA"),
    MT:  new List("MT"),
    MS:  new List("MS"),
    MG:  new List("MG"),
    PA:  new List("PA"),
    CE:  new List("CE"),
    PR:  new List("PR"),
    PE:  new List("PE"),
    RN:  new List("RN"),
    RS:  new List("RS"),
    RO:  new List("RO"),
    RR:  new List("RR"),
    SC:  new List("SC"),
    SP:  new List("SP"),
    SE:  new List("SE"),
    TO:  new List("TO"),        
}
border_list.AC.pushArray(["AM","RO"])
border_list.AL.pushArray(["SE","PE","BA"])
border_list.AP.pushArray(["PA"])
border_list.AM.pushArray(["AC","RO","MT","PA","RR"])
border_list.BA.pushArray(["GO","PI","PE","SE","GO","AL"])
border_list.CE.pushArray(["PE","RN","PA","PI"])
border_list.DF.pushArray(["GO","MG"])
border_list.ES.pushArray(["MG","RJ","BA"])
border_list.GO.pushArray(["MT","MS","BA","MG","TO","DF"])
border_list.MA.pushArray(["PI","TO","PA"])
border_list.MT.pushArray(["RO","AM","PA","TO","GO","MS"])
border_list.MS.pushArray(["MT","GO","SP","PR","MG"])
border_list.MG.pushArray(["SP","RG","ES","BA","DF","GO","MS"])
border_list.PA.pushArray(["MA","TO","MT","AM","RR","AP"])
border_list.CE.pushArray(["PB","RN","PI"])
border_list.PR.pushArray(["SC","RS","SP","MS"])
border_list.PE.pushArray(["AL","BA","PI","CE","PB"])
border_list.RN.pushArray(["CE","PB"])
border_list.RS.pushArray(["SC"])
border_list.RO.pushArray(["MT","AM","AC"])
border_list.RR.pushArray(["AM"])
border_list.SC.pushArray(["PR","RS"])
border_list.SP.pushArray(["PR","MS","MG","RJ"])
border_list.SE.pushArray(["BA","SE"])
border_list.TO.pushArray(["PA","MT","GO","BA","PI","MA"])


console.log(border_list)