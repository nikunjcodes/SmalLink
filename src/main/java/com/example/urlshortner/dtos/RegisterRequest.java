package com.example.urlshortner.dtos;

import lombok.Data;

import java.util.Set;
@Data
public class RegisterRequest {
    private String username;
    private String email;
    private Set<String> role;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public Set<String> getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }
}
