package com.impactamais.backend.repository;

import com.impactamais.backend.domain.entity.CodigoVerificacao;
import com.impactamais.backend.domain.enums.TipoCodigo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodigoVerificacaoRepository extends JpaRepository<CodigoVerificacao, Long> {
    Optional<CodigoVerificacao> findByEmailAndCodigoAndTipo(String email, String codigo, TipoCodigo tipo);
}