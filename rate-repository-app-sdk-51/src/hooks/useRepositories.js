import { useState, useEffect } from "react"
import { LOCALHOST } from '../../config'
import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

export const useRepositories = () => {

    // const [repositories, setRepositories] = useState([])
    // const [loading, setLoading] = useState(false)

    // const fetchRepos = async () => {
    //     setLoading(true)
    //     const response = await fetch(`http://${LOCALHOST}:5001/api/repositories`)
    //     const data = await response.json()

    //     const mappedRepos = data.edges.map(e => e.node)
    //     // console.log(data, mappedRepos)
    //     setLoading(false)
    //     console.log(mappedRepos)
    //     setRepositories(mappedRepos)
    // }

    // useEffect(() => { fetchRepos() }, [])

    const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' })
    const repositories = data?.repositories.edges.map(e => e.node)

    return { repositories, loading, error }
}
