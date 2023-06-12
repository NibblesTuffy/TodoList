import { useDeleteTasks, useEditTasks } from "./ReactQueryHooks";


const SingleItem = ({ item }) => {

  const { changeDone } = useEditTasks()
  const { deleteDone } = useDeleteTasks() 
  
  

  
  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => changeDone(item.id,item.isDone)}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deleteDone(item.id)}
      >
        delete
      </button>
    </div>
  )
};
export default SingleItem;
