package software.bytepushers.pick3;


import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.serverless.proxy.spring.SpringBootProxyHandlerBuilder;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.Instant;


public class StreamLambdaHandler implements RequestStreamHandler {

    private final SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    public StreamLambdaHandler() throws ContainerInitializationException {
        long startTime = Instant.now().toEpochMilli();
        SpringBootLambdaContainerHandler.getContainerConfig().setInitializationTimeout(30_000);
        handler = new SpringBootProxyHandlerBuilder()
                .defaultProxy()
                .asyncInit(startTime)
                .springBootApplication(ChucksPick3Application.class)
                .profiles("aws")
                .buildAndInitialize();

    }

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context)
            throws IOException {
        handler.proxyStream(inputStream, outputStream, context);
    }
}