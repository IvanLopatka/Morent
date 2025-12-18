import {
  NavigationBar,
  PayMethod,
  AboutUs,
  RentalSummary,
  BillingInfo,
  RentalInfo,
  ConfirmationForm,
} from "@/components";

export default async function Home({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-start justify-center font-[family-name:var(--font-geist-sans)">
      <NavigationBar />
      <div className="flex lg:flex-row flex-col-reverse justify-between lg:p-8 p-4 w-full">
        <div className="flex flex-col gap-4">
          <BillingInfo />
          <RentalInfo />
          <PayMethod />
          <ConfirmationForm />
        </div>
        <RentalSummary id={id} name={""} image={""} price={""} />
      </div>
      <AboutUs />
    </div>
  );
}
