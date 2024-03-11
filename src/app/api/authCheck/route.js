import { cookies } from 'next/headers'
    export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("checking auth")
    // get the auth record
    let record = cookies().get('auth');
    let record2 = cookies().get('username');
    
    console.log(record.value);
    console.log(record2.value);
    // at the end of the process we need to send something back.
    return Response.json({ "status":"" + record.value + ""})
}