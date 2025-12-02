package com.example.InstaArena.dtos;

import jakarta.validation.constraints.NotBlank;

public record UsuarioRecordDto(@NotBlank String nome, @NotBlank String email, @NotBlank String senha) {

}
