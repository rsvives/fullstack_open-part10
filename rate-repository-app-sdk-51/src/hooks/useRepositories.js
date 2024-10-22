import { useState, useEffect } from "react"
import { LOCALHOST } from '../../config'
import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

export const useRepositories = () => {

    const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' })
    const repositories = data?.repositories.edges.map(e => e.node)

    return { repositories, loading, error }
}
