var run = require(".");

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

it("should generate some results after a few tries", function(done) {
    console.log("Run for test 1");
    for (var i=0; i<5; i++) {
        var assignments = run(santas, couples, history);
        console.log("Results: "+ JSON.stringify(assignments, null, 4));
        if (assignments) {
            done();
            console.log("Run for test 1 complete");
            return;
        }
    }
    throw new Error("no workie workie");
});
