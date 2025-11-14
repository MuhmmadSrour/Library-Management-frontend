function ContactUs() {
  return (
    <div className="flex flex-col gap-2 p-4 w-full bg-brown-100 border border-brown-500 rounded-lg m-2">
      <h3 className="text-2xl font-extrabold ">Contact Us:</h3>
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold ">address</h4>
        <p>123 library street</p>
        <p>library, TW ,55555</p>
      </div>
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold ">phone number</h4>
        <p>0967226041</p>
      </div>
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold ">email</h4>
        <p>myLibrary@lip.com</p>
        <p>muhmmadsrour6@gmail.com</p>
      </div>
    </div>
  );
}

export default ContactUs;
