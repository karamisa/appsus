const { useState, useEffect } = React

export function MailFilter({onChangeFilter}){
    const [searchTerm, setSearchTerm] = useState('');
    const [isRead, setIsRead] = useState('');

    useEffect(()=>{
        onChangeFilter({searchTerm,isRead})
    },[isRead,searchTerm])

    function handleSearchChange(event) {
        setSearchTerm(event.target.value)
      }
    function handleReadChange(event)  {
        setIsRead(event.target.value)
      }
    function handleSubmit(e){
        e.preventDefault()
    }

return (
    <form onSubmit={handleSubmit} className="mail-filter flex justify-center">
        
        <input placeholder="Search" type="text" value={searchTerm} onChange={handleSearchChange} />
        <select onChange={handleReadChange}>
          <option value={''}>All</option>
          <option value={true}>Read</option>
          <option value={false}>Unread</option>
        </select>
    </form>
  )
}