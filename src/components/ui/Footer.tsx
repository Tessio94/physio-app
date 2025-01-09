import { CiFacebook, CiInstagram, CiMail, CiPhone } from "react-icons/ci";

function Footer() {
  return (
    <footer className="bg-white">
      <div className="py-20 flex flex-col gap-14 md:gap-0 md:flex-row items-center justify-center md:w-[1200px] md:max-w-[80%] mx-auto w-fit">
        <div className="flex flex-col grow md:self-stretch">
          <img src="./logo.svg" width={100} />
          <p className="mt-auto">Ulica Marka Marulića, 15, Split</p>
        </div>
        <div className="mr-auto">
          <a
            href="mailto:mailto:someone@example.com"
            className="flex items-center gap-2"
          >
            <CiMail />
            insignia@mail.hr
          </a>
          <a href="tel:+6494461709" className="flex items-center gap-2">
            <CiPhone />
            +385 99 534 232
          </a>
          <a
            href="www.instagram.com"
            target="_blank"
            className="flex items-center gap-2"
          >
            <CiInstagram /> Instagram
          </a>
          <a
            href="www.facebook.com"
            target="_blank"
            className="flex items-center gap-2"
          >
            <CiFacebook /> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
