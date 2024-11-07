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
    private String script;
}
