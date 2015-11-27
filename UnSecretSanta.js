var maxTries = 500;

var santas = ["Allen", "Chris", "Jane", "Jess", "Katie", "Mary", "Molly", "Rod", "Sally", "Scott"];

var couples = {
    "Jane": "Chris",
    "Chris": "Jane",
    "Allen": "Mary",
    "Katie": "Scott",
    "Molly": "Rod",
    "Jess": "Sally",
    "Mary": "Allen",
    "Scott": "Katie",
    "Rod": "Molly",
    "Sally": "Jess"
};

// 2014: 
// Sally gives a gift to Jane
// Jess gives a gift to Scott
// Rod gives a gift to Katie
// Allen gives a gift to Jess
// Molly gives a gift to Mary
// Jane gives a gift to Rod
// Mary gives a gift to Sally
// Scott gives a gift to Allen
// Katie gives a gift to Molly

// 2013: 
// Rod gives a gift to Sally
// Jess gives a gift to Allen
// Molly gives a gift to Jess
// Mary gives a gift to Rod
// Scott gives a gift to Mary
// Sally gives a gift to Katie
// Jane gives a gift to Molly
// Katie gives a gift to Jane
// Allen gives a gift to Scott

// 2012:
// Allen gives a gift to Jane.
// Jane gives a gift to Scott.
// Jess gives a gift to Mary.
// Katie gives a gift to Sally.
// Mary gives a gift to Katie.
// Molly gives a gift to Allen.
// Rod gives a gift to Jess.
// Sally gives a gift to Molly.
// Scott gives a gift to Rod.

// 2011:
// Allen gives a gift to Katie.
// Jane gives a gift to Mary.
// Jess gives a gift to Jane.
// Katie gives a gift to Rod.
// Mary gives a gift to Jess.
// Molly gives a gift to Sally.
// Rod gives a gift to Scott.
// Sally gives a gift to Allen.
// Scott gives a gift to Molly.

// 2010: 
// Allen gives a gift to Rod.
// Jane gives a gift to Scott.
// Jess gives a gift to Katie.
// Katie gives a gift to Sally.
// Mary gives a gift to Molly.
// Molly gives a gift to Jane.
// Rod gives a gift to Allen.
// Sally gives a gift to Mary.
// Scott gives a gift to Jess.

// 2009:
// Allen gives a gift to Jane.
// Jane gives a gift to Sally.
// Jess gives a gift to Molly.
// Katie gives a gift to Allen.
// Mary gives a gift to Jess.
// Molly gives a gift to Katie.
// Rod gives a gift to Mary.
// Sally gives a gift to Scott.
// Scott gives a gift to Rod.

var history = {
    2009: {
        "Allen": "Jane",
        "Jane": "Sally",
        "Jess": "Molly",
        "Katie": "Allen",
        "Mary": "Jess",
        "Molly": "Katie",
        "Rod": "Mary",
        "Sally": "Scott",
        "Scott": "Rod"
    },
    2010: {
        "Allen": "Rod",
        "Jane": "Scott",
        "Jess": "Katie",
        "Katie": "Sally",
        "Mary": "Molly",
        "Molly": "Jane",
        "Rod": "Allen",
        "Sally": "Mary",
        "Scott": "Jess"
    },
    2011: {
        "Allen": "Katie",
        "Jane": "Mary",
        "Jess": "Jane",
        "Katie": "Rod",
        "Mary": "Jess",
        "Molly": "Sally",
        "Rod": "Scott",
        "Sally": "Allen",
        "Scott": "Molly"
    },
    2012: {
        "Allen": "Jane",
        "Jane": "Jess",
        "Jess": "Mary",
        "Katie": "Sally",
        "Mary": "Katie",
        "Molly": "Allen",
        "Rod": "Jess",
        "Sally": "Molly",
        "Scott": "Rod"
    },
    2013: {
        "Rod": "Sally",
        "Jess": "Allen",
        "Molly": "Jess",
        "Mary": "Rod",
        "Scott": "Mary",
        "Sally": "Katie",
        "Jane": "Molly",
        "Katie": "Jane",
        "Allen": "Scott"
    },
    2014: {
        "Sally": "Jane",
        "Jess": "Scott",
        "Rod": "Katie",
        "Allen": "Jess",
        "Molly": "Mary",
        "Jane": "Rod",
        "Mary": "Sally",
        "Scott": "Allen",
        "Katie": "Molly"
    }
};

var assignments = run(santas, couples, history);

console.log("Un-Secret Santa for Christmas " + new Date().getFullYear());
console.log("Results: ", JSON.stringify(assignments, null, 4));

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
                inHistory(santa, candidate) || // or the person they got at some point in history?
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

function inHistory(santa, candidate) {
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
