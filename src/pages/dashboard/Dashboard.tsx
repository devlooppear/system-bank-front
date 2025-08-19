import { useUserById } from "../../api/hooks/useUser";
import defaultUserImg from "/imgs/27059cae-6647-4966-b6c6-e80475d08712.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import RecentTransactions from "./RecentTransactions";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { systemColors } from "../../common/constants/systemColors";

const Dashboard = () => {
  const { t } = useTranslation();
  const user_id = localStorage.getItem("user_id");
  const { user, loading: userLoading, error: userError } = useUserById(
    user_id ? parseInt(user_id) : 0
  );

  if (userLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Loader />
      </Box>
    );
  }

  if (userError) {
    return (
      <Typography color="error" textAlign="center" mt={5} variant="h6">
        {t("loadingUserError", { error: userError })}
      </Typography>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        background: `linear-gradient(to top, ${systemColors.blue[100]}, #fff)`,
        position: "relative",
        pt: { xs: 6, md: 10 },
      }}
    >
      {/* Top Banner */}
      <Box
        position="absolute"
        top={0}
        width="100%"
        height={{ xs: "25vh", md: "38vh" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: "url('/imgs/blue-background.jpg')",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      >
        <Typography
          color={systemColors.white}
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }}
        >
          {t("welcomeUserProfile")}
        </Typography>
      </Box>

      {/* Main Card */}
      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 20, md: 24 },
          zIndex: 3,
          position: "relative",
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
          p: { xs: 3, md: 4 },
        }}
      >
        {user && (
          <Stack
            spacing={3}
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            {/* User Title */}
            <Typography
              fontWeight="bold"
              color={systemColors.blue[700]}
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              {t("userProfileTitle")}
            </Typography>

            {/* User Avatar */}
            <Avatar
              src={defaultUserImg}
              sx={{
                width: { xs: 96, md: 128 },
                height: { xs: 96, md: 128 },
                border: 2,
                borderColor: "grey.400",
                boxShadow: 2,
              }}
            />

            {/* User Details */}
            <Typography
              fontWeight="medium"
              color={systemColors.blue[600]}
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              {t("userDetailsTitle")}
            </Typography>

            <Paper
              elevation={1}
              sx={{
                p: { xs: 2, md: 3 },
                minWidth: 280,
                maxWidth: 360,
                width: "100%",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="body1">
                  {t("userEmail", { email: user.email })}
                </Typography>
                <Typography variant="body1">
                  {t("userName", { name: user.name })}
                </Typography>

                {user.accounts && user.accounts.length > 0 && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body1">
                      {t("accountBalance", {
                        balance: user.accounts[0].balance,
                      })}
                    </Typography>
                    <Typography variant="body1">
                      {t("accountType", {
                        accountType: user.accounts[0].account_type,
                      })}
                    </Typography>
                  </>
                )}
              </Stack>
            </Paper>
          </Stack>
        )}

        {/* Recent Transactions */}
        <Box mt={4}>
          <RecentTransactions userId={user_id} />
        </Box>
      </Container>

      <ToastContainer />
    </Box>
  );
};

export default Dashboard;
