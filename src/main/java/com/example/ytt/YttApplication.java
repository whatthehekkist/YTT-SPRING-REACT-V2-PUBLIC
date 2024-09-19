// branch dev.

package com.example.ytt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class YttApplication {

	public static void main(String[] args) {
		SpringApplication.run(YttApplication.class, args);
	}

}
