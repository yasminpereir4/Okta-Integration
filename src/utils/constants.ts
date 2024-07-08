export const SIGN_IN_REDIRECT_URI = `com.okta.dev-07893600:/callback`;

export const SIGN_OUT_REDIRECT_URI = `com.okta.dev-07893600:/logoutCallback`;

export const CLIENT_ID = "0oahuy0vs11Iy1SIM5d7";

// async function handleSignIn() {
//   console.log("estou sendo chamado");
//   if (!isConfigured) {
//     console.log("Configuração do Okta não concluída.");
//     return;
//   }
//   console.log("permaneço sendo chamado");

//   try {
//     const result = await signInWithBrowser({});
//     console.log("aqui ja não sou mais chamado");
//     if (result && result.access_token) {
//       console.log("Token de acesso:", result.access_token);
//       setIsLogged(true);
//     } else {
//       console.log("Autenticação falhou ou foi cancelada.");
//     }
//   } catch (error) {
//     console.log("Erro ao fazer login:", error);
//   }
// }
