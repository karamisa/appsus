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
    <form onSubmit={handleSubmit} className="mail-compose">
      <div className="compose-header">
        <label htmlFor="to" className="compose-label">To:</label>
        <input
          type="text"
          id="to"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          className="compose-input"
        />
      </div>
      <div className="compose-header">
        <label htmlFor="subject" className="compose-label">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="compose-input"
        />
      </div>
      <div className="compose-body">
        <label htmlFor="body" className="compose-label">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="compose-textarea"
        />
      </div>
      <button type="submit" className="compose-button">Send</button>
    </form>
  )
}


