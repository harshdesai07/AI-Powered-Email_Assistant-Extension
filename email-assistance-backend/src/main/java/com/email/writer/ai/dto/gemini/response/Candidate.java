package com.email.writer.ai.dto.gemini.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Candidate(
    @JsonProperty("content")
    Content content
) {}
