import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "../ApolloClient";

export function renderWithProviders(ui: React.ReactNode) {
  return render(
    <ChakraProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>{ui}</BrowserRouter>
      </ApolloProvider>
    </ChakraProvider>
  );
}
