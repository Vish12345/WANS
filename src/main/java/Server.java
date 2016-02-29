
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerRequest;


public class Server extends AbstractVerticle {

    public void start() {
        vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                System.out.println("path: " + req.absoluteURI());
                String file = req.absoluteURI() + "app/index.html";
                System.out.println("file: " + file);
                req.response().sendFile(file);
            }
        }).listen(8080);
    }
}