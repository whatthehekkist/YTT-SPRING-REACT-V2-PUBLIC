package com.example.ytt.repository;

import com.example.ytt.domain.MyDocument;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocRepository extends MongoRepository<MyDocument, String> {

    // in use
    @Aggregation(pipeline = {
            "{$project: {_id: 1, title: 1, url: 1, videoId: 1}}",
            "{$sample: {size:10}}"
    })
    AggregationResults<MyDocument> random();


    /*
    // https://bepoz-study-diary.tistory.com/435
    @Query(value = "{ 'sample': 10 } }", fields = "{'_id': 1, 'title': 1, 'url': 1, 'videoId': 1}")
    List<MyDocument> findRandomDocs();
    */

}