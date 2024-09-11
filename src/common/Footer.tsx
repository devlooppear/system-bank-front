const Footer = () => {
  return (
    <footer className="bg-neutral-100 text-neutral-700 min-h-[28vh]">
      <h2 className="text-xl font-semibold text-center mb-6 bg-neutral-500 text-neutral-100 py-1">
        Metis Bank
      </h2>
      <div className="flex flex-col gap-6 mx-auto px-4 pb-3">
        <div className="flex flex-col pt-5 sm:flex-row justify-between items-center mb-6">
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
