package com.impactamais.backend.service;

import com.impactamais.backend.domain.entity.CodigoVerificacao;
import com.impactamais.backend.domain.entity.Usuario;
import com.impactamais.backend.domain.enums.TipoCodigo;
import com.impactamais.backend.dto.CadastroDTO;
import com.impactamais.backend.dto.LoginDTO;
import com.impactamais.backend.dto.ValidarCodigoDTO;
import com.impactamais.backend.repository.CodigoVerificacaoRepository;
import com.impactamais.backend.repository.UsuarioRepository;
import com.impactamais.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final CodigoVerificacaoRepository codigoRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailProducer emailProducer;
    private final JwtService jwtService;

    public void registrar(CadastroDTO dto) {
        if (!dto.isTermosAceitos()) throw new RuntimeException("Termos não aceitos");
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(dto.getUsername());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
        usuario.setEnabled(false);
        usuarioRepository.save(usuario);

        gerarEEnviarCodigo(usuario.getEmail(), TipoCodigo.REGISTRO);
    }

    public void validarCodigoRegistro(ValidarCodigoDTO dto) {
        CodigoVerificacao codigo = codigoRepository.findByEmailAndCodigoAndTipo(
                dto.getEmail(), dto.getCodigo(), TipoCodigo.REGISTRO)
                .orElseThrow(() -> new RuntimeException("Código inválido"));

        if (codigo.getDataExpiracao().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Código expirado");
        }

        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail()).orElseThrow();
        usuario.setEnabled(true);
        usuarioRepository.save(usuario);
        codigoRepository.delete(codigo);
    }

    public String login(LoginDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getSenha())
        );
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail()).orElseThrow();
        if (!usuario.isEnabled()) throw new RuntimeException("E-mail não verificado");

        return jwtService.generateToken(usuario);
    }

    public void solicitarRecuperacaoSenha(String email) {
        gerarEEnviarCodigo(email, TipoCodigo.RECUPERACAO_SENHA);
    }

    @SuppressWarnings("null")
    public void redefinirSenha(String email, String codigoValidacao, String novaSenha) {
        CodigoVerificacao codigo = codigoRepository.findByEmailAndCodigoAndTipo(
                email, codigoValidacao, TipoCodigo.RECUPERACAO_SENHA)
                .orElseThrow(() -> new RuntimeException("Código inválido"));

        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
        codigoRepository.delete(codigo);
    }

    private void gerarEEnviarCodigo(String email, TipoCodigo tipo) {
        String codigoGerado = String.format("%06d", new Random().nextInt(999999));

        CodigoVerificacao codigoEntity = new CodigoVerificacao();
        codigoEntity.setEmail(email);
        codigoEntity.setCodigo(codigoGerado);
        codigoEntity.setTipo(tipo);
        codigoEntity.setDataExpiracao(LocalDateTime.now().plusMinutes(5));
        codigoRepository.save(codigoEntity);

        String assunto = tipo == TipoCodigo.REGISTRO ? "Confirme seu Cadastro" : "Recuperação de Senha";
        String corpo = "Seu código é: " + codigoGerado + ". Ele expira em 5 minutos.";
        emailProducer.enviarEmailParaFila(email, assunto, corpo);
    }
}