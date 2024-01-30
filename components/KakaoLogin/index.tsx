import styles from "./kakaoLogin.module.css";
import Link from "next/link";

const KakaoLogin = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.smallText}>꾸준히 가능한 필사, ㅇㅇㅇ</p>
        <p className={styles.mediumText}>
          필사에 관심 있는 누구나
          <br />
          필사로 이루고 기록하고 배워요.
        </p>
      </div>
      <br />
      <Link href={KAKAO_AUTH_URL} className={styles.link}>
        <div className={styles.buttonContainer}>
          <p className={styles.buttonText}> 🗨 카카오로 3초만에 시작하기</p>
        </div>
      </Link>
    </div>
  );
};

export default KakaoLogin;
