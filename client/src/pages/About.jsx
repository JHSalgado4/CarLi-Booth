import './About.css'

function About({ couple }) {
  return (
    <section className="about">
      <p className="label">A note on</p>
      <h2 className="script about-title">CarLi Booth</h2>

      <p className="about-copy">
        Welcome to the official photobooth for {couple.names}&apos;s wedding.
        Strike a pose, let the countdown run, and take home a strip designed
        to match the day itself.
      </p>

      <div className="about-grid">
        <div>
          <p className="label">Reception</p>
          <p>Atalaya Farmhouse<br />Alitagtag, Batangas</p>
        </div>
        <div>
          <p className="label">Date</p>
          <p>{couple.date}</p>
        </div>
      </div>

      <div className="rule" />
      <p className="about-copy small">
        Your prayers and presence are all that we request — thank you for
        celebrating with us.
      </p>
    </section>
  )
}

export default About
