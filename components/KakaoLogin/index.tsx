import Image from "next/image";
import Link from "next/link";

const KakaoLogin = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      <header className="sticky top-0 px-4 border-b border-[#efefef] py-3">
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            alt="텍스트버킷"
            width={103}
            height={24}
          />
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center gap-y-9 w-full max-w-[296px] mx-auto">
        <div className="mt-[148px] w-full h-full items-center justify-center flex flex-col">
          <p className="mb-4 text-[#666] font-semibold text-center">
            꾸준히가 가능한 필사, 텍스트버킷
          </p>
          <p className="text-lg font-semibold text-center">
            필사에 관심 있는 누구나
            <br />
            필사로 이루고 기록하고 배워요.
          </p>
        </div>
        <Link href={KAKAO_AUTH_URL} className="w-full">
          <div className="rounded-xl py-4 px-6 flex items-center bg-[#F5E14B]">
            <Image
              src="/icons/kakao_icon.png"
              width={20}
              height={20}
              alt="kakao"
            />
            <p className="text-center text-[#131313] font-semibold w-full">
              카카오로 3초만에 시작하기
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default KakaoLogin;
