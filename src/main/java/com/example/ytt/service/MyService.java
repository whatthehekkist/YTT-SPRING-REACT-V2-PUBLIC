package com.example.ytt.service;

import com.example.ytt.controller.MyController;
import com.example.ytt.domain.MyDocument;
import com.example.ytt.repository.DocRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyService {

    private static final Logger logger = LoggerFactory.getLogger(MyService.class);

    @Autowired
    private DocRepository repository;

    //@Override
    @Transactional(readOnly = true)
    public List<MyDocument> getRandomDocs() {

        List<MyDocument> randomDocs = null;

        try {
            // return repository.findRandomDocs().stream().findFirst().orElse(null);
            randomDocs = repository.random().getMappedResults();

        } catch (DataAccessException dae) {
            logger.error("Data access error on retrieving aggregated results in random: {}", dae.getMessage());

        } catch (Exception e) {
            logger.error("Unexpected error on retrieving aggregated results in random: {}", e.getMessage());
        }
        
        return randomDocs;
    }

    @Transactional(readOnly = true)
    public MyDocument getSampleDoc() {
        return repository.findById("66bd8368a738ab3fae35c7ce")
                .orElseThrow(()
                        -> new IllegalArgumentException("MyService.getSampleDoc(): IllegalArgumentException thrown. PLZ CHECK arg"));
    }

    @Transactional(readOnly = true)
    public MyDocument getDocumentById(String id) {

        logger.info("At MyService.getDocumentById(String id): " + id);

        return repository.findById(id)
                .orElseThrow(()
                        -> new IllegalArgumentException("MyService.getDocumentById(String id): IllegalArgumentException thrown. PLZ CHECK arg"));
    }

    // not in use
    /*public List<MyDocument> getAllDocuments() {
        return repository.findAll();
    }*/

}