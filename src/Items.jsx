import SingleItem from './SingleItem'
import { useFetchTasks } from './ReactQueryHooks'


const Items = () => {
  const {data, error, isError, isLoading} = useFetchTasks()
  if (isLoading) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>
  }
  if (isError) {
    return <p style={{ marginTop: '1rem' }}>{error.message}...</p>
  }

  console.log(data)

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
