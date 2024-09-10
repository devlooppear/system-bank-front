import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { path: "/", label: "Início" },
    { path: "/about", label: "Sobre Nós" },
    { path: "/services", label: "Serviços" },
  ];

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Metis Bank</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex flex-col items-center mb-4 sm:mb-0 w-full my-3">
            <h4 className="font-bold text-lg">Links Úteis</h4>
            <ul className="flex flex-col items-center text-sm">
              {links.map((link, index) => (
                <li key={index} className="mt-2 hover:underline">
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center mb-4 sm:mb-0 w-full my-3">
            <h4 className="font-bold text-lg">Contato</h4>
            <p className="text-sm">Email: contato@metisbank.com</p>
            <p className="text-sm">Telefone: (11) 1234-5678</p>
          </div>
          <div className="flex flex-col items-center mb-4 sm:mb-0 w-full my-3">
            <h4 className="font-bold text-lg">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} Metis Bank. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
