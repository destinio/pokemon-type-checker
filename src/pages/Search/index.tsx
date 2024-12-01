export default function Search() {
  return (
    <div className='max-w-lg m-auto p-4'>
      <form action=''>
        <input
          type='text'
          className='w-full p-2 border border-gray-300 rounded'
          placeholder='Search for a Pokemon'
        />
      </form>
    </div>
  )
}
