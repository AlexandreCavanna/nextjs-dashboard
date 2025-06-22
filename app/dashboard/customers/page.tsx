import {Metadata} from "next";
import CustomersTable from "@/app/ui/customers/table";
import { fetchFilteredCustomers} from "@/app/lib/data";
import { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Suspense>
        <Search placeholder="Search customers..." />
      </Suspense>
      <CustomersTable customers={customers}/>
    </div>
  );
}
