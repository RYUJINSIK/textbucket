import Header from "../Header";
import BottomNav from "../BottomNav";

const WithHeaderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full max-w-[390px] h-full min-h-screen mx-auto relative bg-white shadow-xl">
      {/* <Header /> */}
      <div className="w-full h-full">{children}</div>
      <BottomNav />
    </main>
  );
};
export default WithHeaderLayout;
