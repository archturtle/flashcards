package com.flashcards.backend;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.flashcards.backend.filters.JWTAuthFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.net.URL;
import java.security.interfaces.RSAPublicKey;

@Configuration
public class SecurityConfig {
    @Value("${auth0.audience}")
    private String auth0Audience;

    @Value("${auth0.issuer}")
    private String auth0Issuer;

    @Value("${auth0.jwks}")
    private String auth0Jwks;

    @Value("${auth0.kid}")
    private String auth0Kid;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTVerifier verifier) throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JWTAuthFilter(verifier), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public JWTVerifier jwtVerifier() throws Exception {
        URL jwksUrl = new URL(auth0Jwks);
        JwkProvider provider = new UrlJwkProvider(jwksUrl);
        Jwk jwk = provider.get(auth0Kid);
        RSAPublicKey publicKey = (RSAPublicKey) jwk.getPublicKey();
        return JWT.require(Algorithm.RSA256(publicKey))
                .withIssuer(auth0Issuer)
                .withAudience(auth0Audience)
                .build();
    }
}
