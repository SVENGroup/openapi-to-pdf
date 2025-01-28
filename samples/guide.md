# Info

**App Name v12**

?{{description}}

?terms of service: https://google.com

## Contact?

For more information, you may contact:

- ?Name: name
- ?Email: email
- ?URL: url

## License?

?This API is under a {license_name?} license.

?Read the full License here: {url}

# Servers?

The following servers may be used for this API.

| URL                | Description | Variables                                                  |
| ------------------ | ----------- | ---------------------------------------------------------- |
| https://google.com | -           | <ul><li>**var**: default: abc; options: a,b,c;</li></ul> |

# Security?

The following security schemes are used by this API for authentication and authorization. These must be taken into account in every request unless otherwise stated.

(check security then find in security schema, group by type)

## API Key Authentication?

This API is secured through API Keys which you may obtain separately.

### {{Api Key}}

To authenticate requests, include `X-Api-Key` as a request header. {{description}}

```http
GET /example
Host: example.com
X-Api-Key: SAMPLE-API-KEY-a29@102&3djSF9
```

### {{Api Cookie}}

To authenticate requests, include `X-Api-Key` as a request cookie. {{description}}

```http
GET /example HTTP/1.1
Host: example.com
Cookie: X-Api-Key=acd2#*hvqkdjq3jemg
```

### {{Api Query}}

To authenticate requests, include `X-Api-Key` as a URL query parameter. {{description}}

```http
GET /example?X-Api-Key=KJNvdj83kSMbe92umw HTTP/1.1
Host: example.com
```

## Basic Authentication?

This API is secured through basic authentication. 

To authenticate requests, Base64-encode the concatenated string of the username and password (`username:password`), prefix it with `Basic ` and include it in the request as the value of `Authorization` header.

```http
GET /example HTTP/1.1
Host: example.com
Authorization: Basic dXNlcjE6cGFzc3dvcmQxMjM=
```

## Bearer Authentication

This API is secured through bearer token authentication.

To authenticate requests, include the token {{in JWT format}}, prefixed with `Bearer ` in the request as the value of the `Authorization` header.

```http
GET /example HTTP/1.1
Host: example.com
Authorization: Bearer dXNlcjE6cGFzc3dvcmQxMjM=
```

## OAuth2 Authentication

to follow

# Endpoints

## {{ Tag }}

### `GET /users` ({{operationId}})

{{ Summary }}

{{description}}

Read more about this API endpoint here: {{externalDocs.url}}

#### Path Parameters

| Key     | Type            | Required | Example | Restrictions |
| ------- | --------------- | -------- | ------- | ------------ |
| user_id | {{schema.type}} | Yes      | 1       | Max: 255     |

#### Query Parameters

| Key     | Type            | Required | Example | Restrictions |
| ------- | --------------- | -------- | ------- | ------------ |
| user_id | {{schema.type}} | Yes      | 1       | Max: 255     |

#### Request Headers

| Key     | Type            | Required | Example | Restrictions |
| ------- | --------------- | -------- | ------- | ------------ |
| user_id | {{schema.type}} | Yes      | 1       | Max: 255     |

#### Cookies

| Key     | Type            | Required | Example | Restrictions |
| ------- | --------------- | -------- | ------- | ------------ |
| user_id | {{schema.type}} | Yes      | 1       | Max: 255     |

#### Request Body

Content-Type: {{application/json}}

| Key        | Type   | Required | Nullable | Example | Restrictions |
| ---------- | ------ | -------- | -------- | ------- | ------------ |
| first_name | string | No       | No       | John    | Max: 255     |
| obj.key    | string | No       | No       | John    | Max: 255     |

#### Responses

##### 200

###### Response Headers

| Key         | Type    | Description |
| ----------- | ------- | ----------- |
| Retry-After | integer | -           |

###### Response Body

Content-Type: {{text/plain}}

{{`example`}}

