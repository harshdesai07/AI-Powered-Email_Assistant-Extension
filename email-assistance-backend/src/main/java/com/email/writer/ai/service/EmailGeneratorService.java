package com.email.writer.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import com.email.writer.ai.dto.EmailRequest;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
@RequiredArgsConstructor
public class EmailGeneratorService {

        private final ChatClient chatClient;

        public Mono<String> generateEmailReply(EmailRequest emailRequest) {

                String prompt = buildPrompt(emailRequest);

                return Mono.fromCallable(() -> chatClient.prompt(prompt).call().content())
                                .subscribeOn(Schedulers.boundedElastic())
                                .onErrorResume(e -> Mono
                                                .error(new RuntimeException("Failed to generate email reply", e)));
        }

        private String buildPrompt(EmailRequest emailRequest) {
                return """
                        **Original Email:**
                        %s

                        **Desired Tone:**
                        %s
                        """
                        .formatted(emailRequest.emailContent(), emailRequest.emailTone().toLowerCase());
        }
}