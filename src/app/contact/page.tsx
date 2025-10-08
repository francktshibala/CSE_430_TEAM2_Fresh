export default function ContactPage() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-description">
        Have questions about our handmade products or want to collaborate?
        We&apos;d love to hear from you! Fill out the form below or reach us
        directly.
      </p>

      <form className="contact-form">
        <label>
          Name
          <input type="text" placeholder="Your Name" required />
        </label>

        <label>
          Email
          <input type="email" placeholder="you@example.com" required />
        </label>

        <label>
          Message
          <textarea placeholder="Your message..." required></textarea>
        </label>

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h3>Other Ways to Reach Us</h3>
        <p>📍 123 Example Street, City, Country</p>
        <p>📞 (111) 123-4567</p>
        <p>✉️ example@handcraftedhaven.com</p>
      </div>
    </div>
  );
}
