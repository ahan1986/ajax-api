var topics = ["Charmander", "Pickachu", "Bulbasaur", "Squirtle", "Ghastly"];

var a = topics.map(x=> $("#myButtons").append("<button>"+ x + "</button"));
console.log(topics);