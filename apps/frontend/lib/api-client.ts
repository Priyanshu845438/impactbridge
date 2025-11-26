import ky from "ky";

let token: string | null = null;

export function setApiClientToken(nextToken: string | null) {
  token = nextToken;
}

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  hooks: {
    beforeRequest: [
      (request) => {
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
