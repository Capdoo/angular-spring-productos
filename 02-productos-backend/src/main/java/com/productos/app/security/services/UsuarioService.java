package com.productos.app.security.services;

import com.productos.app.security.model.UsuarioModel;
import com.productos.app.security.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
//Para implementar rollbacks y evitar incoherencia : Concurrencia
@Transactional
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	public Optional<UsuarioModel> getByNombreUsuario(String nombreUsuario){
		return usuarioRepository.findByNombreUsuario(nombreUsuario);
	}

	public Optional<UsuarioModel> getByNombreUsuarioOrEmail(String nombreUsuarioOrEmail){
		return usuarioRepository.findByNombreUsuarioOrEmail(nombreUsuarioOrEmail, nombreUsuarioOrEmail);
	}

	public Optional<UsuarioModel> getByTokenPassword(String tokenPassword){
		return usuarioRepository.findByTokenPassword(tokenPassword);
	}
	
	public boolean existsByNombreUsuario(String nombreUsuario) {
		return usuarioRepository.existsByNombreUsuario(nombreUsuario);
	}

	public boolean existsByNombreUsuarioOrEmail(String nombreUsuarioOrEmail) {
		return usuarioRepository.existsByNombreUsuarioOrEmail(nombreUsuarioOrEmail, nombreUsuarioOrEmail);
	}
	public boolean existsByEmail(String email) {
		return usuarioRepository.existsByEmail(email);
	}
	
	public void save(UsuarioModel usuarioModel) {
		usuarioRepository.save(usuarioModel);
	}
	
}











