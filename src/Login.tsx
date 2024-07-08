import { Feather } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { createConfig, signIn } from "@okta/okta-react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CLIENT_ID,
  SIGN_IN_REDIRECT_URI,
  SIGN_OUT_REDIRECT_URI,
} from "./utils/constants";

const oktaDomain = "dev-07893600.okta.com";

export const Login: React.FC = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const configureOkta = async () => {
      try {
        await createConfig({
          clientId: CLIENT_ID,
          redirectUri: SIGN_IN_REDIRECT_URI,
          endSessionRedirectUri: SIGN_OUT_REDIRECT_URI,
          discoveryUri: `https://${oktaDomain}`,
          issuer: `https://${oktaDomain}/oauth2/default`,
          scopes: ["openid", "profile", "offline_access"],
          requireHardwareBackedKeyStore: false,
          browserMatchAll: true,
          httpConnectionTimeout: 15,
          httpReadTimeout: 10,
        });
        setIsConfigured(true);
        console.log("config ok");
      } catch (error) {
        console.log("Erro na configuração do Okta:", error);
      }
    };
    configureOkta();
  }, []);

  async function handleLogin() {
    try {
      const tokenResponse = await signIn({
        username: username,
        password: password,
      });
      console.log(tokenResponse.access_token);
      setToken(tokenResponse.access_token);
      setIsLogged(true);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }

  async function handleLogout() {
    try {
      // const token = await signOut();
      setUsername("");
      setPassword("");
      setIsLogged(false);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }

  return (
    <View className="flex-1">
      {isLogged ? (
        <ImageBackground
          blurRadius={2}
          resizeMode="cover"
          className="w-full h-full blur-[10px]"
          source={require("../src/assets/building.jpg")}
        >
          <View className="justify-center flex-1 p-4">
            <View className="bg-[#f8fafc] rounded-lg p-4">
              <View className="items-center">
                <View className="rounded-full bg-[#d1d5db] aspect-square w-20  items-center justify-center">
                  <FontAwesome5 name="user-alt" size={50} color="#a1a1aa" />
                </View>
                <Text className="text-[#404040] font-semibold text-base font-source-600 mt-4">
                  {username}
                </Text>
                <Text className="text-[#404040] font-semibold text-base font-source-600 mt-4">
                  Seu token de acesso:
                </Text>
                <Text
                  className="text-[#404040] font-semibold text-sm font-source-600 mt-1.5"
                  numberOfLines={2}
                >
                  {token}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleLogout}
                className="mt-5 bg-[#E30613] rounded-md p-2"
              >
                <Text className="text-[#f8fafc] font-semibold text-lg font-source-600 text-center">
                  Sair
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <ImageBackground
          blurRadius={2}
          resizeMode="cover"
          className="w-full h-full blur-[10px]"
          source={require("../src/assets/building.jpg")}
        >
          <View className="justify-center flex-1 p-4">
            <View className="bg-[#f8fafc] rounded-lg p-4">
              <View className="items-center">{/* ALGUMA LOGO */}</View>
              <Text className="text-[#404040] font-semibold text-base font-source-400">
                Faça login com suas credenciais do OKTA.
              </Text>
              <Text className="text-[#404040] font-semibold text-base font-source-600 mt-4">
                Email
              </Text>
              <TextInput
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
                placeholder="example@email.com"
                placeholderTextColor="#a3a3a3"
                className="bg-[#e5e7eb] rounded-md py-1.5 px-2.5 mt-1.5"
              />
              <Text className="text-[#404040] font-semibold text-base font-source-600 mt-2">
                Senha
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  placeholder="*********"
                  onChangeText={setPassword}
                  placeholderTextColor="#a3a3a3"
                  secureTextEntry={!showPassword}
                  className="bg-[#e5e7eb] rounded-md px-2.5 py-1.5 mt-1.5"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5"
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    className="object-contain"
                    color="#E30613"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleLogin}
                className="mt-5 bg-[#E30613] rounded-md p-2"
              >
                <Text className="text-[#f8fafc] font-semibold text-lg font-source-600 text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
      <StatusBar style="auto" />
    </View>
  );
};
