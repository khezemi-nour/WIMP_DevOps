const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./process.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NodeService = grpc.loadPackageDefinition(packageDefinition).NodeService;

const client = new NodeService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.AddProcess({}, (error, news) => {
    if (!error) throw error;
    console.log(news);
  });

