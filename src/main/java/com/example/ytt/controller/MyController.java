package com.example.ytt.controller;

import com.example.ytt.document.MyDocument;
import com.example.ytt.service.MyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ListIterator;

@RestController
@RequestMapping("/")
public class MyController {

    @Autowired
    private MyService service;

    @GetMapping("/randomdocs")
    public List<MyDocument> getRandomDocs() {

        System.out.println("\n------------- MyController.getRandomDocs() -------------");
        List<MyDocument> docs = service.getRandomDocs();
        System.out.println(docs);
        System.out.println(docs.size());

        ListIterator<MyDocument> iterator = docs.listIterator();
        while (iterator.hasNext()){
            System.out.println(iterator.next().getTitle());
        }
        return docs;
    }

    @GetMapping("/sampledoc")
    public ResponseEntity<?> getSampleDoc() {
        return new ResponseEntity<>(service.getSampleDoc(), HttpStatus.OK); // 200 응답
    }

    // path variable 사용시, 데이터는 문제없으나, client에서 렌더링 안되는 문제 발생
    // server: query string /doc?id=:id 로 변경
    @GetMapping("/doc")
    public MyDocument getDocumentById(@RequestParam String id) {
        return service.getDocumentById(id);
    }

    /***
    @GetMapping(value = "/{id}")
    public MyDocument getDocumentById(@PathVariable String id) {
        return service.getDocumentById(id);
    }***/

    /*@GetMapping("/documents")
    public ResponseEntity<?> getAllDocuments() {
        return new ResponseEntity<>(service.getAllDocuments(), HttpStatus.OK); // 200 응답
    }*/
}
