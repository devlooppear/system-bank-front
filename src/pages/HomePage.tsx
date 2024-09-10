import { FaCheck, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import logoMetisBank from "/logo/android-chrome-512x512.png";
import aboutUSMetis from "/imgs/21c04bda-8310-49bb-8a47-7e01adf192bc.jpeg";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <header className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-blue-600 to-blue-800 text-white text-center p-6">
        <img
          src={logoMetisBank}
          alt="logo-metis-bank"
          className="rounded-full shadow-lg my-4 w-32 sm:w-40 lg:w-48"
        />
        <h1 className="text-5xl font-extrabold mb-4">Construa Seu Futuro Hoje</h1>
        <p className="text-lg mb-4 max-w-2xl">
          Bem-vindo ao MetisBank! Aqui, inovação e confiança andam de mãos dadas.
          Junte-se a milhares de clientes que já estão vivenciando o futuro da
          banca — um futuro centrado em você.
        </p>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
          Abra Sua Conta Agora
        </button>
      </header>

      <section className="py-12 bg-gray-100 min-h-[55vh]">
        <div className="max-w-7xl mx-auto px-5">
          <h3 className="text-4xl py-3 font-semibold text-gray-800 text-center mb-8">
            O Que Oferecemos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            <div className="flex flex-col items-center bg-white px-6 py-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaShieldAlt className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold">Segurança</h4>
              <p className="text-gray-600 text-center">
                Na MetisBank, a sua segurança é a nossa prioridade. Utilizamos criptografia de ponta para proteger seus dados e transações.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaCheck className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold">Simplicidade</h4>
              <p className="text-gray-600 text-center">
                Desfrute de uma experiência bancária sem complicações. Nossa interface intuitiva torna fácil o gerenciamento das suas finanças.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaMobileAlt className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold">Acessibilidade</h4>
              <p className="text-gray-600 text-center">
                Acesse nossos serviços bancários a qualquer hora, em qualquer lugar. Estamos sempre conectados, seja pelo celular ou desktop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row bg-gray-200 py-12">
        <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img
            src={aboutUSMetis}
            alt="metis-bank-about"
            className="max-w-xs sm:max-w-md lg:max-w-lg rounded-md shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 px-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4 border-b-2 border-blue-950 py-2">
            Sobre Nós
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Na MetisBank, buscamos redefinir o padrão do setor bancário, oferecendo qualidade e segurança em cada transação.
            Estamos aqui para garantir que sua experiência financeira seja a melhor possível.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
