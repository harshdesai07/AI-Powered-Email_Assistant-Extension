package com.email.writer.ai.dto;

import com.email.writer.ai.enums.EmailTone;

import jakarta.validation.constraints.NotBlank;

public record EmailRequest(

    @NotBlank(message = "Email content must not be blank")
    String emailContent,

    EmailTone emailTone

) {
}