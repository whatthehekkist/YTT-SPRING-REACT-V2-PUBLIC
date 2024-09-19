# https://ytt.koyeb.app/

# tech stack
- Spring Boot 3.x.x
- Java 21
- mongoDB atlas
- React

# how to run the app in localhost
## op1) build and run Spring & React (integrated build)  
- Spring: `./gradlew clean build` -> `java -jar ./build/libs/your.jar` -> localhost:8080

## op2) build and run Spring and then React at runtime 
- Spring: `./gradlew clean bootrun`
- React: `npm start` at *./src/main/frontend/*


