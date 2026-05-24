package com.email.writer.ai.enums;

public enum EmailTone {
    PROFESSIONAL,
    CASUAL,
    FRIENDLY,
    FORMAL;

    public String toLowerCase() {
        return this.name().toLowerCase();
    }
}
