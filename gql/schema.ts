export const typeDefs = `#graphql
    type Contact {
        id: ID!
        name: String!
        telNumber: String!
        country: String!
        localTime: String!
    }
    
    type Query {
        getContact(id: ID!): Contact!
        getContacts: [Contact!]!
    }
    
    type Mutation {
        addContact(name: String!,telNumber:String!): Contact!
        updateContact(id:ID!, name: String, telNumber:String): Contact!
        deleteContact(id:ID!): Boolean!
    }
 `;