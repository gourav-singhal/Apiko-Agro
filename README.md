# Apiko-Agro-App

Apiko agro app

### Start

Make sure that you have last version of [Node js](https://nodejs.org/en//) and [npm](https://www.npmjs.com/). Thеn run
```
npm install && npm run dev

```

### Lint

```
npm run lint
```

### Development process

Each task should be done on separate branches. Each branch started from task number, then follow name of branch `t1-branch-name`.
After finishing task make pull request and notify about that, some of your colleagues for review your code.

### Api Guide 
(by __models__ means *organization*, *areas*, *landlords* etc.  

| Route                   |  HTTP Verb | Description        |
|-------------------------|------------|--------------------|
|`/api/v1/models/`        |__GET__     | Get list of models |
|`/api/v1/models/`        |__POST__    | Crete model Item   |
|`/api/v1/models/:modelId`|__GET__     | Get  model item    |
|`/api/v1/models/:modelId`| __PUT__    | Update model Item  |
|`/api/v1/models/:modelId`| __DELETE__ | Remove model item  |

Each route logic should be placed in `server/controller/` folder. Each route should place `permission checker`(except, publict route)
```
 if (!hasPermissionTo(actions.EDIT_MODELS, user, res)) {
        return;
 }
```
Actions can be only:(except, special cases *UPLOAD_FILES*)

| Name        |  Operation      | 
|-------------|-----------------|
|`EDIT_MODELS`|POST, PUT, DELETE|
|`VIEW_MODELS`|GET              |

In client in `client/utils/api/urls.js` files put only `MODELS` variable -> `MODELS: '/api/v1/models',`(except, special cases ` AMAZONS3: '/api/v1/amazonS3',` )

Each controller should have documentation about each route, that is described. With @headers and @params.

```
/**
* Provide Api for Model
 
  Model list  GET /api/v1/models
  @header
         Authorization: Bearer {token}

  Model create  POST /api/v1/models
  @header
         Authorization: Bearer {token}
  @params
         param1 {string}
         param2 {boolean}
**/         
```
-------------

Made by [![Custom Software Development Company](https://s3-eu-west-1.amazonaws.com/jssolutions/github/jss_xs.png)](http://jssolutionsdev.com/?github=Databazel) - [Custom Software Development Company](http://jssolutionsdev.com/?github=Databazel)
