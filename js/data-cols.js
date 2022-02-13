const goals_data = [
  {"goal":"Quality of work performed","top_5":79,"top_1":49,"no":0,"small":7,"mod":45,"sig":48,"am.no":0,"am.sm":0,"am.mod":40,"am.sig":60,"eu.no":0,"eu.sm":0,"eu.mod":62,"eu.sig":38},
  {"goal":"Business transformation, innovation and growth","top_5":65,"top_1":19,"no":6,"small":36,"mod":32,"sig":25,"am.no":0,"am.sm":27,"am.mod":47,"am.sig":26,"eu.no":9,"eu.sm":38,"eu.mod":27,"eu.sig":25},
  {"goal":"Digital environment and capability","top_5":38,"top_1":7,"no":3,"small":36,"mod":46,"sig":15,"am.no":10,"am.sm":30,"am.mod":60,"am.sig":0,"eu.no":2,"eu.sm":37,"eu.mod":44,"eu.sig":17},
  {"goal":"Organizational performance","top_5":37,"top_1":7,"no":3,"small":23,"mod":35,"sig":38,"am.no":0,"am.sm":0,"am.mod":33,"am.sig":67,"eu.no":4,"eu.sm":29,"eu.mod":35,"eu.sig":31},
  {"goal":"Employee engagement and motivation","top_5":33,"top_1":3,"no":4,"small":27,"mod":36,"sig":32,"am.no":0,"am.sm":33,"am.mod":13,"am.sig":53,"eu.no":6,"eu.sm":26,"eu.mod":36,"eu.sig":32},
  {"goal":"Development of agile working","top_5":32,"top_1":2,"no":5,"small":23,"mod":45,"sig":26,"am.no":5,"am.sm":29,"am.mod":48,"am.sig":19,"eu.no":2,"eu.sm":24,"eu.mod":38,"eu.sig":35},
  {"goal":"Learning culture","top_5":32,"top_1":5,"no":4,"small":24,"mod":36,"sig":37,"am.no":0,"am.sm":15,"am.mod":38,"am.sig":46,"eu.no":6,"eu.sm":26,"eu.mod":31,"eu.sig":37},
  {"goal":"Organizational reputation","top_5":29,"top_1":1,"no":5,"small":23,"mod":45,"sig":26,"am.no":0,"am.sm":0,"am.mod":50,"am.sig":50,"eu.no":14,"eu.sm":28,"eu.mod":43,"eu.sig":14},
  {"goal":"Organizational problem solving","top_5":29,"top_1":5,"no": 2,"small":10,"mod":35,"sig":50,"am.no":0,"am.sm":8,"am.mod":41,"am.sig":50,"eu.no":3,"eu.sm":11,"eu.mod":33,"eu.sig":53},
  {"goal":"Talent strategies","top_5":28,"top_1":2,"no":6,"small":29,"mod":35,"sig":29,"am.no":0,"am.sm":38,"am.mod":6,"am.sig":56,"eu.no":9,"eu.sm":30,"eu.mod":44,"eu.sig":19},
  {"goal":"Customer satisfaction","top_5":26,"top_1":1,"no":6,"small":29,"mod":38,"sig":27,"am.no":9,"am.sm":18,"am.mod":27,"am.sig":45,"eu.no":5,"eu.sm":32,"eu.mod":41,"eu.sig":22},
  {"goal":"Business intelligence","top_5":25,"top_1":1,"no":18,"small":26,"mod":44,"sig":12,"am.no":25,"am.sm":50,"am.mod":25,"am.sig":0,"eu.no":16,"eu.sm":24,"eu.mod":48,"eu.sig":12},
  {"goal":"Employee productivity","top_5":24,"top_1":3,"no":9,"small":28,"mod":28,"sig":35,"am.no":18,"am.sm":9,"am.mod":9,"am.sig":64,"eu.no":6,"eu.sm":34,"eu.mod":34,"eu.sig":25},
  {"goal":"Reduction of operational costs","top_5":22,"top_1":4,"no":18,"small":50,"mod":20,"sig":13,"am.no":8,"am.sm":38,"am.mod":23,"am.sig":31,"eu.no":23,"eu.sm":53,"eu.mod":20,"eu.sig":5},
  {"goal":"Attraction of talent","top_5":22,"top_1":2,"no":3,"small":22,"mod":33,"sig":41,"am.no":0,"am.sm":17,"am.mod":16,"am.sig":67,"eu.no":5,"eu.sm":23,"eu.mod":35,"eu.sig":37},
  {"goal":"Improvement of future critical capabilities","top_5":18,"top_1":4,"no":12,"small":24,"mod":48,"sig":17,"am.no":9,"am.sm":36,"am.mod":36,"am.sig":18,"eu.no":12,"eu.sm":19,"eu.mod":52,"eu.sig":16},
  {"goal":"Business expansion","top_5":16,"top_1":4,"no":17,"small":40,"mod":36,"sig":7,"am.no":33,"am.sm":33,"am.mod":25,"am.sig":8,"eu.no":8,"eu.sm":44,"eu.mod":44,"eu.sig":4},
  {"goal":"Communication and teamwork","top_5":14,"top_1":1,"no":3,"small":18,"mod":53,"sig":26,"am.no":0,"am.sm":18,"am.mod":73,"am.sig":9,"eu.no":4,"eu.sm":17,"eu.mod":43,"eu.sig":35},
  {"goal":"Staff retention","top_5":12,"top_1":0,"no":4,"small":26,"mod":22,"sig":48,"am.no":0,"am.sm":27,"am.mod":9,"am.sig":64,"eu.no":6,"eu.sm":25,"eu.mod":31,"eu.sig":38},
  {"goal":"Staff compliance","top_5":11,"top_1":0,"no":3,"small":23,"mod":55,"sig":19,"am.no":0,"am.sm":40,"am.mod":50,"am.sig":24,"eu.no":5,"eu.sm":14,"eu.mod":57,"eu.sig":24},
  {"goal":"Learning in the workflow","top_5":10,"top_1":0,"no":9,"small":41,"mod":33,"sig":17,"am.no":0,"am.sm":30,"am.mod":50,"am.sig":20,"eu.no":11,"eu.sm":44,"eu.mod":28,"eu.sig":17}
].reverse();

const contrib_color = d3.scaleOrdinal()
                        .domain(["no", "small", "mod", "sig"])
                        .range(["#fe3298", "#fe3298", "#329799", "#329799"])

const concern_data = [
  {"barrier": "Focus on short term issues", "extreme":34,"some":39,"none":27,"e.am":28,"s.am":52,"n.am":20,"e.eu":35,"s.eu":39,"n.eu":26},
  {"barrier": "Lack of investment or shortage of resources","extreme":29,"some":48,"none":23,"e.am":44,"s.am":36,"n.am":20,"e.eu":24,"s.eu":51,"n.eu":25},
  {"barrier": "Lack of high-quality content","extreme":21,"some":50,"none":29,"e.am":16,"s.am":44,"n.am":40,"e.eu":21,"s.eu":52,"n.eu":27},
  {"barrier": "Lack of strategic L&D influence","extreme":18,"some":55,"none":27,"e.am":13,"s.am":58,"n.am":29,"e.eu":19,"s.eu":54,"n.eu":27},
  {"barrier": "Organizational learning is not valued enough","extreme":22,"some":47,"none":31,"e.am":16,"s.am":52,"n.am":32,"e.eu":22,"s.eu":48,"n.eu":31},
  {"barrier": "Employees cannot manage own learning","extreme":18,"some":51,"none":31,"e.am":24,"s.am":48,"n.am":28,"e.eu":16,"s.eu":49,"n.eu":36},
  {"barrier": "Unreliable IT infrastructure","extreme":17,"some":39,"none":44,"e.am":36,"s.am":28,"n.am":36,"e.eu":11,"s.eu":41,"n.eu":49},
  {"barrier": "Reluctance of managers to engage with learning","extreme":15,"some":40,"none":45,"e.am":20,"s.am":32,"n.am":48,"e.eu":8,"s.eu":44,"n.eu":48},
  {"barrier": "Structural change of the learning team","extreme":14,"some":40,"none":46,"e.am":16,"s.am":28,"n.am":56,"e.eu":12,"s.eu":42,"n.eu":46},
  {"barrier": "Focus on individual rather than team success","extreme":9,"some":46,"none":45,"e.am":0,"s.am":50,"n.am":50,"e.eu":10,"s.eu":45,"n.eu":45},
].reverse();

const compare_data = [
  {"goal": "Innovation and business growth","leader":"2nd","ld_rank":"15th+","ld_ach":21,"tp":38},
  {"goal": "Organizational performance","leader":"4th","ld_rank":"5th","ld_ach":25,"tp":45},
  {"goal": "Employee engagement","leader":"5th","ld_rank":"3rd","ld_ach":24,"tp":46},
  {"goal": "Learning culture","leader":"7th","ld_rank":"1st","ld_ach":22,"tp":38},
  {"goal": "Business intelligence","leader":"12th","ld_rank":"15th+","ld_ach":16,"tp":26},
  {"goal": "Job productivity","leader":"14th","ld_rank":"15th+","ld_ach":27,"tp":50},
  {"goal": "Communication and teamwork","leader":"15th+","ld_rank":"9th","ld_ach":28,"tp":49},
  {"goal": "Learning within the workflow","leader":"15th+","ld_rank":"15th+","ld_ach":20,"tp":26},
  {"goal": "Attracting talent","leader":"15th+","ld_rank":"15th+","ld_ach":34,"tp":61},
  {"goal": "Compliance with regulations","leader":"15th+","ld_rank":"15th+","ld_ach":64,"tp":81},
  {"goal": "Business expansion","leader":"15th+","ld_rank":"15th+","ld_ach":25,"tp":24}
]
