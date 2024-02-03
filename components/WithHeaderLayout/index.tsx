import Header from "../Header";
import styles from "./withHeaderLayout.module.css";

const WithHeaderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full max-w-[390px] h-full min-h-screen mx-auto relative">
      <Header />
      <div className="w-full px-4 h-full">{children}</div>
    </main>
  );
};
export default WithHeaderLayout;
