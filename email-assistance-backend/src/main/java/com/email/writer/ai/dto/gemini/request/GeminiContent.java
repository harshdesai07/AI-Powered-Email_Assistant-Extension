package com.email.writer.ai.dto.gemini.request;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GeminiContent(
    @JsonProperty("parts")
    List<GeminiPart> parts
) {}