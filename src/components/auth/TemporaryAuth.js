import React from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listAccounts, listSchools, listUsers } from '../../../graphql/queries'

import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import _ from 'lodash'

const TemporaryAuth = ({ user }) => {
    let authenticate = true

    const secret = process.env.AUTH_SK;

    const signToken = (user) => {
        console.log("Token Signed");
        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //30 Days
                id: user.id,
                username: user.username,
                courses: user.perm,
            },
            secret
        );
        console.log(token)
        return token;
    };

    const serializeCookie = (token) => {
        const serialized = serialize("AELJWT", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        console.log("Serialized");
        console.log(serialized)
        return serialized;
    };

    console.log('Fetching data')
    const { username, password, accountNo, schoolNo } = user
    const schoolList = await API.graphql(graphqlOperation(listSchools))
    const userList = await API.graphql(graphqlOperation(listUsers))
    const accountList = await API.graphql(graphqlOperation(listAccounts))
    console.log('Data fetched')

    const fetchedSchool = _.find(schoolList.data.listSchools.items, (school) => {
        return school.number === schoolNo
    })

    const fetchedAccount = _.find(accountList.data.listAccounts.items, (account) => {
        return account.number === accountNo
    })

    const fetchedUser = _.find(userList.data.listUsers.items, (user) => {
        return user.username === username
    })

    const isSchool = Boolean(fetchedSchool)

    const isAccount = Boolean(fetchedAccount)

    const isUser = Boolean(fetchedUser)


    console.log(isSchool)
    console.log(isUser)
    console.log(isAccount)
    console.log(isSchool && isAccount && isUser)

    if (isSchool && isUser && isAccount) {
        if (username !== fetchedUser.username || password !== fetchedUser.password) {
            authenticate = false
            console.log('Username or password is incorrect')
            console.log(fetchedUser.username)
            console.log(fetchedPassword.password)
        } else {
            console.log('Username and password authenticated')
        }

        if (schoolNo !== fetchedSchool.number || accountNo !== fetchedAccount.number) {
            authenticate = false
            console.log('School number or account number is incorrect')
            console.log(fetchedSchool.number)
            console.log(fetchedAccount.number)
        } else {
            console.log('School and account numbers authenticated')
        }

        if (authenticate) {
            console.log('Generating JWT')

            const user = {
                username: fetchedUser.username,
                id: schoolNo + '-' + accountNo + '-' + fetchedUser.number,
                perm: fetchedAccount.permissions,

            }

            console.log('User data for serialization:')
            console.log(user)
            const token = signToken(user);
            const serialized = serializeCookie(token);
            // res.setHeader("Set-Cookie", serialized);
            // res.status(200).json({
            //   message: "Login Successful",
            //   account: schoolNo + '-' + accountNo,
            //   perm: fetchedAccount.permissions,
            // });
        } else {
            console.log('Disconnecting from server')
            // res.status(401)
        }

    } else {
        console.log('Invalid data')
        //   res.status(401)
    }

    return (
        <div></div>
    )
}

export default TemporaryAuth