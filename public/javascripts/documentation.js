const getUsers = [{
        "_id": "5d87e81e660d8f26fcfe6fae",
        "status": "active",
        "username": "danym",
        "firstName": "Daniela",
        "lastName": "Medina",
        "email": "dany_m@gmail.com",
        "password": "123456",
        "createdAt": "2019-09-22T21:31:10.400Z",
        "updatedAt": "2019-09-22T21:31:10.400Z",
        "__v": 0
    },
    {
        "_id": "5d8804d0a9d91b4bf0d6f084",
        "status": "active",
        "active": true,
        "username": "malvarez",
        "firstName": "María Isabel",
        "lastName": "Álvarez",
        "email": "maria.alvarez9409@gmail.com",
        "password": "123456",
        "address": {
            "street": "Lago Caneguin 191",
            "city": "Mexico",
            "state": "Mexico",
            "zip": "02120"
        },
        "createdAt": "2019-09-22T23:33:36.189Z",
        "updatedAt": "2019-09-22T23:33:36.189Z",
        "__v": 0
    },
];

const postUser = {
    "username": "malvarez",
    "firstName": "María Isabel",
    "lastName": "Álvarez",
    "email": "maria.alvarez9409@gmail.com",
    "password": "123456",
    "address": {
        "street": "Lago Caneguin 191",
        "city": "Mexico",
        "state": "Mexico",
        "zip": "02120"
    }
};

const getUser = {
    "status": "active",
    "_id": "5d8804d0a9d91b4bf0d6f084",
    "active": true,
    "username": "malvarez",
    "firstName": "María Isabel",
    "lastName": "Álvarez",
    "email": "maria.alvarez9409@gmail.com",
    "password": "123456",
    "address": {
        "street": "Lago Caneguin 191",
        "city": "Mexico",
        "state": "Mexico",
        "zip": "02120"
    },
    "createdAt": "2019-09-22T23:33:36.189Z",
    "updatedAt": "2019-09-22T23:33:36.189Z",
    "__v": 0
};

const putUser = {
    "_id": "5d87ebb5ebb67b24249ed577",
    "username": "magalli123",
    "firstName": "Magalli",
    "lastName": "Magalli",
    "email": "magalli123@gmail.com",
    "password": "bbb",
    "address": {
        "city": "Mexico",
        "state": "Mexico",
        "zip": "02120"
    },
    "createdAt": "2019-09-22T21:46:29.238Z",
    "updatedAt": "2019-09-22T21:46:29.238Z",
    "__v": 0
};

const patchUser = {
    "_id": "5d87ebb5ebb67b24249ed577",
    "password": "222"
};

module.exports = {
    getUsersJson: JSON.stringify(getUsers, null, 4),
    postUserJson: JSON.stringify(postUser, null, 4),
    getUserJson: JSON.stringify(getUser, null, 4),
    putUserJson: JSON.stringify(putUser, null, 4),
    patchUserJson: JSON.stringify(patchUser, null, 4),
};