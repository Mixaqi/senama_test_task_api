# 📝 Todo API

A simple REST API for managing tasks (Todos) built with Node.js, TypeScript, Express, and MongoDB.

---

## 🔧 Installation & Running

1. Clone the repository:

```bash
git clone https://github.com/Mixaqi/senama_test_task_api
cd <senama_test_task_api>
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the project root
```
MONGO_URI=mongodb://localhost:27017
PORT=3000
```
4. Start the server
```bash
npm run dev
```
Server will run at:
```
http://localhost:5000
```
GET /todos
```json
[
  {
    "_id": "64f7a1c2e9f1b7c1a2d3e4f5",
    "title": "Do something",
    "isCompleted": false
  }
]
```
POST /todos
Request:
```
"title": "New task"
```
Response:
```
{
  "_id": "64f7a1c2e9f1b7c1a2d3e4f5",
  "title": "New task",
  "isCompleted": false
}
```

PUT /todos/:id
Request:
```
{
  "title": "Updated successfully"
}
```
Response:
```
{
  "message": "Updated successfully"
}
```

PATCH /todos/:id/toggle
```
{
    "message": "Toggled successfully"
}
```

DELETE /todos/:id'
Response:

```
{
    "message": "Deleted successfully"
}
```