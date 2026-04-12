package com.impactamais.backend.dto;
import lombok.Data;

@Data
public class EmailDTO {
    private String email;
    private String assunto;
    private String corpo;
}