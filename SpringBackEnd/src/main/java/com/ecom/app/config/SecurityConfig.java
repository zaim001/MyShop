package com.ecom.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.SecurityFilterChain;

import com.ecom.app.utils.CustomJwt;
import com.ecom.app.utils.CustomJwtConverter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
        	//.csrf().disable()
            .authorizeHttpRequests(authorize -> authorize
            			.requestMatchers("/api/visitor/**").permitAll()
                        .anyRequest().authenticated()
            )
            .oauth2ResourceServer((oauth2) -> oauth2.jwt(
                    jwt -> jwt.jwtAuthenticationConverter(customJwtConverter())
            ));
        return http.build();
    }

    @Bean
    public Converter<Jwt, CustomJwt> customJwtConverter() {
        return new CustomJwtConverter();
    }
}
