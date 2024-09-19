package com.example.ytt.service;

import com.example.ytt.document.MyDocument;
import com.example.ytt.domain.DocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MyService {

    @Autowired
    private DocRepository repository;

    public List<MyDocument> getRandomDocs(){
        // return (List<MyDocument>) repository.findRandomDocs().stream().findFirst().orElse(null);
        return repository.random().getMappedResults();
    }

    public MyDocument getSampleDoc() {
        return repository.findById("66bd8368a738ab3fae35c7ce")
                .orElseThrow(() -> new IllegalArgumentException("MyService.getSampleDoc(): PLZ CHECK _id"));
    }

    public MyDocument getDocumentById(String id) {
        return repository.findById(id).orElse(null);
    }

    /*public List<MyDocument> getAllDocuments() {
        return repository.findAll();
    }*/
}