﻿
var flags = require("flags");
var run = require('.');

var santas = [
    "Allen", 
    "Chris", 
    "Jess", 
    "Mary", 
    "Rod", 
    "Scott",
    "Jane", 
    "Katie", 
    "Molly", 
    "Sally"
];

var juniorSantas = [
    "Tate",
    "Bode",
    "Charlie",
    "Claire",
    "Ellen",
    "Eloise",
    "Michael"
];

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

var juniorSibs = {
    "Claire": "Ellen",
    "Ellen": "Claire",
    "Eloise": "Michael",
    "Michael": "Eloise",
    "Bode": "Tate",
    "Tate": "Bode"
}

// 2018: {
//     "Sally": "Molly",
//     "Katie": "Sally",
//     "Scott": "Jess",
//     "Mary": "Jane",
//     "Jane": "Scott",
//     "Molly": "Allen",
//     "Chris": "Mary",
//     "Rod": "Chris",
//     "Jess": "Katie",
//     "Allen": "Rod"
// }

// 2017:  {
//     "Chris": "Katie",
//     "Sally": "Rod",
//     "Molly": "Chris",
//     "Allen": "Molly",
//     "Scott": "Sally",
//     "Jane": "Allen",
//     "Jess": "Jane",
//     "Katie": "Mary",
//     "Mary": "Jess",
//     "Rod": "Scott"
// }

// 2016:
// {
//     "Mary": "Chris",
//     "Allen": "Sally",
//     "Jess": "Rod",
//     "Jane": "Katie",
//     "Scott": "Molly",
//     "Molly": "Jane",
//     "Sally": "Scott",
//     "Rod": "Mary",
//     "Katie": "Jess",
//     "Chris": "Allen"
// }

// 2015: 
// Scott gives a gift to Jane
// Chris gives a gift to Jess
// Sally gives a gift to Chris
// Mary gives a gift to Scott
// Allen gives a gift to Katie
// Rod gives a gift to Allen
// Molly gives a gift to Sally
// Jane gives a gift to Mary
// Katie gives a gift to Rod
// Jess gives a gift to Molly

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
    /*    2009: {
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
    },
    2015: {
        "Scott": "Jane",
        "Chris": "Jess",
        "Sally": "Chris",
        "Mary": "Scott",
        "Allen": "Katie",
        "Rod": "Allen",
        "Molly": "Sally",
        "Jane": "Mary",
        "Katie": "Rod",
        "Jess": "Molly"
    },
    2016: {
        "Mary": "Chris",
        "Allen": "Sally",
        "Jess": "Rod",
        "Jane": "Katie",
        "Scott": "Molly",
        "Molly": "Jane",
        "Sally": "Scott",
        "Rod": "Mary",
        "Katie": "Jess",
        "Chris": "Allen"
    }
    2017:  {
        "Chris": "Katie",
        "Sally": "Rod",
        "Molly": "Chris",
        "Allen": "Molly",
        "Scott": "Sally",
        "Jane": "Allen",
        "Jess": "Jane",
        "Katie": "Mary",
        "Mary": "Jess",
        "Rod": "Scott"
    },
    2018: {
        "Sally": "Molly",
        "Katie": "Sally",
        "Scott": "Jess",
        "Mary": "Jane",
        "Jane": "Scott",
        "Molly": "Allen",
        "Chris": "Mary",
        "Rod": "Chris",
        "Jess": "Katie",
        "Allen": "Rod"
    },*/
    2019: {
        "Jane": "Molly",
        "Katie": "Jane",
        "Sally": "Katie",
        "Molly": "Sally"
    }
};

let juniorHistory = {
    2021: {
        "Eloise": "Charlie",
        "Bode": "Eloise",
        "Tate": "Claire",
        "Claire": "Michael",
        "Michael": "Ellen",
        "Ellen": "Tate",
        "Charlie": "Bode"
    },
    2019:  {
        "Claire": "Eloise",
        "Charlie": "Claire",
        "Ellen": "Bode",
        "Michael": "Charlie",
        "Eloise": "Ellen",
        "Bode": "Michael"
    }    
}

flags.defineBoolean("junior", false, "Run Junior Secret Santa");
flags.parse();

if (flags.get("junior")) {
    var jrAssn = run(juniorSantas, juniorSibs, juniorHistory);

    console.log("Junior Un-Secret Santa for Christmas " + new Date().getFullYear());
    console.log("Results: ", JSON.stringify(jrAssn, null, 4));
    
} else {
    var assignments = run(santas, couples, history);

    console.log("Un-Secret Santa for Christmas " + new Date().getFullYear());
    console.log("Results: ", JSON.stringify(assignments, null, 4));
} 

