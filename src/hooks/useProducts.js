import {useEffect, useState} from "react";
import requestService from "../services/requestService";

export const useProducts = (filters) => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        requestService(filters).then((res) => {
            setResponse(res || [])
        }).finally(() => {
            setIsLoading(false)
        })

        return () => {
            setIsLoading(false);
            setResponse([])
        }
    }, [filters])

    return {isLoading, response}
}