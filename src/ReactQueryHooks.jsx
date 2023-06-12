import customFetch from "./utils"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from 'react-toastify'
export const useFetchTasks = () => {
    const { isLoading, data, error, isError } = useQuery({
      queryKey: ['tasks'],
      queryFn: () => customFetch.get('/'),
    })
    return {isLoading, data, error, isError}
}


export const useCreateTasks = () => { 
    const queryClient = useQueryClient()
    const { mutate: addTask, isLoading } = useMutation({
      mutationFn: (name) => customFetch.post('/', { title: name }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] }) //this fetch query's data is not up-to-date and shoule be refetched
        toast.success('task added!')

      },
      onError: (error) => {
        toast.error(error.response.data.msg)
      },
    })

    return {addTask, isLoading}


 }

 export const useEditTasks = () => {
    const queryClient = useQueryClient()
    const { mutate: changeDone } = useMutation({
      mutationFn: (id,isDone) => {
        customFetch.patch('/' + id, { isDone: !isDone })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        toast.success('Edit Success!')
      },
    })
    return { changeDone }

 }

 export const useDeleteTasks = () => {

    const queryClient = useQueryClient()
    const { mutate: deleteDone } = useMutation({
      mutationFn: (id) => {
        customFetch.delete('/' + id)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        toast.success('Delete Success!')
      },
    })

    return {deleteDone}
 }