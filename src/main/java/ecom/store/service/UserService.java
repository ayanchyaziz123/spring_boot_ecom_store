package ecom.store.service;

import java.util.Optional;

import ecom.store.model.User;

public interface UserService {
    public User createUser(User user);
    public Optional<User> getUserByEmail(String email);
}
