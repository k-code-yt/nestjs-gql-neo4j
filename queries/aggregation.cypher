// Which are the most popular tags?
MATCH (q:Question)-[:TAGGED]->(t:Tag)
RETURN t.name,  count(q) AS questions
ORDER BY questions DESC
LIMIT 5;

// Find tags of the most viewed questions
MATCH (q:Question)-[:TAGGED]->(t:Tag)
RETURN q.title, q.view_count as view_count, collect(t.name) as tagList
ORDER BY view_count DESC
LIMIT 5;

// Find most answered tags -> find all tags with highest answer count + filter by tag
// 1. find all tags -> questions -> answers
// 2. group by tags and get asnwer count
MATCH(t:Tag)<-[:TAGGED]-(:Question)<-[:ANSWERED]-(a:Answer)
RETURN t.name, count(a) as asnwerCount
ORDER BY asnwerCount DESC
LIMIT 10
// WHERE NOT (t.name IN ['neo4j', 'neo4j-apoc'])
// WHERE (NOT(t.name = 'neo4j')) AND (NOT(t.name = 'neo4j-apoc'))
// WHERE NOT(t.name CONTAINS('neo4j'))

// FIND most unaswered tags
MATCH (q:Question)-[:TAGGED]->(t:Tag)
WHERE NOT t.name IN ['neo4j','cypher']
  AND NOT exists((q)<-[:ANSWERED]-())
RETURN t.name as tag, count(q) AS questions
ORDER BY questions DESC LIMIT 10;

// find user's who asked most viewed questions
// (if we have property on the NODE)
MATCH(u:User)-[:ASKED]->(q:Question)-[:TAGGED]->(t:Tag)
WHERE t.name IN ['database']
RETURN max(q.view_count) as maxViews, u.display_name, q.title, t.name
ORDER BY maxViews DESC
LIMIT 5

// Which tags get the highest answer percentage
// (write down the wrong query)
// 1. Find all questions with their tags(all tags)
// 2. Find all answered questions with their tags(asnwered tags)
// 3. group by tag.name and get the percentage value = asnweredCount/totalCount
MATCH(allQ:Question)-[:TAGGED]->(t:Tag)
WITH t, count(allQ) as allCount
MATCH (a:Answer)-[:ANSWERED]->(asnweredQ:Question)-[:TAGGED]->(t)
WITH t, allCount, count(asnweredQ) as answerCount
WHERE answerCount > 50
RETURN t.name, answerCount*100/allCount as percentage
ORDER BY percentage DESC
LIMIT 5

// find user's who provided highest total viewed asnwers
MATCH (u:User)-[:PROVIDED]->(:Answer)-[:ANSWERED]->(q:Question)
// -[:TAGGED]->(t:Tag)
// WHERE t.name IN ['database']
WITH u, count(q) as count, reduce(totalViews = 0, n IN collect(q) | totalViews + n.view_count) AS totalViews
WHERE count > 5
RETURN u.display_name, totalViews, count
ORDER BY totalViews DESC
LIMIT 5

// Practice -> just show an example
// What users keep on running into each other in the comments?
MATCH p1=(u1:User)-[:COMMENTED]->(c1:Comment)-[:COMMENTED_ON]-(q:Question)
MATCH p2=(u2:User)-[:COMMENTED]->(c2:Comment)-[:COMMENTED_ON]-(q)
WHERE id(u1) < id(u2)
WITH u1, u2, count(distinct q) as freq
WHERE freq > 2
RETURN u1, u2, apoc.create.vRelationship(u1,'OCCURRED',{freq:freq},u2) as rel

// 2 user correlation -> via single path -> via any path
MATCH p1=(u1:User)-[*1..2]-(q:Question)
MATCH p2=(u2:User)-[*1..2]-(q)
WHERE id(u1) < id(u2)
UNWIND relationships(p1) as u_p1
UNWIND relationships(p2) as u_p2
WITH u1,u2,count(distinct q) as freq, collect(distinct type(u_p1)) as t_p1, collect(distinct type(u_p2)) as t_p2
WHERE freq > 2
RETURN u1.display_name, u2.display_name, freq, t_p1, t_p2
ORDER BY freq DESC
LIMIT 10

// ---------------------

// Who’s answering?
// Ordered by number of answers
MATCH (u:User)-[:PROVIDED]->(a:Answer)-[:ANSWERED]->(q:Question)
RETURN u.display_name as user,COUNT(a) AS answers, avg(a.score) as avg_score
ORDER BY answers DESC LIMIT 10;

// Ordered by max score, filtered for a particular tag
MATCH (u:User)-[:PROVIDED]->(a:Answer)-[:ANSWERED]->
      (q:Question)-[:TAGGED]->(:Tag {name:"cypher"})
RETURN u.display_name as user,COUNT(a) AS answers, max(a.score) as max_score
ORDER BY max_score DESC LIMIT 10;

// What’s the shortest path between users?
MATCH path = allShortestPaths(
  (u1:User {display_name:"alexanoid"})-[*10]-(u2:User {display_name:"InverseFalcon"})
)
RETURN path LIMIT 1;

// User engagement over time:
MATCH (u:User)-[:PROVIDED]->()-[:ANSWERED]->
      (q:Question)-[:TAGGED]->(t:Tag)
WHERE u.display_name = "InverseFalcon"
RETURN apoc.date.format(q.creation_date,'s','yyyy-MM') as month,
       count(distinct q) as count, collect(distinct t.name) as tags
ORDER BY month asc

// What are the tags for unanswered questions?
MATCH (q:Question)-[:TAGGED]->(t:Tag)
WHERE NOT t.name IN ['neo4j','cypher']
  AND NOT EXISTS((q)<-[:ANSWERED]-())
RETURN t.name as tag, count(q) AS questions
ORDER BY questions DESC LIMIT 10;

// How are tags related to other tags?
MATCH (t1:Tag)<-[:TAGGED]-()-[:TAGGED]->(t2:Tag)
WHERE id(t1) < id(t2) and t1.name <> 'neo4j' and t2.name <> 'neo4j'
RETURN t1.name, t2.name,count(*) as freq
ORDER BY freq desc LIMIT 10;

// WRONG SUBQUERY
MATCH(allQ:Question)-[:TAGGED]->(t:Tag)
WITH allQ, t
CALL {
    WITH allQ, t
    OPTIONAL MATCH (a:Answer)-[:ANSWERED]->(allQ)-[:TAGGED]->(t)
    RETURN a
}
WITH count(a) as answerCount, count(allQ) as allCount, t.name as tag
WHERE answerCount > 50
RETURN tag, answerCount, allCount
ORDER BY allCount DESC
LIMIT 5