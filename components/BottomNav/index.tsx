import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/contexts/AuthContext";

const BottomNav = () => {
  const router = useRouter();
  const { isSigned, profile } = useAuth();
  const [active, setActive] = useState({
    home: false,
    challenge: false,
    write: false,
    archive: false,
    my: false,
  });
  const homeSrc = active.home
    ? "/icons/home_active.png"
    : "/icons/home_inactive.png";
  const challengeSrc = active.challenge
    ? "/icons/challenge_active.png"
    : "/icons/challenge_inactive.png";
  const writeSrc = active.write
    ? "/icons/write_active.png"
    : "/icons/write_inactive.png";
  const archiveSrc = active.archive
    ? "/icons/archive_active.png"
    : "/icons/archive_inactive.png";

  const handleNavbar = (type: string) => {
    const newActive = {
      home: false,
      challenge: false,
      write: false,
      archive: false,
      my: false,
    };

    switch (type) {
      case "home":
        newActive.home = true;
        router.push("/");
        break;
      case "challenge":
        newActive.challenge = true;
        router.push("/challenge");
        break;
      case "write":
        newActive.write = true;
        router.push("/create");
        break;
      case "archive":
        newActive.archive = true;
        isSigned ? router.push("/my") : router.push("/login");
        break;
      case "my":
        newActive.my = true;
        isSigned ? router.push("/my") : router.push("/login");
        break;
      default:
        break;
    }
    setActive(newActive);
  };

  return (
    <div className="mt-3 z-10 w-full bg-white border-t border-[EFEFEF] py-3 px-5 flex items-center justify-between">
      <Image
        src={homeSrc}
        width={25}
        height={25}
        onClick={() => handleNavbar("home")}
        alt="home_inactive"
        className="cursor-pointer"
      />

      <Image
        src={challengeSrc}
        width={25}
        height={25}
        onClick={() => handleNavbar("challenge")}
        alt="challenge_inactive"
        className="cursor-pointer"
      />
      <Image
        src={writeSrc}
        width={25}
        height={25}
        onClick={() => handleNavbar("write")}
        alt="write_inactive"
        className="cursor-pointer"
      />
      <Image
        src={archiveSrc}
        width={25}
        height={25}
        onClick={() => handleNavbar("archive")}
        alt="archive_inactive"
        className="cursor-pointer"
      />

      {isSigned ? (
        <div className="w-7 h-7 bg-gray-500 overflow-hidden rounded-full cursor-pointer">
          <img
            src={profile?.imageUrl}
            width={30}
            height={30}
            onClick={() => handleNavbar("my")}
            alt="my_nopic"
            className="cursor-pointer"
          />
        </div>
      ) : (
        <Image
          src="/icons/my_nopic.png"
          width={25}
          height={25}
          onClick={() => handleNavbar("my")}
          alt="my_nopic"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default BottomNav;
