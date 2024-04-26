export async function GET(req, res) {
  // Make a note we are on the api. This goes to the console.
  console.log("in the register API route");

  // Get the values that were sent across to us.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const nick = searchParams.get('nick');
  const pass = searchParams.get('pass');
  const points = "100"; // Initialize points to 1 for new users
  const userClass = searchParams.get('class'); // Retrieve class parameter

  // Connect to MongoDB
  const { MongoClient } = require('mongodb');
  const url = 'mongodb+srv://mongo:mongo@cluster0.j8pmzje.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const dbName = 'app'; // database name

  try {
    await client.connect();
    console.log('Connected successfully to server');
    
    const db = client.db(dbName);
    const collection = db.collection('login'); // collection name
    
    // Insert the new user data into the database
    await collection.insertOne({
      "username": email,
      "pass": pass,
      "nick": nick,
      "points": points,
      "class": userClass // Include class in the inserted document
    });

    console.log('User registered successfully');

    // Send a success response back
    return Response.json({ "data": "User registered successfully" });
  } catch (error) {
    console.error('Error registering user:', error);
    // Send an error response back
    return Response.json({ "data": "Error registering user" });
  }
}
