const mongooese = require("mongoose");
let isConnectionEstablished = false;

async function main() {
 if (!isConnectionEstablished) await connectionEstablish();
 if (!isConnectionEstablished) return;
 const option = "Insert";
 switch (option) {
  case "Insert":
   try {
    const schema = new mongooese.Schema({
     id: { type: Number, isrequired: true },
     name: String,
     book: String,
     date: { type: Date, default: Date.now() },
    });

    const Person = new mongooese.model("Person", schema);

    const PersonObject = new Person({ id: 4, name: "Rahul Jaiswal", book: "Yashavant Kanetkar" });

    let result = await Person.insertMany([PersonObject]);
    console.log("Successfully Inserted to dataBase " + JSON.stringify(result));

    console.log("Reading from dataBase : ");
    result = await Person.find();
    console.log(result);

    console.log("Updatting the DataBase ");
    result = await Person.updateOne({ id: 4 }, { $set: { book: "YK" } });
    console.log("Successfully Updated to dataBase " + JSON.stringify(result));

    console.log("Deleting one Document from  Collection ");
    result = await Person.deleteOne({ id: 4 });
    console.log("Successfully deleted one document from dataBase " + JSON.stringify(result));
   } catch (error) {
    console.log("Error occured during insertion " + error.message);
   } finally {
    await mongooese.disconnect();
   }
 }
}

async function connectionEstablish() {
 try {
  await mongooese.connect("mongodb://localhost:27017/mongoDbCrud", { useNewUrlParser: true, useUnifiedTopology: true });
  isConnectionEstablished = true;
 } catch (error) {
  console.log("Failed to establish connection " + error.message);
 }
}

main();
