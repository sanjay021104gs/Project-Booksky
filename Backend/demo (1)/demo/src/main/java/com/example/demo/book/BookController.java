package com.example.demo.book;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService service;
    public BookController(BookService service) { this.service = service; }


    @GetMapping
    public List<Book> list() { return service.list(); }


    @GetMapping("/{id}")
    public Book get(@PathVariable Long id) { return service.get(id); }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book create(@Valid @RequestBody BookDTO dto) { return service.create(dto); }


    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @Valid @RequestBody BookDTO dto) { return service.update(id, dto); }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}