import { gql,useQuery } from "@apollo/client"

// User is a subtype ,authnenticatedItem returns union can be multiple types
export const CURRENT_USER_QUERY =gql`
    query CURRENT_USER_QUERY {
        authenticatedItem {
            ... on User {                                     
                id
                email
                name
                cart {
                    id
                    quantity
                    product {
                        id
                        price
                        name
                        description
                        photo {
                            image {
                                publicUrlTransformed
                            }
                        }
                    }
                }
            }
        }
    }
`;

export function useUser() {
    const {data} = useQuery(CURRENT_USER_QUERY);
    return data?.authenticatedItem;
}