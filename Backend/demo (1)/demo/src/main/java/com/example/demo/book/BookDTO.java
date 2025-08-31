package com.example.demo.book;

import jakarta.validation.constraints.NotBlank;


public record BookDTO(
        @NotBlank String title,
        @NotBlank String author,
        String description
) {}