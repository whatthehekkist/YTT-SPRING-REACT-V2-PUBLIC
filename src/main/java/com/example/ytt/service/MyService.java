package com.example.ytt.service;

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
import java.util.Random;

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
            randomDocs = repository.getRandomDocs().getMappedResults();

        } catch (DataAccessException dae) {
            logger.error("Data access error on retrieving aggregated results in random: {}", dae.getMessage());

        } catch (Exception e) {
            logger.error("Unexpected error on retrieving aggregated results in random: {}", e.getMessage());
        }
        return randomDocs;
    }

    @Transactional(readOnly = true)
    public MyDocument getSampleDoc() {

        String[] ids = {
                "672d91f0e8e22066b815c006",
                "66bd8368a738ab3fae35c7ce",
                "670a2d66a582a4ed85767293",
                "6735ae3805cb92de1f7f951e",
                "672086132e5b49bb73bf3c8a"
        };
        Random rand = new Random();
        String docId = ids[rand.nextInt(ids.length)];

        return repository.findById(docId)
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

}