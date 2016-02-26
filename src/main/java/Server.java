
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerRequest;


public class Server extends AbstractVerticle {

    public void start() {
        vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                String file = req.path().equals("app/") ? "index.html" : req.path();
                req.response().sendFile("app/" + file);
            }
        }).listen(8080);
    }
//@Override
//  public void start(Future<Void> fut) {
//    vertx
//        .createHttpServer()
//        .requestHandler(r -> {
//          r.response().end("<h1>Hello from my first " +
//              "Vert.x 3 application</h1>");
//        })
//        .listen(8080, result -> {
//          if (result.succeeded()) {
//            fut.complete();
//          } else {
//            fut.fail(result.cause());
//          }
//        });
//  }
}