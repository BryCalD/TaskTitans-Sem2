export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page");
  
  // Get the values that were sent across to us.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const newPoints = searchParams.get('newPoints'); 

  console.log(email);
  console.log(newPoints);

  // =================================================
  const { MongoClient } = require('mongodb');

  const url = 'mongodb+srv://mongo:mongo@cluster0.j8pmzje.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const dbName = 'app'; // database name
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login'); // collection name
  const findResult = await collection.find({"username": email}).toArray();
  console.log('Found documents =>', findResult);
  let valid = false;

  // If user exists, update the password
  if (findResult) {
    valid = true;
      await collection.updateOne(
          { "username": email },
          { $set: { "points": newPoints } }
      );
      console.log("Points updated successfully");
  } else {
    valid = false;
    console.log("Points updated unsuccessfully");
  }
  return Response.json({ "data": valid });
}
