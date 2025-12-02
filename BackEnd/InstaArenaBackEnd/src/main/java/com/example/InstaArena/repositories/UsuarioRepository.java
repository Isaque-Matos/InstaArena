package com.example.InstaArena.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InstaArena.entities.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
	Optional<UsuarioEntity> findByEmail(String email);
}
