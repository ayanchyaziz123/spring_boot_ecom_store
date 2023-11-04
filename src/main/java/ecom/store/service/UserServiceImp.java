package ecom.store.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ecom.store.model.User;
import ecom.store.repository.UserRepository;

@Service
public class UserServiceImp implements UserService{
    private final UserRepository userRepository;
    
    @Autowired
    public UserServiceImp(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public User createUser(User user)
    {
        return userRepository.save(user);
    }
    
}
