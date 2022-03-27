// # No action will be taken if the node expression evaluates to null, as shown in this example:
MATCH (n {name: 'Andy'})
SET (CASE WHEN n.age = 36 THEN n END).worksIn = 'Malmo'
RETURN n.name, n.worksIn

// ## Remove a property
MATCH (n {name: 'Andy'})
SET n.name = null
RETURN n.name, n.age

// # Copy properties between nodes and relationships
MATCH
  (at {name: 'Andy'}),
  (pn {name: 'Peter'})
SET at = pn
RETURN at.name, at.age, at.hungry, pn.name, pn.age


// # Replace all properties using a map and =
// This query updated the name property from Peter to Peter Smith, deleted the age property, and added the position property to the 'Peter' node.
MATCH (p {name: 'Peter'})
SET p = {name: 'Peter Smith', position: 'Entrepreneur'}
RETURN p.name, p.age, p.position

// # Mutate specific properties using a map and +=
// providing an empty map as the right operand to += will not remove any existing properties from a node or relationship.
MATCH (p {name: 'Peter'})
SET p += {age: 38, hungry: true, position: 'Entrepreneur'}
RETURN p.name, p.age, p.hungry, p.position

// # Set a label on a node
MATCH (n {name: 'Stefan'})
SET n:German
RETURN n.name, labels(n) AS labels

SET n:Swedish:Bossman