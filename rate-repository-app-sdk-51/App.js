import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import { Pressable, StatusBar } from "react-native";

import { createApolloClient } from "./src/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";

import { authStorage } from "./src/utils/authStorage";
import { AuthStorageContext } from "./src/context/AuthStorageContext";

const apolloClient = createApolloClient(authStorage)


export default function App() {


  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}

