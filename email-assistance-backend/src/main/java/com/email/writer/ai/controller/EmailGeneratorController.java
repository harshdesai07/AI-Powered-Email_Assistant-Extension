package com.email.writer.ai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.email.writer.ai.dto.EmailReplyResponse;
import com.email.writer.ai.dto.EmailRequest;
import com.email.writer.ai.service.EmailGeneratorService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate/reply")
    public Mono<ResponseEntity<EmailReplyResponse>> generateEmailReply(
            @Valid @RequestBody EmailRequest emailRequest) {

        return emailGeneratorService
                .generateEmailReply(emailRequest)
                .map(reply -> ResponseEntity.ok(
                        new EmailReplyResponse(reply)));
    }
}