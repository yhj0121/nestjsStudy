const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    teams: [Team]
    equipments: [equipment]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
  }
  type equipment {
    id: Int
    used_by: String
    count: Int
    new_or_used: String
  }
`;
function teams() {
  return database.teams;
}
const resolvers = {
  Query: {
    teams,
    equipment: () => database.equipments,
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
