# https://ytt.koyeb.app/
YTT (Youtube To Text) is a web project that provides a full caption of Youtube video by multiple languages without having to play video.

- Server (Spring)
  - GET `/randomdocs` responses with *N* random documents 
  - GET `/sampledoc` responses with a sample document
  - GET `/doc?id=:id` responses with a specific document
- Cliient (React)
  - Route `/` renders 10 Youtube video titles by fetching documents from the endpoints `/randomdocs` and `/sampledoc` by default
  - Route `/doc/:id` renders a Youtube video caption data (by multiple languages if available), by fetching a single document from the endpoint `/doc?id=:id` when user clicks one of the Transcription list buttons 

# tech stack
- Spring Boot 3.3.3, Gradle, Java 21, mongoDB atlas
  -  RestController, Lombok, JPA over data-mongodb, Logger.
  - React ^18.3.1
- Deployment: koyeb (git + buildpack)
- git, IntelliJ community

# how to run the app in localhost
```js
git clone https://github.com/whatthehekkist/YTT-SPRING-REACT-V2-PUBLIC.git
```

npm installation at `src/main/frontend`
```js
npm install axios http-proxy-middleware react-bootstrap bootstrap react-router-dom d3 d3-cloud html2pdf.js@0.9.3 react-slick slick-carousel 
```

## Spring React integrated build
op1) build and run Spring & React (integrated build)
- Spring at `/`: `./gradlew clean build` -> `java -jar ./build/libs/ytt-0.0.1-SNAPSHOT.jar` -> *http://localhost:8080*

## op2) build and run Spring and then React at runtime
- Spring at `/`: `./gradlew clean bootrun` -> *http://localhost:8080*
- React at `src/main/frontend`: `npm start` -> *http://localhost:3000*

# Refs
- https://hojun-dev.tistory.com/entry/Spring-Boot-%EB%AC%B4%EB%A3%8C%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-Koyeb-GitHub
- https://m.blog.naver.com/sosow0212/222654483174
- https://github.com/sosow0212/restApiWithReact/tree/master
- https://github1s.com/sosow0212/restApiWithReact/tree/master
- https://enai.tistory.com/33
- https://react-bootstrap.netlify.app/

