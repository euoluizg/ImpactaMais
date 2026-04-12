package com.impactamais.backend.controller;

import com.impactamais.backend.dto.CadastroDTO;
import com.impactamais.backend.dto.LoginDTO;
import com.impactamais.backend.dto.ValidarCodigoDTO;
import com.impactamais.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody CadastroDTO dto) {
        authService.registrar(dto);
        return ResponseEntity.ok("Código enviado para o e-mail");
    }

    @PostMapping("/verify-signup")
    public ResponseEntity<String> verifySignup(@RequestBody ValidarCodigoDTO dto) {
        authService.validarCodigoRegistro(dto);
        return ResponseEntity.ok("Conta ativada com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO dto) {
        String token = authService.login(dto);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        authService.solicitarRecuperacaoSenha(email);
        return ResponseEntity.ok("Código de recuperação enviado");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestParam String email,
            @RequestParam String codigo,
            @RequestParam String novaSenha) {
        authService.redefinirSenha(email, codigo, novaSenha);
        return ResponseEntity.ok("Senha alterada com sucesso");
    }
}