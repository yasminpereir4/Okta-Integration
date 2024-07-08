import {
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
} from "@expo-google-fonts/nunito-sans";
import {
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
} from "@expo-google-fonts/source-sans-pro";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Login } from "./src/Login";

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ["com.anonymous.apptest://"],
  config: {
    screens: {
      Login: {
        path: "/login",
      },
    },
  },
};

export default function App() {
  const [hasLoadedFonts] = useFonts({
    NunitoSans_300Light,
    NunitoSans_400Regular,
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    NunitoSans_600SemiBold,
  });

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <NavigationContainer linking={linking}>
      <Login />
    </NavigationContainer>
  );
}
