require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const port = process.env.port || 5000;
const mongodbString = process.env.MONGODB_URL || "mongodb://localhost/test";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
mongoose
  .connect(mongodbString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDb Connected");
    return server.listen({ port });
  })
  .then((res) => {
    console.log(`Server is Running at ${res.url}`);
  })
  .catch((err) => console.error(err));
