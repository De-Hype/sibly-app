

import { SiBitly } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const NotUserHeader = () => {
  return (
    <div className="flex items-center justify-between border-b py-2 px-4">
      <SiBitly className="text-5xl cursor-pointer" />
      <Link className="text-black transition hover:text-blue-700" to="/login">
        <MdAccountCircle className="text-2xl" />
      </Link>
    </div>
  );
};

export default NotUserHeader;
