package ecom.store.model;
import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @Value("${user.default.isAdmin:false}")
    private boolean isAdmin;
    @Value("${user.default.isVerified:false}")
    private boolean isVerified; 
    public User(){
        this.isAdmin = false;
        this.isVerified = false;
    }
    public void setId(Long id)
    {
        this.id = id;
    }
    public Long getId()
    {
        return id;
    }
    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }
    public String getFirstName()
    {
        return firstName;
    }
    public void setLastname(String lastName)
    {
        this.lastName = lastName;
    }
    public String getLastName()
    {
        return lastName;
    }
    public void setEmail(String email)
    {
        this.email = email;
    }
    public String getEmail()
    {
        return email;
    }
    public void setPassword(String password)
    {
        this.password = password;
    }
    public String getPassword()
    {
        return password;
    }
    public void setIsAdmin(boolean isAdmin)
    {
        this.isAdmin = isAdmin;
    }
    public boolean getIsAdmin()
    {
        return isAdmin;
    }
    public void setIsVerified(boolean isVerified)
    {
        this.isVerified = isVerified;
    }
    public boolean getIsVerified()
    {
        return isVerified;
    }
}
