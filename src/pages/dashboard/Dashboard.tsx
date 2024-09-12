import { useUserById } from "../../api/hooks/useUser";
import defaultUserImg from "/imgs/27059cae-6647-4966-b6c6-e80475d08712.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";
import RecentTransactions from "./RecentTransactions";

const Dashboard = () => {
  const { t } = useTranslation();
  const user_id = localStorage.getItem("user_id");

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useUserById(user_id ? parseInt(user_id) : 0);

  if (userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (userError) {
    return (
      <div className="text-red-500 text-center mt-5">
        {t("loadingUserError", { error: userError })}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-100 to-white flex flex-col items-center gap-3 relative">
      <div className="absolute z-[0] bg-blue-background min-h-[38vh] bg-cover w-full pt-16 flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">
          {t("welcomeUserProfile")}
        </h1>
      </div>
      <div className="max-h-[100vh] z-[3] mt-8 bg-white shadow-lg rounded-lg p-6 w-[98%] max-w-[980px] mx-4">
        <div className="flex">
          {user && (
            <>
              <div className="flex flex-col items-center w-full">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-950">
                  {t("userProfileTitle")}
                </h1>
                <img
                  src={defaultUserImg}
                  className="rounded-full border-2 border-neutral-400 drop-shadow-lg mb-4 w-32 h-32"
                  alt="Imagem do Usuário"
                />
                <h2 className="text-xl font-semibold mb-2 text-blue-950">
                  {t("userDetailsTitle")}
                </h2>
                <div className="flex flex-col gap-1 mt-2 min-w-[90%] max-w-[300px]">
                  <p className="text-gray-700 mb-4">
                    {t("userEmail", { email: user.email })}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t("userName", { name: user.name })}
                  </p>
                  {user.accounts && user.accounts.length > 0 && (
                    <>
                      <p className="text-gray-700 mb-4">
                        {t("accountBalance", {
                          balance: user.accounts[0].balance,
                        })}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {t("accountType", {
                          accountType: user.accounts[0].account_type,
                        })}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <RecentTransactions userId={user_id} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
