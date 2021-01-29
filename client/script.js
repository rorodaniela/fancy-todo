const baseUrl = "http://localhost:3000"
let todoId
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
        .done(data => {
            $('#todo-list').empty()
            $.each(data, (index, data) => {

            let status = `<input type="checkbox" class="form-check-input" id="status-${data.id}" onclick="editStatus(${data.id}, '${data.status}')" `
            if (data.status === true) {
                status += `checked>`
            } else if(data.status === false){
                status += `>`
            }
                // console.log(data)
                $('#todo-list').append(`
                <div class="card" id="list-task" style="width: 40rem";>
                    <div class="card-body todo-list-card" id=todoCard${data.id}>
                        <div id=todoCardBody${data.id}>
                            ${status}
                            <h5 class="card-title">${data.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.due_date.split('T')[0]}</h6>
                            <p class="card-text">${data.description}</p>
                            <a href="#" onclick='editForm(${data.id})' class="card-link btn btn-primary" id="editTodo">Edit</a>
                            <a href="#" onclick='deleteTodo(event, ${data.id})' class="card-link btn btn-danger" id="deleteTodo">Hapus</a>
                        </div>
                    </div>
                </div>
            `)
            })
        })
        .fail(err => {
            console.log(err, "ini error todo list dari ajax");
        })
        .always(()=>{
        })
}

$('#add-todo-btn').click(function (event) {
    event.preventDefault()
    $('#add-todo-form').show()
})

$('#add-submit').click(function (event) {
    event.preventDefault()
    addTodo()
})
//add todo
function addTodo() {
        let title = $('#todo-tile').val()
        let description = $('#todo-description').val()
        let due_date = $('#todo-date').val()
        // ajax
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/todo`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
               title,
               description,
               due_date
            }
        })
        .done(response => {
            todoList()
            $('#add-todo-form').hide()
        })
        .fail(err => {
            console.log(err, "ini error dari ajax");
        })
        .always(()=>{
        })
}

$(`#add-cancel-btn`).click(function (event) {
    event.preventDefault()
    $('#add-form').hide()
})

// delete todo
function deleteTodo(event, id) {
    event.preventDefault
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todo/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
            todoList()
        })
        .fail(err => {
            console.log(err, "ini error dari ajax");
        })
        .always(()=>{
        })
}
// edit

function editForm(id) {
    todoId = id
    $.ajax({
            method: 'GET',
            url: `${baseUrl}/todo/${todoId}`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(data => {
            $(`#todoCardBody${todoId}`).hide()
            $(`#todoCard${todoId}`).append(`
            <div class="edited-form">
            <h3>Edit Form</h3>
        <form role="form" id="form-edit-main${todoId}">
            <input type="text" class="form-control" value="${data.title}" name="tile" id="title-edit">
            <input type="text" class="form-control" value= "${data.due_date.split('T')[0]}" name="due_date" id="due-date-edit">
            <input type="text" class="form-control" value="${data.description}" name="description" id="description-edit">
            <button onclick="submitEdit(event)" class="btn btn-primary" id="edit-button">Save</button>
            <button onclick="editCancel(event)" class="btn btn-danger" id="edit-cancel-button">Cancel</button>
        </form>
        </div>
        `)
    })
}

function editCancel(event) {
    event.preventDefault()
    $(`#form-edit-main`).hide()
    $('.todo-list-card').show()
    $(`#add-todo-form`).hide()
    todoList()
}

function submitEdit(event) {
    event.preventDefault()
    editSubmit()
}
function editSubmit(event) {
    $(`#form-edit-main`).show()

    $.ajax({
            method: 'PUT',
            url: `${baseUrl}/todo/${todoId}`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title: $('#title-edit').val(),
                description: $('#description-edit').val(),
                due_date: $('#due-date-edit').val()
            }
        })
        .done(data => {
            $(`#form-edit-main`).hide()
            $('.todo-list-card').show()
            $(`#add-todo-form`).show()
            $('#add-todo-form').hide()
            todoList()
        })
        .fail(err => {
            console.log(err, 'ERROR EDIT')
        })
        .always(() => {
            $('#title-edit').val('')
            $('#due-date-edit').val('')
            $('#description-edit').val('')
        })
}

// edit status
function editStatus(id, status) {

    let inputStatus
    if (status === 'true') {
        inputStatus = false
    } else {
        inputStatus = true
    }

    $.ajax({
            method: 'PATCH',
            url: `${baseUrl}/todo/${id}`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                status: inputStatus
            }
        })
        .done(data => {
            console.log('Berhasil di Edit')
            readTodo()
        })
        .fail(err => {
            console.log(err, "ERROR EDIT")
        })
        .always(() => {

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
    $('#add-todo-form').hide()
    todoList()
}

function register() {
    $('#login-page').hide()
    $('#todo-page').hide()
    $('#navbar').hide()
    $('#register-page').show()
}
