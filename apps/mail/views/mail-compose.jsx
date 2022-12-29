import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

export function MailCompose() {
  const [email, setEmail] = useState(mailService.getEmptyEmailToSend())
  const navigate = useNavigate()

  // useEffect(()=>{
  //   mailService.save(email)
  //   let intervalID= setInterval(()=>{
  //     mailService.save(email).then(console.log)
  //   },2000)
  //   return () => {clearInterval(intervalID)}
  // },[])


  function onCloseCompose(){
    navigate('/mail')
  }



  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
  }



  function handleSubmit(event) {
    event.preventDefault();
    email.sentAt = Date.now()
    mailService.save(email).then(() => setEmail(mailService.getEmptyEmailToSend()))

  }

  return (
    <section className="mail-compose">
            <div className="compose-header">
              <button onClick={()=> onCloseCompose()}>X</button>
            </div>
      <form onSubmit={handleSubmit} className="flex column">
        <label htmlFor="to" className="compose-label">To:
        <input
          type="text"
          name='to'
          required
          id="to"
          value={email.to}
          onChange={(e) => handleChange(e)}
          className="compose-input"
        /></label>
        <label htmlFor="subject" className="compose-label">Subject:
        <input
          type="text"
          name='subject'
          required
          id="subject"
          value={email.subject}
          onChange={(e) => handleChange(e)}
          className="compose-input"
        /></label>
        <label htmlFor="body" className="compose-label">Body:
        <textarea
          id="body"
          required
          name='body'
          value={email.body}
          onChange={(e) => handleChange(e)}
          className="compose-textarea"
        /></label>

      </form>
        <button type="submit" className="compose-button">Send</button>

    </section >
  )
}


