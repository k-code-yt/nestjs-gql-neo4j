// # Create single 
CREATE (n) / 

// # Create with properties
CREATE (n:Person {name: 'Andy', title: 'Developer'})

// # Create multiple nodes
CREATE (n), (m)

// # Create node with a label / multiple
CREATE (dev:Developer) / CREATE (n:Person:Developer)

CREATE (Johny:Person:Developer {name: 'Johny'})-[:WORKS_AT]->(workplace:Workplace {title: 'Google'})-[:LOCATED_AT]->(city:City {name: 'Mountain View', state: 'California'})<-[:BORN_IN {year: '2000'}]
RETURN Johny, workplace



// # Create only relation
MATCH
  (a:Person),
  (b:Person)
WHERE a.name = 'A' AND b.name = 'B'
CREATE (a)-[r:RELTYPE]->(b)
RETURN type(r)

// # Create entire path
CREATE p = (andy {name:'Andy'})-[:WORKS_AT]->(neo)<-[:WORKS_AT]-(michael {name: 'Michael'})
RETURN p


// # Propblems -> dublication