import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <section className="border-t">
      <h3 className="text-center">
          <span>Created by </span>
          <Link
            className="text-black font-extrabold transition hover:text-red-500"
            to="https://hire-david-hype.vercel.app"
          >
            David Hype
          </Link>
        </h3>
    </section>
  )
}

export default Footer;