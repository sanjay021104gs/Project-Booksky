package com.example.demo.book;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
@Transactional
public class BookService {
    private final BookRepository repo;
    public BookService(BookRepository repo) { this.repo = repo; }


    public List<Book> list() { return repo.findAll(); }


    public Book get(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Book not found: " + id));
    }


    public Book create(BookDTO dto) {
        Book b = new Book();
        b.setTitle(dto.title());
        b.setAuthor(dto.author());
        b.setDescription(dto.description());
        return repo.save(b);
    }


    public Book update(Long id, BookDTO dto) {
        Book b = get(id);
        b.setTitle(dto.title());
        b.setAuthor(dto.author());
        b.setDescription(dto.description());
        return repo.save(b);
    }


    public void delete(Long id) { repo.deleteById(id); }
}