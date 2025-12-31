import {IndexType, Permission} from "node-appwrite";

import {db, questionCollection}  from "../name";
import { databases } from "./config";
import { delayUntilRuntimeStage } from "next/dist/server/app-render/dynamic-rendering";
import { log } from "console";


export default async function createQuestionCollection() {
    // create collection
    const collection = await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log(" Question collection is created");

    // creating attributes and Indexes
    await Promise.all([
        // title attribute
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 100, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
    ]);
    console.log(" Question collection attributes are created");

    // creating Indexes

    /*
    await Promise.all([
        databases.createIndex(
            db, 
            questionCollection, 
            "title", 
            IndexType.Fulltext,
            ["title"],
            ['asc']
        ),
        databases.createIndex(
            db, 
            questionCollection, "content", 
            IndexType.Fulltext,
            ["content"],
            ['asc']
        )
    ]);
    console.log(" Question collection Indexes are created");
    */
   
}