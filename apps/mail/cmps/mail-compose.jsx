const { useState } = React

export function MailCompose() {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    //mailservice add email
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="to">To:</label>
      <input
        type="text"
        id="to"
        value={to}
        onChange={(event) => setTo(event.target.value)}
      />
      <br />
      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
      />
      <br />
      <label htmlFor="body">Body:</label>
      <textarea
        id="body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  )
}

