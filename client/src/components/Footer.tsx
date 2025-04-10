import { CiFacebook, CiInstagram, CiMail, CiPhone } from "react-icons/ci";

function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex w-fit flex-col items-center justify-center gap-14 py-20 md:w-[1200px] md:max-w-[80%] md:flex-row md:gap-0">
        <div className="flex grow flex-col md:self-stretch">
          <a href="#">
            <img src="./logo.svg" width={100} />
          </a>
          <p className="mt-auto">Ulica Marka Marulića, 15, Split</p>
        </div>
        <div className="mr-auto">
          <a
            href="mailto:mailto:someone@example.com"
            className="flex items-center gap-2 transition-all hover:text-slate-600 hover:underline"
          >
            <CiMail />
            insignia@mail.hr
          </a>
          <a
            href="tel:+6494461709"
            className="flex items-center gap-2 transition-all hover:text-slate-600 hover:underline"
          >
            <CiPhone />
            +385 99 534 232
          </a>
          <a
            href="www.instagram.com"
            target="_blank"
            className="flex items-center gap-2 transition-all hover:text-slate-600 hover:underline"
          >
            <CiInstagram /> Instagram
          </a>
          <a
            href="www.facebook.com"
            target="_blank"
            className="flex items-center gap-2 transition-all hover:text-slate-600 hover:underline"
          >
            <CiFacebook /> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
