# VideoCloudServer 

## Sign In 

**URL** : `\signin` 

**Method** : `POST` 

**Auth Required** : NO 

**Request Body Example** 

```json
{
    "id": "testID",
    "pw": "testPW"
}
```

**Succeeded Response Example** 

```json
{
    "status": true,
    "id": "testID"
}
```

**Failed Response Example** 

```json
{
    "status": false,
    "message": "Authenticated failed"
}
```

## Sign Out 

**URL** : `\signout` 

**Method** : `GET` 

**Auth Required** : NO 

**Succeeded Response Example** 

```json
{
    "status": true
}
```

## Sign Up 

**URL** : `\signup` 

**Method** : `POST` 

**Auth Required** : NO 

**Request Body Example** 

```json
{
    "id": "testID",
    "pw": "testPW",
    "username": "testUsername"
}
```

**Succeeded Response Example** 

```json
{
    "status": true
}
```

## User Status 

**URL** : `\status` 

**Method** : `GET` 

**Auth Required** : YES 

**Succeeded Response Example** 

```json
{
    "status": true,
    "id": "testID"
}
```

**Failed Response Example** 

```json
{
    "status": false,
    "message": "Authenticated failed"
}
```
