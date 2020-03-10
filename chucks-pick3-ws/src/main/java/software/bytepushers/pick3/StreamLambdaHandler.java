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

    private SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    public StreamLambdaHandler() throws ContainerInitializationException {
        long startTime = Instant.now().toEpochMilli();
        handler = new SpringBootProxyHandlerBuilder()
                .defaultProxy()
                .asyncInit(startTime)
                .springBootApplication(ChucksPick3Application.class)
                .profiles("aws")
                .buildAndInitialize();
    }

    /*private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    static {
        try {
            System.out.println("Inside StreamLambdaHandler.static() method.");
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(ChucksPick3Application.class, "aws");
            // For applications that take longer than 10 seconds to start, use the async builder:
            // long startTime = Instant.now().toEpochMilli();
            // handler = new SpringBootProxyHandlerBuilder()
            //                    .defaultProxy()
            //                    .asyncInit(startTime)
            //                    .springBootApplication(ChucksPick3Application.class)
            //                    .buildAndInitialize();
            System.out.println("Inside StreamLambdaHandler.static() method - Done initializing app.");
            ProfileManager pm = new ProfileManager();
            pm.getActiveProfiles();
        } catch (ContainerInitializationException e) {
            // if we fail here. We re-throw the exception to force another cold start
            System.out.println("Could not initialize Spring framework");
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring framework", e);
        }
    }*/

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context)
            throws IOException {
        handler.proxyStream(inputStream, outputStream, context);

        // just in case it wasn't closed by the mapper
        //outputStream.close();
    }
}