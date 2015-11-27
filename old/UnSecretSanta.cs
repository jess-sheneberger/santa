using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UnsecretSanta
{
    class Program
    {
        static int maxTries = 500;
        
        static string[] Santas = { "Allen", "Jane", "Jess", "Katie", "Mary", "Molly", "Rod", "Sally", "Scott" };

        static Dictionary<string, string> Couples = new Dictionary<string, string> 
        { { "Allen", "Mary" }, 
          { "Katie", "Scott" },
          { "Molly", "Rod" },
          { "Jess", "Sally" },
          { "Mary", "Allen" }, 
          { "Scott", "Katie" },
          { "Rod", "Molly" },
          { "Sally", "Jess" }};

        //Allen gives a gift to Katie.
        //Jane gives a gift to Mary.
        //Jess gives a gift to Jane.
        //Katie gives a gift to Rod.
        //Mary gives a gift to Jess.
        //Molly gives a gift to Sally.
        //Rod gives a gift to Scott.
        //Sally gives a gift to Allen.
        //Scott gives a gift to Molly.


        static Dictionary<string, string> LastYear = new Dictionary<string, string>
        { { "Allen", "Katie" }, 
          { "Jane", "Mary" },
          { "Jess", "Jane" },
          { "Katie", "Rod" },
          { "Mary", "Jess" }, 
          { "Molly", "Sally" },
          { "Rod", "Scott" },
          { "Sally", "Allen" },
          { "Scott", "Molly" }};

        static void Main(string[] args)
        {
            Random r = new Random();
            List<string> Pool = new List<string>();
            
            // add all the Santas to the pool
            Pool.AddRange(Santas);

            Console.WriteLine("Super-random totally fair un-secret Santa yearly allocations for Christmas {0}:", DateTime.Now.Year);

            Dictionary<string, string> assignments = new Dictionary<string, string>();

            // go through each santa
            foreach (string santa in Santas)
            {
                // randomly pick a recipient from the pool
                string poolMember = Pool[r.Next(0, Pool.Count)];
                
                // Was this santa assigned their spouse? or themselves? 
                // or the person they got last year? 
                // or have we already assigned all the possibilites?
                int tries = 0;
                while (tries < maxTries &&
                       (santa == poolMember ||
                       (Couples.ContainsKey(santa) &&
                        Couples[santa] == poolMember) ||
                        LastYear[santa] == poolMember ||
                       (assignments.ContainsKey(poolMember) &&
                        assignments[poolMember] == santa)))
                {
                    // redraw until they are not assigned their spouse
                    poolMember = Pool[r.Next(0, Pool.Count)];
                    tries++;
                }

                if (tries >= maxTries)
                {
                    Console.WriteLine("Uhoh!  Couldn't pick who {0} will give a gift to.  Options were:",
                        santa);
                    Pool.ForEach(new Action<string>(e => Console.WriteLine(e)));
                    Console.WriteLine("Better try again!");
                    return;
                }

                assignments[santa] = poolMember;
                Console.WriteLine(string.Format("{0} gives a gift to {1}.", santa, poolMember));
                
                // remove the recipient from the pool so they don't get more than one gift
                Pool.Remove(poolMember);
            }
        }
    }
}
