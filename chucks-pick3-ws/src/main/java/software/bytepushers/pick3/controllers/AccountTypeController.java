package software.bytepushers.pick3.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.bytepushers.pick3.domain.AccountType;
import software.bytepushers.pick3.repositories.AccountRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static software.bytepushers.pick3.config.security.SecurityConstants.ACCOUNT_TYPE_END_POINT;

@RestController
@RequestMapping(ACCOUNT_TYPE_END_POINT)
public class AccountTypeController {

    private final AccountRepository accountRepository;


    public AccountTypeController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    /**
     * The rest endpoint is responsible for creating/adding/saving the account types into the system.
     */
    @PostMapping
    public void save() {
        Arrays.asList(software.bytepushers.pick3.dto.enums.AccountType.values()).forEach(accountType -> {
            Optional<AccountType> accountOptional = this.accountRepository.findByName(accountType.name());
            if (accountOptional.isEmpty()) {
                AccountType account = new AccountType();
                account.setName(accountType.name());
                this.accountRepository.save(account);
            }
        });
    }

    @GetMapping
    public List<String> getAll() {
        return this.accountRepository.findAll().stream().map(AccountType::getName).collect(Collectors.toList());
    }
}
