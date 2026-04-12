package com.impactamais.backend.dto;
import lombok.Data;

@Data
public class CadastroDTO {
    private String username;
    private String email;
    private String senha;
    private boolean termosAceitos;
}