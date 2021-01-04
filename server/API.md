**Fancy To do**
----
  Fancy To-Do is an application to help you manage your daily activity and tasks in easiest way. 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
## List avalaible endpoints
- `GET /todo`
- `POST /todo`
- `PUT /todo`
- `PATCH /todo`
- `DELETE /todo`

## RESTful endpoints

### GET /todo

> Get all todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<to do title>",
    "description": "<to do description>",
    "status": "<todo status done or not yet>",
    "due_date": "<todo due date>",
  },
  {
    "id": 2,
    "title": "<to do title>",
    "description": "<to do description>",
    "status": "<todo status done or not yet>",
    "due_date": "<todo due date>",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /todo

> Create new To Do

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<to do title>",
  "description": "<to do description>",
  "due_date": "<todo due date>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<default by system>",
    "due_date": "<posted due date>",
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### PUT /todo

> Create new To Do

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<to do title>",
  "description": "<to do description>",
  "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```json
{
    "id": "<given id by system>",
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<default by system>",
    "due_date": "<posted due date>"
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
