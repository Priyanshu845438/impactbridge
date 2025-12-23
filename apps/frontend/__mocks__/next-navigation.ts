export const useRouter = () => ({ push: jest.fn(), prefetch: jest.fn() });
export const useParams = () => ({ id: "csr-programme-001" });
export const notFound = () => {
  throw new Error("notFound called");
};
