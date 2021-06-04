'use strict'

const LOCAL_KEY = 'usersSaver';
const LOCAL_KEY_LOGGED_USER = 'currentLogIn';

var gIdNext = 10001;

var gUsers;
var gLoggedInUser = null;
var gSortBy = '';



function initService() {
    var users = _getUsers();
    if (!users) gUsers = _createUsers();
    else gUsers = users;
}

function doLogin(username, password) {
    // if the username and password are correct, user will be returned
    var user = gUsers.find(user => user.userName === username && user.password === password);
    if (!user) return null;

    user.lastLoginTime = Date.now();
    _saveUsers();

    return user;
}


function getUsersTable() {
    var mat = [];

    switch (gSortBy) {
        case 'NAME':
            gUsers.sort((user1, user2) => user1.userName.localeCompare(user2.userName));
            break;
        case 'LAST LOGIN':
            gUsers.sort((user1, user2) => (user2.lastLoginTime - user1.lastLoginTime));
            break;
    }

    gUsers.map(function(user) {
        var row = [];
        for (const param in user) {
            row.push(user[param]);
        }

        mat.push(row);
    });

    return mat;
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
}

function _createUsers() {
    return [
        _createUser('aaabbb', '123456'),
        _createUser('aabbb', '12345'),
        _createUser('admin', 'admin', true)
    ];
}

function _createUser(userName, password, isAdmin = false) {
    return {
        id: 'u' + gIdNext++,
        userName,
        password,
        lastLoginTime: Date.now(),
        isAdmin
    };
}

function _saveUsers() {
    var json = JSON.stringify(gUsers);

    localStorage.setItem(LOCAL_KEY, json);
}

function _getUsers() {
    var json = JSON.parse(localStorage.getItem(LOCAL_KEY));

    return json;
}

function setLoggedInUser(user) {
    gLoggedInUser = user;
    _saveLoggedInUserLocalStorage();
}

function getLoggedInUser() {
    _getLoggedInUserLocalStorage();
    return gLoggedInUser;
}

function logOutLoggedUser() {
    gLoggedInUser = null;
    _removeFromLocalStorage(LOCAL_KEY_LOGGED_USER);
}

function _saveLoggedInUserLocalStorage() {
    var json = JSON.stringify(gLoggedInUser);

    localStorage.setItem(LOCAL_KEY_LOGGED_USER, json);
}

function _getLoggedInUserLocalStorage() {
    var json = JSON.parse(localStorage.getItem(LOCAL_KEY_LOGGED_USER));

    gLoggedInUser = json;
}

function _removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}