// 1. Create node with existing label -> run it twice to show that NODE was not created on 2nd run
MERGE (tom:Actor {name: 'Tom Cruize'})
RETURN tom

MATCH(tom {name: 'Tom Cruize'})
RETURN tom

// 2. Different label -> show that we will get 2 results
MERGE (tom:Critic {name: 'Tom Cruize'})
RETURN tom

MATCH(tom {name: 'Tom Cruize'})
RETURN tom

// 3. Different property -> show that we will get 2 results
MERGE (tom:Critic {name: 'Tom Cruize', age: 30})
RETURN tom
// 3.1 Different property -> show that we will get 2 results
MERGE (tom:Critic:Actor {name: 'Tom Cruize', age: 30})
RETURN tom


// 4. Merge with ON CREATE
MERGE (tom:Person {name: 'Tom Cruize'})
ON CREATE
  SET tom.created = timestamp()
RETURN tom.name, tom.created

// 5. Merge with ON MATCH
MERGE (person:Person)
ON MATCH
  SET person.found = true
RETURN person.name, person.found

// 6. Merge with ON CREATE and ON MATCH
MERGE (keanu:Person {name: 'Tom Cruize'})
ON CREATE
  SET keanu.dateCraeted = timestamp()
ON MATCH
  SET keanu.dateUpdated = timestamp()
RETURN keanu.name, keanu.created, keanu.lastSeen

// 7. Merge single node derived from an existing node property
// Craete or do nothing -> city from each person's location 
// add
MATCH (person:Person)
MERGE (city:City {name: person.bornIn})
RETURN person.name, person.bornIn, city

// 6. Merge on a relationship
MATCH
  (person:Person {name: 'Tom Cruize'}),
  (movie:Movie {title: 'Mission: Impossible II'})
MERGE (charlie)-[:ACTED_IN]->(wallStreet)
RETURN charlie.name, type(r), wallStreet.title


// 7. Merge on multiple relationships
// will not use any of the existing Movies 
// already connected to either person. 
// Instead, a new 'movie' node is created.
MATCH
  (director:Director {name: 'Oliver Stone'}),
  (reiner:Person {name: 'Tom Cruize'})
MERGE (director)-[:DIRECTED]->(movie:Movie {name: 'random'})<-[:ACTED_IN]-(reiner)
RETURN movie

// 8. Using unique constraints with MERGE
// Additional security
CREATE CONSTRAINT FOR (n:Critic) REQUIRE n.name IS UNIQUE;
// OR list constraints
:schema

// 9. Merge with unique constraints and partial matches
MERGE (tom:Critic {name: 'Tom Cruize', age: 45})
                #RETURN michael
