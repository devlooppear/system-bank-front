const NoPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página Não Encontrada</h2>
          <p className="text-gray-600 mb-6">
            Desculpe, a página que você está procurando não existe ou foi removida.
          </p>
          <a 
            href="/" 
            className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700"
          >
            Voltar para a Página Inicial
          </a>
        </div>
      </div>
    </>
  );
};

export default NoPage;
