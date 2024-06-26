// The graphql schema
export const typeDefs = `#graphql
type Film {
    id: ID!
    name: String!
    director: Director!
}

type Director {
    id: ID!
    name: String!
    films: [Film!]!
}

type Query {
    films: [Film!]!
    film(id:ID!): Film!
    directors: [Director!]!
    director(id:ID!): Director!
}

type Mutation {
    addFilm(name: String!, director: ID!): Film!
    deleteFilm(id:ID!): Film!
    updateFilm(id:ID!, name: String, owner: ID!): Film!
    addDirector(name: String!): Director!
    deleteDirector(id:ID!): Director!
    updateDirector(id:ID!, name: String): Director!
}
`;
