const baseUrl = "http://localhost:3000"
$(document).ready(function () {
    authentication()  
    $('#register-page').hide()
})

//login
$('#login-btn').click(function (event) {
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    // ajax
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email:email,
            password: password
        }
    })
    .done(response => {
        localStorage.access_token = response.access_token
        authentication()
    })
    .fail(err => {
        console.log(err, "ini error dari ajax");
    })
    .always(()=>{
        $('#email-login').val('')
        $('#password-login').val('')
    })
})

//register post
$('#register-post-btn').click(function (event) {
    event.preventDefault()
    register()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    // console.log(email, password, "ini dari form register");
    // ajax
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
            email:email,
            password: password,
        }
    })
    .done(response => {
        beforeLogin()
        $('#register-page').hide()
    })
    .fail(err => {
        console.log(err, "ini error register dari ajax");
    })
    .always(()=>{
        $('#email-register').val('')
        $('#password-register').val('')
    })
})

// show register
$('#register-btn').click(function (event) {
    event.preventDefault()
    register()

})

$('#logout-btn').click(function (event) {
    event.preventDefault()
    localStorage.clear()
    authentication()

})

//show todo
function todoList() {
        $.ajax({
            method: 'GET',
            url: `${baseUrl}/todo`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(response => {
            console.log(response);
            let todos = `
            <h3> ini nanti isi konten todo</h3>
            <button type="submit" class="btn btn-primary" id="add-todo-btn">add Todo</button>
            <button type="submit" class="btn btn-danger" id="delete-todo-btn">delete Todo</button>
            `
            $('#todo-content').append(todos)
        })
        .fail(err => {
            console.log(err, "ini error todo list dari ajax");
        })
        .always(()=>{
        })
}

//add todo
function addTodo() {
    $('#add-todo-btn').click(function (event) {
        event.preventDefault()
        let title = $('#title-add').val()
        let description = $('description-add').val()
        let due_date = $('due_date-add').val()
        // ajax
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/todo`,
            headers: { access_token: localStorage.access_token },
            data: {
                title,
                description,
                due_date
            }
        })
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err, "ini error dari ajax");
        })
        .always(()=>{
        })
    })
}

// delete todo
function deleteTodo() {
    $('#delete-todo-btn').click(function (event) {
        event.preventDefault()
        let id = 
        // ajax
        $.ajax({
            method: 'DELETE',
            url: `${baseUrl}/todo`,
            headers: { access_token: localStorage.access_token },
            params: { id }
        })
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err, "ini error dari ajax");
        })
        .always(()=>{
        })
    })
}

function authentication() {
    if (localStorage.access_token) {
        afterlogin()
    }else {
        beforeLogin()
    }
}

function beforeLogin() {
    $('#login-page').show()
    $('#todo-page').hide()
    $('#navbar').hide()
}

function afterlogin() {
    $('#login-page').hide()
    $('#todo-page').show()
    $('#navbar').show()
    todoList()
}

function register() {
    $('#login-page').hide()
    $('#todo-page').hide()
    $('#navbar').hide()
    $('#register-page').show()
}
