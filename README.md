# Node API Template on Docker

The API framework includes logging, lint testing, unit/integration testing, code coverage, swagger wrapped in a Docker container.  

## Intial API Functionality:
 - Run echo command on terminal
 - Adding two numbers together passed by user as parameters 

##### Swagger
 - http://[URL]/

##### Code Coverage
 - http://[URL]/coverage/
 
## Files & Directories
   - application/
     - server.js
       - Centeral API framework
       - Logging
       - Organize routes
       - Swagger location
       - Serve code coverage reports
       - Listening port
     - package.json
       - Installs proper version of modules required by API
       - Defines bash command aliases. ie Unit Testing/Coverage Report
     - routes/
       - Contains files which define endpoints
     - functions/
       - Define custom functions used by files in *routes* directory
     - test/unit.js
       - Unit testing
     - swagger/api-docs.yml
       - Swagger API documentation
     - .eslintrc.yml
       - Lint Testing
       - Define rules linting should follow  
   - Dockerfile
     - Creates a base docker container for the api

## Local Testing using Docker

Prerequisites:
  - Docker and Git are installed locally

Remove any docker containers named *node-api-template* with the below command:  
  - `docker rm -f node-api-template`   
    - **-f** - Force the removal  
    - **node-api-template** - Container name  

On your command console, go to this repo and create the node-api-template container. Link the two containers and pass the environmental variables:  
  - `cd node-api-template`
  - `docker build -t template/node-api-template .`   
    - **-t template/node-api-template** - Image tag name (namespace/name)
    - **.** - Build from current directory  
  - `docker run --name node-api-template -d -p 8080:8080 -e PORT=8080 -w /opt/application template/node-api-template`
    - **--name node-api-template** - Name of container
    - **-d** - Run container in background (Detached)
    - **-p 8080:8080** - Binds the container port to the host port (containerPort:hostPort)
    - **-e PORT=8080** - Define environmental variables used by container (evironmentalVariable=value)
    - **-w /opt/application** - Working directory in container
    - **template/node-api-template** - Image name from build (namespace/name)  

Verify the container is running with the following command:
  - `docker ps -a`  

Manually Test the API (Use Swagger, PostMan, cURL, etc) 

Unit Test w/ Coverage Report
  - `docker exec -t node-api-template npm run-script test-cover`
    - **-t** - Allocate a pseudo-TTY
    - **node-api-template** - Name of container
    - **npm run-script test-cover** - Command to exec 

Lint Test
  - `docker exec -t node-api-template node_modules/.bin/eslint server.js functions routes`
    - **-t** - Allocate a pseudo-TTY
    - **node-api-template** - Name of container
    - **node_modules/.bin/eslint** - Lint script
    - **server.js functions routes** - Files and directories to test

View Coverage Report
  - [localhost:8080/coverage/](localhost:8080/coverage/)