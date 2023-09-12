import "./Form.css";

function ContactPage() {
  return (
    <div>
      <div className="h1p">
        {" "}
        <h1>Contact Us</h1>
        <p className="pcontact">
          If you have any questions or feedback, please feel free to contact us
          using the form below.
        </p>
      </div>

      <form>
        <div className="formContent">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="formContent">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="formContent">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>
        <div>
          <button className="buyitnowref" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
