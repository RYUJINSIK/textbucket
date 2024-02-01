import styles from "./header.module.css";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-center sticky top-0 bg-white h-14 border-b border-[#efefef] z-50">
      <div className="w-full flex justify-between items-center px-4">
        <p>Logo</p>
        <div className="flex items-center gap-x-6">
          <button className="py-2 px-4 rounded-lg bg-[#6d6d6d] text-white font-semibold">
            <span>올리기</span>
          </button>
          <div className="w-8 h-8 bg-gray-500 overflow-hidden rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
