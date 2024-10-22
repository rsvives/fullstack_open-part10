import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import { StatusBar } from "react-native";

import { createApolloClient } from "./src/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";

const apolloClient = createApolloClient()

export default function App() {

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}

