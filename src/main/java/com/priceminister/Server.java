package com.priceminister;

import io.vertx.core.AbstractVerticle;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;


public class Server extends AbstractVerticle {

    @Override
    public void start() {
        Router router = Router.router(vertx);

        // Serve the static pages
        router.route().handler(StaticHandler.create("webroot"));

        vertx.createHttpServer().requestHandler(router::accept).listen(8080);

        System.out.println("Server is started");
    }
    
    @Override
    public void stop() {
        System.out.println("Server is stoped");
    }
}