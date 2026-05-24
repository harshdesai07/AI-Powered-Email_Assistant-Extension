package com.email.writer.ai.dto.gemini.response;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Content(
    @JsonProperty("parts")
    List<Part> parts,

    @JsonProperty("role")
    String role
) {}
