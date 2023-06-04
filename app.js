//This is an experiment on the MongoDB tutorial

//Requires mongoDB
const { MongoClient } = require("mongodb");

const username = "Enter your cluster's username";
const password = "Enter your cluster's password"
const clusterURL = "Enter your cluster's URL"

//Creates a main function
async function main(){

    //Creates a uri to the cluster on MondoDB Atlas
    const uri = "mongodb+srv://" + username + ":" + password + "@" + clusterURL +"/?retryWrites=true&w=majority"

    //Stores the cluster in the MongoDB Atlas account in the client variable 
    const client = new MongoClient(uri);

    //Uses try and catch to connect to the cluster and catch any errors that may occur in the proccess 
    try {
        //Connects to the cluster
        await client.connect();
        console.log("Successfully connected to the database");

        /*
        //Calls the function that creates the studentDB database
        await createDatabase(client);
        */

        /*
        //Calls the function that lists the databases in the cluster 
        await listDatabases(client);
        */

        /*
        //Calls the methdod that inserts a(one) document to the students collection in the studentDB database
        await createNewListing(client, {
            name: "Percy",
            level: 200,
            program: "Computer Science",
        });
        */

        /*
        //Calls the method that inserts many documents to the students collection in the studentDB database
        
        await createManyListings(client, [
            {
                name: "Saba",
                level: 300,
                program: "Mechanical engineering"
            },

            {
                name: "Agnes",
                level: 400,
                program: "Marketting"
            },

            {
                name: "Prosper",
                level: 400,
                program: "Psychology"
            },

            {
                name: "George",
                level: 300,
                program: "Mathematics"
            }
        ])

        */

        /*
        //Calls the function that reads all the documents in the students collection in the studentDB database
        await readAllListings(client);
        */

        /*
        //Calls the function that reads a document in the students collection in the studentDB database
        await readOneListing(client,
            {
                name: "Saba"
            }
            )
        */

        /*
        //Calls the function that reads many documents in the students collection in the studentDB database
        //This uses the or operator to get all the documents that satisfy the given condition
        await readManyListings(client, 
            {
                $or: [
                    {
                        name: "Percy"
                    },
                    {
                        name: "Saba"
                    }, 
                    {
                        name: "Mary"
                    }
                ]
            }
            )
        */
        
        /*
        //Calls the function that reads multiple documents in the students collection in the studentDB database
        //This uses the and operator to get all the documents that satisfy the given condition
        await readManyListings(client, {
            $and: [
                {
                    name: "Prosper"
                },
                {
                    level: 400
                }
            ]
        }
        )
        */
    
    /*
    //Calls the function that returns many documents in the students collection in the studentDB database
    //This uses the options parameter in the find method to narrow down to the specific query needed
    await readManyListings(client, 
        {
            level: {$gt: 200}
        }
        )
    */

    /*
    //Calls the function that returns many documents in the students collection in the studentDB database
    //This uses the projection parameter in the find method to narrow down on the specific fieild in the document to return 
    await readManyListings(client, 
        {
            name: "Agnes"
        },
        {
            projection: {
            _id: 0, 
            name: 1
            }
        }
        )
    */
    
    /*
    //Calls the function that updates a field in the students collection in the studentDB database
    await updateOneField(client, 
        {
            name: "Prosper"
        },
        {
            GPA: 3.98
        }
        )
    */

    /*
    //Calls the function that updates many documents and fields in the students  collection in the studentDB database
    await updateManyFields(client, 
        {
            $or: [
                {
                    name: "Percy"
                },
                {
                    name: "Agnes"
                },
                {
                    name: "Saba"
                }
            ]
        },
        {
            GPA: 3.90,
            class: "Distinction"
        }
        )
    */

    /*
    //Calls the function that deletes one field from the students collection in the studentDB database
    await deleteOneField(client, 
        {
            name: "John"
        }
    )
    */
    
    /*
    //Calls the function that deletes many fields from the students collection in the studentDB database
    await deleteManyFields(client, 
        {
            $or: [
                {
                    name: "John"
                }, 
                {
                    name: "Peter"
                }
            ]
        }
    )
    */

    //Catches any errors that may occur in the connection process
    } catch(error){
        console.log(error);
    // After reading or writing to the database the finally function closes the connection
    } finally{
        client.close();
    }
}

async function listDatabases(client){
    //Pulls all the data in the database
    const databasesList = await client.db().admin().listDatabases();

    //Extracts only the databases in the data in the databasesList
    const databaseList = databasesList.databases;

    console.log("Databases: ");

    databaseList.forEach(function(database){
        console.log(`- ${database.name}`);
    })
}


//Creates a new database
//This will not show in the database list initially because the databse is empty at the moment
async function createDatabase(client){
    try{
        await client.db("studentDB");
        console.log(`The database has been added successfully`);
    } catch(error){
        console.log(error);
    }   
}

//Creates a Listing in the student database by adding one document to the database
async function createNewListing(client, newListing){
    const result = await client.db("studentDB").collection("students").insertOne(newListing);

    console.log(`The inserted id for the new document created is ${result.insertedId}`);
}

//Creates a Listing in the studentDB database by adding numerous documents to the students collection
async function createManyListings(client, newListings){
    const results = await client.db("studentDB").collection("students").insertMany(newListings);

    console.log(`${results.insertedCount} documents have been added to the collection`);
}

//Creates a function that reads all the documents in the students collection in the studentDB database
async function readAllListings(client, projections){
    //Finds all the documents in the students collection in the studentDB database and convert the documents to an array
    if(projections === undefined){
        var results = await client.db("studentDB").collection("students").find({}).toArray();
    } else {
        var results = await client.db("studentDB").collection("students").find({}, projections).toArray();
    }
    
    console.log("Documents in the students collection: ");
    //console.log(results);
    results.forEach(function(result){
        console.log(result);
    })
}

//Creates a function that reads a specific document in the students collection in the studentDB database
async function readOneListing(client, query, projections) {
    if(projections === undefined) {
        var result = await client.db("studentDB").collection("students").findOne(query);
    } else {
        var result = await client.db("studentDB").collection("students").findOne(query, projections);
    }
    
    if(result){
        console.log(`The given query was found in the specified collection`);
        console.log(result);
    } else {
        console.log("The requested query was not found in the specified collection");
    }
}

//Creates a function that reads many documents in the students collection in the studentDB databse
async function readManyListings(client, queries, projections) {
    if(projections === undefined) {
        var results = await client.db("studentDB").collection("students").find(queries).toArray();
    } else {
        var results = await client.db("studentDB").collection("students").find(queries, projections).toArray();
    }
    
    if (results.length > 0){
        console.log("We found these matches in the specified collection");
        results.forEach(function(result){
            console.log(result);
        })
    } else {
        console.log("None of your queries matched a document in the specified collection");
    }
}

//Creates a function that updates fields in the students collection in the studentDB database
async function updateOneField(client, filter, updatedList) {
    const result = await client.db("studentDB").collection("students").updateOne(filter, {$set: updatedList});
    console.log(`${result.matchedCount} field has been updated`);
}

//Creates a function that updates many fields in the students collection in the studentDB database
async function updateManyFields(client, filter, updatedLists) {
    const results = await client.db("studentDB").collection("students").updateMany(filter, {$set: updatedLists});
    console.log(`${results.matchedCount} field(s) has/have been updated`);
}

//Creates a function that deletes one field in the students collection in the studentDB database
async function deleteOneField(client, filter) {
    const result = await client.db("studentDB").collection("students").deleteOne(filter);
    console.log(`${result.deletedCount} field has been deleted from the collection`);
}

//Creates a function that deletes many fields in the students collection in the studentDB database
async function deleteManyFields(client, filter) {
    const results = await client.db("studentDB").collection("students").deleteMany(filter);
    console.log(`${results.deletedCount} field(s) has/have been deleted from the students collection`);
}

//Calls the main functionand catches any errors that might occur in the process 
main().catch(console.error)