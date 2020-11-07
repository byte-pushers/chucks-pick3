package software.bytepushers.pick3.component;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContext implements ApplicationContextAware {

    private static org.springframework.context.ApplicationContext context;

    @Override
    public void setApplicationContext(org.springframework.context.@NotNull ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }

    public static org.springframework.context.ApplicationContext getContext() {
        return context;
    }
}
