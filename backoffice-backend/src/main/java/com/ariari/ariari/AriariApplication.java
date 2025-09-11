package com.ariari.ariari;

import com.github.f4b6a3.tsid.TsidCreator;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableScheduling
@SpringBootApplication
@OpenAPIDefinition(servers = {@Server(url = "/", description = "Default Server URL")})
public class AriariApplication {

	public static void main(String[] args) {
		SpringApplication.run(AriariApplication.class, args);

	}

}
