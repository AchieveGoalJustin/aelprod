// export default function handler(req, res) {
//   if (req.method === "GET") {

import db from "../../../db"
import AWS, { DynamoDB } from 'aws-sdk'
import client from "../../../db"

//     const AWS = require('aws-sdk');

//     AWS.config.update({
//         region: process.env.SERVER_DEFAULT_REGION,
//         accessKeyId: process.env.DB_ADMIN_PK,
//         secretAccessKey: process.env.DB_ADMIN_SK
//     })
    
//     const db = new AWS.DynamoDB.DocumentClient();
//     const TABLE_NAME = "ael-testdb-2"
    
//     const getTest = async() => {
//         const params = {
//             TableName: TABLE_NAME,
//             Item: '123'
//         };
//         const testQuery = await db.scan(params).promise()
//         console.log('queried object is: ' + JSON.stringify(testQuery))
//         return testQuery;
//     }
//     // const queryRes = getTest()
//     // res.status(200).queryRes.json();
//     try{
//       res.status(200).getTest().json()
//     }
//     catch(error){
//       console.error()
//       res.status(500).json({ err: 'Could not fetch data from the database'})
//     }
//   } 
// }

export default async function handler (req, res) {

  console.log('Request type is ' +req.method)

  const postParams = {
    TableName: process.env.TEST_TABLE,
    Key:{
      id: req.body.id
    },
    UpdateExpresson: 'SET content = :content',
    ExpressionAttributeValues : {
      ':content' : req.body.content || null
    },
    ReturnValues: 'ALL_NEW'
  }

  const getParams = {
      TableName: process.env.TEST_TABLE,
      Key :{
        id: '123'
      }
  };

  if (req.method === 'GET'){
    const { Item } = await client.get(getParams).promise()
    console.log(Item)
    res.status(200).json(Item)
  } 
  
  else if (req.method === 'POST'){
    console.log('Attempting POST')
    const { Attributes } = client.update(postParams)
    console.log(Attributes)
    res.status(200).json(Attributes)
  }
}