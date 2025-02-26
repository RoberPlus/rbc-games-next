import { authFetcher } from "@/services/fetcher";
import { ENV } from "@/utils/constants";
import { Address } from "@/utils/types";
import { getCookie } from "cookies-next";
import useSWR from "swr";

const CartAddresses = ({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: any;
  setSelectedAddress: any;
}) => {
  const userCookie = getCookie("user") as string;
  const user = userCookie ? JSON.parse(userCookie) : null;

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}${
    user?.id ? `?filters[user][id][$eq]=${user.id}` : ""
  }`;
  const { data, error, isLoading } = useSWR(url, authFetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const addresses = data.data as Address[];

  return (
    <div>
      <>
        {Object.keys(addresses).length === 0 ? (
          <p className="my-10">No addresses available.</p>
        ) : (
          Object.entries(addresses).map(([, addressProps]) => (
            <div
              className={`mb-2 flex cursor-pointer items-center space-x-4 rounded-md border p-4 hover:border-primary ${
                selectedAddress?.id === addressProps.id
                  ? "border-primary"
                  : undefined
              }`}
              key={addressProps.title}
              onClick={() => setSelectedAddress(addressProps)}
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {addressProps.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {addressProps.name}, {addressProps.address},{" "}
                  {addressProps.city}, {addressProps.state},{" "}
                  {addressProps.postal_code}
                </p>
              </div>
            </div>
          ))
        )}
      </>
    </div>
  );
};

export default CartAddresses;
