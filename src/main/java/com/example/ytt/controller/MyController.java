package com.example.ytt.controller;

import com.example.ytt.domain.MyDocument;
import com.example.ytt.service.MyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.ListIterator;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/")
public class MyController {

    @Autowired
    private MyService service;

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    @GetMapping("/randomdocs")
    public List<MyDocument> getRandomDocs() {

        logger.info("\n----- MyController.getRandomDocs() -----");
        List<MyDocument> docs = service.getRandomDocs();

        logger.info(docs.toString());
        logger.info(String.valueOf(docs.size()));

        ListIterator<MyDocument> iterator = docs.listIterator();
        while (iterator.hasNext()){
            logger.info(iterator.next().getTitle());
        }
        return docs;
    }

    @GetMapping("/sampledoc")
    public /*MyDocument*/ ResponseEntity<?> getSampleDoc() {

        logger.info("\n---- MyController.getSampleDoc() -----");

        MyDocument doc = service.getSampleDoc();
        logger.info("doc.getId(): {}", doc.getId());

        return new ResponseEntity<>(doc, HttpStatus.OK);
    }

    // /doc?id=:id
    @GetMapping("/doc")
    public /*MyDocument*/ ResponseEntity<?> getDocumentById(@RequestParam String id) {

        logger.info("\n----- [Spring Boot] MyController.getDocumentById(@RequestParam String id) -----");

        MyDocument doc = service.getDocumentById(id);
        logger.info("doc.getId(): {}", doc.getId());

        return new ResponseEntity<>(doc, HttpStatus.OK);
    }

    // ignores some default requests to Spring
     @GetMapping("favicon.ico")
     public void ignoreFavicon() {}

     @GetMapping("/doc/favicon.ico")
     public void ignoreDocFavicon() {}

     @GetMapping("/doc/static/**")
     public void ignoreDocStaticAll() {}

}
