package com.impactamais.backend.service;

import com.impactamais.backend.config.RabbitMQConfig;
import com.impactamais.backend.dto.EmailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailProducer {

    private final RabbitTemplate rabbitTemplate;

    public void enviarEmailParaFila(String email, String assunto, String corpo) {
        EmailDTO dto = new EmailDTO();
        dto.setEmail(email);
        dto.setAssunto(assunto);
        dto.setCorpo(corpo);
        rabbitTemplate.convertAndSend(RabbitMQConfig.FILA_EMAIL, dto);
    }
}