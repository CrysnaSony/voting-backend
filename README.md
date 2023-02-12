# Voting-Backend

Backend of a Voting system created with Node.Js, Express, MongoDB. Architecture supports multiple instance of Node.Js using Cluster and used caching for quick responses.

# Key Features
  - CRUD operation apis for user
  - CRUD operation apis for Question for voting
  - Give vote 
  - Get Vote statistics
  
#Installation


Clone the repo:

```bash
git clone CrysnaSony/voting-backend.git
cd voting-backend
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.sample .env

# open .env and modify the environment variables
```


## Commands

Running locally:

```bash
npm run dev
```

### API Endpoints

List of available routes:

**User routes**:\
`POST /user` - create a user\

```json
{
  "name": "user's Name",
  "freeLimit": 500
}
```

`GET /user` - get all users\
`GET /user/:id` - get user\
`PUT /user/:userId` - update user\
`DELETE /user/:userId` - delete user\

**Question routes**:\
`POST /question` - create a question\

```json
{
  "question": "Which movie is best?",
  "options":[
    {"option":"Avengers"},
    {"option":"Swades"},
    {"option":"Chhello Divas"},
    {"option":"Lagaan"}
    ]
}
```
`GET /question` - get all questions\
`GET /question/:qId` - get question\
`PUT /question/:qId` - update question\
`DELETE /question/:qId` - delete question\

**Vote routes**:\
`POST /votes/:qId/user/:id` - give Vote\
```json
[
    {
        "option": "Avengers",
        "stars": 50
    }
]
```

`GET /votes/:qId` - get Votes\

