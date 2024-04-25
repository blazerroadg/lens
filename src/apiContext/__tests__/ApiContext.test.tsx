import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useApi, ApiProvider } from "../ApiContext";

describe("useApi", () => {
  it("throws an error when used outside of ApiProvider", () => {
    const { result } = renderHook(() => useApi());
    expect(result.error).toEqual(
      new Error("useApi must be used within a ApiProvider")
    );
  });
});

describe("ApiProvider", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  // it("fetches repositories successfully", async () => {
  //   const orgName = "example";
  //   const token = "testToken";
  //   const repos = [{ id: 1, name: "repo1", forks_count: 10 }];
  //   const sortedRepos = [{ id: 1, name: "repo1", forks_count: 10 }];

  //   mockAxios
  //     .onGet(`https://api.github.com/orgs/${orgName}/repos`, {
  //       headers: {
  //         Authorization: `token ${token}`,
  //         Accept: "application/vnd.github.v3+json",
  //       },
  //     })
  //     .reply(200, repos);

  //   const { result, waitForNextUpdate } = renderHook(() => useApi(), {
  //     wrapper: ({ children }: any) => <ApiProvider>{children}</ApiProvider>,
  //   });

  //   expect(result.current.loading).toBe(false);
  //   expect(result.current.error).toBeNull();

  //   act(() => {
  //     result.current.getReposSortedByForks(orgName, token);
  //   });

  //   expect(result.current.loading).toBe(true);

  //   await waitForNextUpdate();

  //   expect(result.current.loading).toBe(false);
  //   expect(result.current.error).toBeNull();
  //   expect(result.current.repos).toEqual(sortedRepos);
  // });

  it("handles error when fetching repositories", async () => {
    const orgName = "example";
    const token = "testToken";

    mockAxios
      .onGet(`https://api.github.com/orgs/${orgName}/repos`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
      .reply(404);

    const { result, waitForNextUpdate } = renderHook(() => useApi(), {
      wrapper: ({ children }: any) => <ApiProvider>{children}</ApiProvider>,
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    act(() => {
      result.current.getReposSortedByForks(orgName);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual("Failed to fetch repositories: 404");
    expect(result.current.repos).toEqual([]);
  });

  it("fetches commits for a repository successfully", async () => {
    const orgName = "example";
    const repoName = "repo1";
    const token = "testToken";
    const commits = [
      {
        commit: {
          author: { name: "Author1" },
          message: "Commit message 1",
        },
        html_url: "https://github.com/example/repo1/commit/commit1",
      },
    ];

    mockAxios
      .onGet(`https://api.github.com/repos/${orgName}/${repoName}/commits`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
      .reply(200, commits);

    const { result, waitForNextUpdate } = renderHook(() => useApi(), {
      wrapper: ({ children }: any) => <ApiProvider>{children}</ApiProvider>,
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    act(() => {
      result.current.fetchCommitsForRepo(orgName, repoName);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.repos).toEqual([]);
  });

  it("handles error when fetching commits for a repository", async () => {
    const orgName = "example";
    const repoName = "repo1";
    const token = "testToken";

    mockAxios
      .onGet(`https://api.github.com/repos/${orgName}/${repoName}/commits`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
      .reply(404);

    const { result, waitForNextUpdate } = renderHook(() => useApi(), {
      wrapper: ({ children }: any) => <ApiProvider>{children}</ApiProvider>,
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    act(() => {
      result.current.fetchCommitsForRepo(orgName, repoName);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(
      "Failed to fetch commits for repository repo1: 404"
    );
    expect(result.current.repos).toEqual([]);
  });
});
