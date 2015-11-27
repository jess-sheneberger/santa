var maxTries = 500;

function run(santas, couples, history) {
    // add all the Santas to the pool
    var pool = JSON.parse(JSON.stringify(santas));

    var assignments = {};
    // shuffle the santas first
    santas = shuffle(santas);
    // go through each santa
    for (var i = 0; i < santas.length; i++) {
        var santa = santas[i];

        // randomly pick a recipient from the pool
        var candidate = pool[Math.floor(Math.random() * pool.length)];

        var tries = 0;
        while (tries < maxTries && // have we run out of retries?
            (santa === candidate || // Was this santa assigned themselves? 
                couples[santa] === candidate || // or their spouse?
                inHistory(santa, candidate, history) || // or the person they got at some point in history?
                assignments[candidate] === santa)) { // or we've created a 1-cycle loop? (IE A -> B, B -> A)
            candidate = pool[Math.floor(Math.random() * pool.length)];
            tries++;
        }

        if (tries >= maxTries) {
            console.log("Uhoh!  Couldn't pick who " + santa + " will give a gift to.  Options were:");
            pool.forEach(function(e) {
                console.log(e);
            });
            console.log("Better try again!");
            return null;
        }

        assignments[santa] = candidate;

        // remove the recipient from the pool so they don't get more than one gift
        pool = pool.filter(function(p) {
            return p !== candidate;
        });
    }

    return assignments;
}

function inHistory(santa, candidate, history) {
    var years = Object.keys(history);
    for (var i = 0; i < years.length; i++) {
        var year = years[i];
        if (history[year][santa] === candidate) {
            return true;
        }
    }

    return false;
}

//+ Jonas Raoni Soares Silva
////@ http://jsfromhell.com/array/shuffle [v1.0]

function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

module.exports = run;
