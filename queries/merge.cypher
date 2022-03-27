// 1. Merge sinle Node with label / with properties 
// -> show that it creates new acc if one of the props does not match
MERGE (robert:Critic) / MERGE (charlie {name: 'Charlie Sheen', age: 10})
RETURN robert, labels(robert) / charlie

// 2. Merge single node derived from an existing node property
// Craete or do nothing -> city from each person's location 
// add
MATCH (person:Person)
MERGE (city:City {name: person.bornIn})
RETURN person.name, person.bornIn, city

// 3. Merge with ON CREATE
MERGE (keanu:Person {name: 'Keanu Reeves'})
ON CREATE
  SET keanu.created = timestamp()
RETURN keanu.name, keanu.created

// 4. Merge with ON MATCH
MERGE (person:Person)
ON MATCH
  SET person.found = true
RETURN person.name, person.found

// 5. Merge with ON CREATE and ON MATCH
MERGE (keanu:Person {name: 'Keanu Reeves'})
ON CREATE
  SET keanu.dateCraeted = timestamp()
ON MATCH
  SET keanu.dateUpdated = timestamp()
RETURN keanu.name, keanu.created, keanu.lastSeen

// 6. Merge on a relationship
MATCH
  (charlie:Person {name: 'Charlie Sheen'}),
  (wallStreet:Movie {title: 'Wall Street'})
MERGE (charlie)-[r:ACTED_IN]->(wallStreet)
RETURN charlie.name, type(r), wallStreet.title


// 7. Merge on multiple relationships
// will not use any of the existing Movies 
// already connected to either person. 
// Instead, a new 'movie' node is created.
MATCH
  (oliver:Person {name: 'Oliver Stone'}),
  (reiner:Person {name: 'Rob Reiner'})
MERGE (oliver)-[:DIRECTED]->(movie:Movie)<-[:ACTED_IN]-(reiner)
RETURN movie

// 8. Using unique constraints with MERGE
// Additional security
CREATE CONSTRAINT FOR (n:Person) REQUIRE n.name IS UNIQUE;
// OR list constraints
:schema

// 9. Merge with unique constraints and partial matches
MERGE (michael:Person {name: 'Michael Douglas', role: 'Gordon Gekko'})
                #RETURN michael
