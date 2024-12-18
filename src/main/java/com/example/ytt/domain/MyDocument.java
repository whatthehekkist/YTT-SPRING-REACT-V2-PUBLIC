package com.example.ytt.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.util.List;

@AllArgsConstructor
@Getter
@org.springframework.data.mongodb.core.mapping.Document(collection = "urls")
public class MyDocument {

    //@MongoId(value = FieldType.OBJECT_ID)
    @Id
    private String id;
    private String url;
    private String videoId;
    private String title;
    private List<CaptionTracks> captionTracks;

}

@AllArgsConstructor
@Getter
class CaptionTracks {
    private String name;
    private String languageCode;
    private String summary;
    private String keywords;
    private String script;
    private List<Recommend> recommends;
}

@AllArgsConstructor
@Getter
class Recommend {
    private String docId;
    private String videoId;
    private String title;
}
