import Header from "../Header";

const WithHeaderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full max-w-[390px] h-full min-h-screen mx-auto relative bg-white shadow-xl">
      <Header />
      <div className="w-full h-full">{children}</div>
    </main>
  );
};
export default WithHeaderLayout;
