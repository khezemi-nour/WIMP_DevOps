const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const manager = require("../routes/controllers/flows.management");

function startGrpcServer(serverlink) {
  const PROTO_PATH = "./process.proto";

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const newsProto = grpc.loadPackageDefinition(packageDefinition);

  const server = new grpc.Server();

  server.addService(newsProto.NodeService.service, {
    AddProcess: (_, callback) => {
      const result = manager.startNodeRed();
      callback(null, result);
    },
    DeleteNews: (_, callback) => {
      const newsId = _.request.id;
      news = news.filter(({ id }) => id !== newsId);
      callback(null, {});
    },
  });

  server.bindAsync(
    serverlink,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("Error binding to port:", error);
        return;
      }

      console.log("Server at port:", port);
      console.log("Server running at" + serverlink);
      server.start();
    }
  );
}
startGrpcServer("127.0.0.1:50051");
module.exports = { startGrpcServer };
