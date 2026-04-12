package com.impactamais.backend.service;

import com.impactamais.backend.config.RabbitMQConfig;
import com.impactamais.backend.dto.EmailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailConsumer {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    @RabbitListener(queues = RabbitMQConfig.FILA_EMAIL)
    public void consumirEmail(EmailDTO dto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(remetente);
        message.setTo(dto.getEmail());
        message.setSubject(dto.getAssunto());
        message.setText(dto.getCorpo());
        mailSender.send(message);
    }
}