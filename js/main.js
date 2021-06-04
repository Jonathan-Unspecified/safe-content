'use strict'


function init() {
    initService();
}


function onSubmitLogin(ev) {
    ev.preventDefault();

    var userName = document.querySelector('.login1 input[type=text]');
    var password = document.querySelector('.login2 input[type=password]');


    if (!userName.value || !password.value) {
        confirm('Please enter valid username and password!');
        cleanLoginText();
        return;
    }

    var user = doLogin(userName.value, password.value);
    if (!user) {
        confirm('Wrong username or password!');
        cleanLoginText();
        return;
    }

    setLoggedInUser(user);
    showSecretContent();
}


function cleanLoginText() {
    var userName = document.querySelector('.login1 input[type=text]');
    var password = document.querySelector('.login2 input[type=password]');

    userName.value = '';
    password.value = '';
}

function showSecretContent() {
    var user = getLoggedInUser();

    // if (user.isAdmin) {
    //     window.location.href = 'admin.html';

    // } else {
    window.location.href = 'secret.html';
    // }
}

function initSecret() {
    init();
    var user = getLoggedInUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    if (!user.isAdmin) {
        document.querySelector('.goto-admin-btn').style.display = 'none';
    }

    document.querySelector('.user-name-head').innerText = getLoggedInUser().userName;
}

function initAdmin() {
    init();
    var user = getLoggedInUser();
    if (!user || !user.isAdmin) {
        onLogOut();
        window.location.href = 'index.html';
        return;
    }

    document.querySelector('.user-name-head').innerText = getLoggedInUser().userName;

    renderUsersTable();
}

function onLogOut() {
    logOutLoggedUser();

    window.location.href = 'index.html';
}

function renderUsersTable() {
    var strHTML = '';

    var table = getUsersTable();

    table.forEach(row => {
        strHTML += `<tr>`
        row.forEach(cell => {
            strHTML += `<td>`;
            strHTML += `${cell}`;
            strHTML += `</td>`;
        });
        strHTML += `</tr>`
    });

    document.querySelector('.users-table-admin').innerHTML = strHTML;
}

function onSortUsersTable(sortBy) {
    setSortBy(sortBy);
    renderUsersTable();
}