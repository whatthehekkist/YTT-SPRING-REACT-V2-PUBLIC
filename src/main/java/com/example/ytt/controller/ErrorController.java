package com.example.ytt.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
public class ErrorController extends AbstractErrorController {

    private static final Logger logger = LoggerFactory.getLogger(ErrorController.class);

    public ErrorController(ErrorAttributes errorAttributes) {
        super(errorAttributes);
    }

    /* for React's SPA nature, if any error with no explicit mapping in server is, redirect to "/"
     * - not a big deal in dev with CORS + PROXY,
     * - but does matter in production throwing white label page
     *   on page refresh at dynamic React route path e.g., /doc/:id
     *   that seems to be unable to be mapped in Spring
     *   (except the static resource index.html which Spring automatically recognizes)
     **/
    @RequestMapping
    public String error(HttpServletRequest request) {

        HttpStatus status = getStatus(request);
        logger.info("status: {}", status + ", REDIRECT to /");
        return "redirect:/";
    }

    /***
     @RequestMapping
     public ResponseEntity<String> error(HttpServletRequest request) {
     HttpStatus status = getStatus(request);
     return new ResponseEntity<>(status.toString(), status);
     }
     ***/

}

// ref: https://yeongunheo.tistory.com/entry/Circular-view-path-error-%EC%9B%90%EC%9D%B8%EA%B3%BC-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95
