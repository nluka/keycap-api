# keycap-api

| Module             | Link                                   |
| ------------------ | -------------------------------------- |
| Production         | https://key-cap.netlify.app            |
| Frontend Code Repo | https://github.com/nluka/keycap-client |
| Library Code Repo  | https://github.com/nluka/keycap-foundation    |

- [Servers](#servers)
- [API Reference](#api-reference)
  - [Create User](#create-user)
  - [Sign In](#sign-in)
  - [Check Token](#check-token)
  - [Delete User](#delete-user)
  - [Get Practice Settings](#get-practice-settings)
  - [Update Practice Settings](#update-practice-settings)
  - [Get Practice Stats](#get-practice-stats)
  - [Practice Round Completion](#practice-round-completion)
  - [Practice Round Abortion](#practice-round-abortion)
  - [Reset Practice Stats](#reset-practice-stats)
  - [Standard Error Response](#standard-error-response)
  - [Token Error Response](#token-error-response)

## Servers

| Name | URL                                                                     | Description                                                                                                                 |
| ---- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Main | [ https://keycap-api.herokuapp.com/](https://keycap-api.herokuapp.com/) | The primary server. Note that it may take some time to respond to first requests, as the free heroku server is starting up. |

## API Reference

### Create User

```HTTP
POST /user/create
```

#### Query Parameters

| Parameter                   | Type   | Description                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------------ |
| username (required)         | string | Must match [/^[a-zA-Z0-9-\_]{3,32}$/](regexr.com/69tcs).                             |
| password (required)         | string | Must match [/^[a-zA-Z0-9`~!@#$%^&*()-_=+\[{\]};:'",./? ]{3,64}$/](regexr.com/69tde). |
| practiceSettings (required) | object | Must be of type [IPracticeSettings](https://github.com/nluka/keycap-foundation#types).      |

#### Response

```ts
// Status 201
{
  "id": String,
  "name": String,
  "token": String // jwt
}
```

### Sign In

```HTTP
POST /user/sign-in
```

#### Query Parameters

| Parameter           | Type   | Description                                                                          |
| ------------------- | ------ | ------------------------------------------------------------------------------------ |
| username (required) | string | Must match [/^[a-zA-Z0-9-\_]{3,32}$/](regexr.com/69tcs).                             |
| password (required) | string | Must match [/^[a-zA-Z0-9`~!@#$%^&*()-_=+\[{\]};:'",./? ]{3,64}$/](regexr.com/69tde). |

#### Response

```ts
// Status 200
{
  "id": String,
  "name": String,
  "token": String, // jwt
  "practiceSettings": Object // of type `IPracticeSettings`
}
```

### Check Token

```HTTP
POST /user/check-token
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Response

Status code 204 with no body.

### Delete User

```HTTP
DELETE /user/delete
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Response

Status code 204 with no body.

### Get Practice Settings

```HTTP
GET /user/practice-settings
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Query Parameters

| Parameter         | Type   |
| ----------------- | ------ |
| userId (required) | string |

#### Response

```ts
// Status 200
{
  "settings": Object // of type `IPracticeSettings`
}
```

### Update Practice Settings

```HTTP
PUT /user/practice-settings
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Query Parameters

| Parameter           | Type   |
| ------------------- | ------ |
| settings (required) | object [IPracticeSettings](https://github.com/nluka/keycap-foundation#types) |

#### Response

Status code 204 with no body.

### Get Practice Stats

```HTTP
GET /user/practice-stats
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Response

```ts
// Status 200
{
  "lastTenRoundResults": Object[], // of type `IPracticeRoundResult`
  "averageRoundResult": Object, // of type `IPracticeRoundResult`
  "roundsCompletedCount": Number,
  "roundsAbortedCount": Number,
}
```

### Practice Round Completion

```HTTP
POST /user/practice-stats/round-completion
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Query Parameters

| Parameter         | Type   |
| ----------------- | ------ |
| roundResult (required) | object [IPracticeRoundResult](https://github.com/nluka/keycap-foundation#types) |

#### Response

```ts
// Status 200
// Updated stats
{
  "lastTenRoundResults": Object[], // of type `IPracticeRoundResult`
  "averageRoundResult": Object, // of type `IPracticeRoundResult`
  "roundsCompletedCount": Number,
  "roundsAbortedCount": Number,
}
```

### Practice Round Abortion

```HTTP
POST /user/practice-stats/round-abortion
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Response

```ts
// Status 200
// Updated stats
{
  "lastTenRoundResults": Object[], // of type `IPracticeRoundResult`
  "averageRoundResult": Object, // of type `IPracticeRoundResult`
  "roundsCompletedCount": Number,
  "roundsAbortedCount": Number,
}
```

### Reset Practice Stats

```HTTP
DELETE /user/practice-stats
```

#### Headers

| Header           | Type   |
| ---------------- | ------ |
| token (required) | string |

#### Response

```ts
// Status 200
// Reset stats
{
  "lastTenRoundResults": Object[], // of type `IPracticeRoundResult`
  "averageRoundResult": Object, // of type `IPracticeRoundResult`
  "roundsCompletedCount": Number,
  "roundsAbortedCount": Number,
}
```

### Standard Error Response

Request made with header/body errors or database conflicts will have status code 400|409|422 with a body containing an `errors` array describing why the request failed.

```ts
{
  "errors": String[]
}
```

### Token Error Response

Requests made with an invalid token will have status code 403 and no body.
