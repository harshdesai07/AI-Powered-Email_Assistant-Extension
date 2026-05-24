package com.email.writer.ai.dto.gemini.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GeminiPart(
    @JsonProperty("text")
    String text
) {}