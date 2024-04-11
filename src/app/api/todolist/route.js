export async function POST(req, res) {
  const { MongoClient } = require('mongodb');
  const url = 'mongodb+srv://mongo:mongo@cluster0.j8pmzje.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const dbName = 'app';
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login');

  // Assuming you pass username and newPoints in the request body
  const { username, points } = req.body;

  // Update the user's points in the database
  await collection.updateOne(
    {"username": username}, 
    {$set: {"points": points}}
  );

  // Close the connection
  await client.close();

  // Send a response indicating success
  return Response.json({ "data": "Successfully updated points" });
}
