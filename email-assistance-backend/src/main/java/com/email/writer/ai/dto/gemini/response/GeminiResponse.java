package com.email.writer.ai.dto.gemini.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GeminiResponse(
    @JsonProperty("candidates")
    List<Candidate> candidates
) {}
