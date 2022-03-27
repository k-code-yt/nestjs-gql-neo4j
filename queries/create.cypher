// # Create single / multiple node
CREATE (n) / CREATE (n), (m)

// # Create node with a label / multiple
CREATE (n:Person) / CREATE (n:Person:Swedish)

// # Create with properties
CREATE (n:Person {name: 'Andy', title: 'Developer'})

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