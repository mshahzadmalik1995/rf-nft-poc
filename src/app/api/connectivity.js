import connectToDatabase from "../lib/mongodb";
export default async (req, res) => {
    try{
        const client = await connectToDatabase()
        console.log(`client ${client}`);
    } catch(ex) {
        console.log(`ex ${ex}`);
    }
}