var run = require("./UnsecretSanta.js");

var santas = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" ];

var couples = {
    "A": "B",
    "C": "D",
    "E": "F",
    "G": "H",
    "I": "J"
};

Object.keys(couples).forEach(function(z) {
    var x = couples[z];
    couples[x] = z;
});

var history = {
}

it("should generate some results", function(done) {
    console.log("Run for test 1");
    var assignments = run(santas, couples, history);
    console.log("Results: "+ JSON.stringify(assignments, null, 4));
    done();
    console.log("Run for test 1 complete");
});
