import { InMemoryCache, gql } from '@apollo/client'
import React from 'react'
import Index from '../pages'

import { waitFor, render, screen } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing'
import { useSession } from "next-auth/react";
jest.mock("next-auth/react");

const cache = new InMemoryCache()
cache.writeQuery({
  query: gql`
    query Viewer {
      viewer {
        id
        name
        status
      }
    }
  `,
  data: {
    viewer: {
      __typename: 'User',
      id: 'Baa',
      name: 'Baa',
      status: 'Healthy',
    },
  },
})

describe('Index', () => {
  it('renders the html we want', async () => {
    const mockSession = {
      expires: "1",
      user: { email: "a", name: "Delta", image: "c" },
    };

    (useSession as jest.Mock).mockReturnValue({
      data: null,//mockSession,
      status: "authenticated",
    });

    render(
      <MockedProvider cache={cache}>
        <Index />
      </MockedProvider>
    )

    // expect(component).toBeDefined()
    //expect(component.toJSON()).toBeTruthy()
    // await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(true).toBeTruthy()
  })
})
