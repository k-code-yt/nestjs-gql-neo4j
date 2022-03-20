
# return entire node 
MATCH(node)
RETURN node
LIMIT 10

# return User node(filter by label)
MATCH(user:User)
RETURN user
LIMIT 10

# match with filter in node prop
MATCH(user:User {name: "Omar Huffman"})
RETURN user

# filter using WHERE
MATCH(user:User)
WHERE user.name = "Omar Huffman"
RETURN user

# filter w/o label
MATCH(user)
WHERE user.name = "Omar Huffman"
RETURN user

# basic traversal
MATCH(actor:Actor)-[:ACTED_IN]->(m:Movie)
RETURN actor

# Find all movies Person Tom Hanks acted or directed in
MATCH(person)-[rel:ACTED_IN|DIRECTED]->(m:Movie)
WHERE person.name = "Tom Hanks"
    RETURN m.title, m.year, type(rel)
    ORDER BY m.year DESC
    LIMIT 10

# MATCH(user:User {name: "Jessica Sherman"})-[:RATED]->(movie:Movie)<-[:ACTED_IN]-(actor:Actor)
RETURN movie.title, COLLECT(actor.name) as listOfActorNames
LIMIT 25

# Find genre of all the movies user rated
MATCH(user:User {name: "Jessica Sherman"})-[:RATED]->(movie:Movie)-[:IN_GENRE]->(genre:Genre)
RETURN movie.title, genre.name ===> collect(genre.name)

# Find movie GENRE I most often watch
MATCH(user:User {name: "Jessica Sherman"})-[:RATED]->(movie:Movie)-[inGenre:IN_GENRE]->(genre:Genre)
RETURN genre.name, count(inGenre) as movieCount
ORDER BY movieCount DESC
LIMIT 10

# Find movies simillar to the once I`ve rated
MATCH(movie:Movie {title: "Snatch"})<-[initRated:RATED]-(user:User)-[recRating:RATED]->(recMovie:Movie)
WHERE initRated.rating > 4 AND recRating.rating > 4 
RETURN recMovie.title as title, COUNT(*) AS popularity
ORDER BY popularity DESC
LIMIT 10



