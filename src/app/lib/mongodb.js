import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client;
let clientPromise;

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log(`uri ${uri}`)
    console.log("hi shahzad")
    client = new MongoClient(uri, options);
   /* clientPromise = client.connect().then(() => {
        console.log("connected to the server");
        return client;
    })*/
    clientPromise = client.connect().then(() => client)
} else {
    const cachedClient = new MongoClient(uri, options);
    clientPromise = cachedClient.connect().then(() => cachedClient);
}

export default async function connectToDatabase() {
    return clientPromise;
}