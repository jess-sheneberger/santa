var maxTries = 500;

var santas = ["Allen","Jane", "Jess", "Katie", "Mary", "Molly", "Rod", "Sally", "Scott"];

var couples = {
   "Allen": "Mary",
   "Katie": "Scott",
   "Molly": "Rod",
   "Jess": "Sally",
   "Mary": "Allen",
   "Scott": "Katie",
   "Rod": "Molly",
   "Sally": "Jess"
};

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

var twoKnine = {
    "Allen" : "Jane",
    "Jane" : "Sally",
    "Jess" : "Molly",
    "Katie" : "Allen",
    "Mary" : "Jess",
    "Molly" : "Katie",
    "Rod" : "Mary",
    "Sally" : "Scott",
    "Scott" : "Rod"
};

var twentyTen = {
    "Allen" : "Rod",
    "Jane" : "Scott",
    "Jess" : "Katie",
    "Katie" : "Sally",
    "Mary" : "Molly",
    "Molly" : "Jane",
    "Rod" : "Allen",
    "Sally" : "Mary",
    "Scott" : "Jess"
};

var twentyEleven = {
   "Allen": "Katie",
   "Jane": "Mary",
   "Jess": "Jane",
   "Katie": "Rod",
   "Mary": "Jess",
   "Molly": "Sally",
   "Rod": "Scott",
   "Sally": "Allen",
   "Scott": "Molly"
};

var twentyTwelve = {
   "Allen": "Jane",
   "Jane": "Jess",
   "Jess": "Mary",
   "Katie": "Sally",
   "Mary": "Katie",
   "Molly": "Allen",
   "Rod": "Jess",
   "Sally": "Molly",
   "Scott": "Rod"
};

// add all the Santas to the pool
var pool = JSON.parse(JSON.stringify(santas));

console.log("Un-Secret Santa for Christmas " + new Date().getFullYear());

var assignments = {};
// shuffle the santas first
santas = shuffle(santas);
// go through each santa
for (var i=0; i<santas.length; i++) {
    var santa = santas[i];

    // randomly pick a recipient from the pool
    var candidate = pool[Math.floor(Math.random() * pool.length)];

    // Was this santa assigned their spouse? or themselves? 
    // or the person they got last year? 
    // or have we already assigned all the possibilites?
    var tries = 0;
    while (tries < maxTries &&
        (santa === candidate ||
        couples[santa] === candidate ||
        twoKnine[santa] === candidate ||
        twentyTen[santa] === candidate ||
        twentyEleven[santa] === candidate ||
        twentyTwelve[santa] === candidate ||
        assignments[candidate] === santa)) {
        // redraw until they are not assigned their spouse
        candidate = pool[Math.floor(Math.random() * pool.length)];
        tries++;
    }

    if (tries >= maxTries) {
        console.log("Uhoh!  Couldn't pick who " + santa + " will give a gift to.  Options were:");
        pool.forEach(function(e) {
            console.log(e);
        });
        console.log("Better try again!");
        return;
    }

    assignments[santa] = candidate;
    console.log(santa +" gives a gift to " + candidate);

    // remove the recipient from the pool so they don't get more than one gift
    pool = pool.filter(function(p) {
        return p !== candidate;
    });
}

//+ Jonas Raoni Soares Silva
////@ http://jsfromhell.com/array/shuffle [v1.0]

function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
