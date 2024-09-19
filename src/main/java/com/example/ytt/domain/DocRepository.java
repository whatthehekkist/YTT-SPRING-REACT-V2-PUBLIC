package com.example.ytt.domain;

import com.example.ytt.document.MyDocument;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface DocRepository extends MongoRepository<MyDocument, String> {

    // in use
    @Aggregation(pipeline = {
            "{$project: {_id: 1, title: 1, url: 1, videoId: 1}}",
            "{$sample: {size:10}}"
    })
    AggregationResults<MyDocument> random();

    @Query(value = "{ 'sample': 10 } }", fields = "{'_id': 1, 'title': 1, 'url': 1, 'videoId': 1}")
    List<MyDocument> findRandomDocs();

}