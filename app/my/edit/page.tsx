"use client";

import WithHeaderLayout from "@/components/WithHeaderLayout";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Modal from "@/components/Modal";

export interface IProfileFormProps {
  imageUrl: string;
  nickName: string;
  description: string;
}

const ProfileEditPage = () => {
  const router = useRouter();
  const { profile, setProfile, setIsSigned } = useAuth();
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    formState: { isValid, isDirty },
  } = useForm<IProfileFormProps>({
    mode: "onChange",
  });

  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 닉네임 정규식
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
  const [previewURL, setPreviewURL] = useState<any>(null);
  const [formData, setFormData] = useState({
    imageUrl: profile?.imageUrl as string,
    nickName: profile?.nickName as string,
    description: profile?.description as string,
    file: null as any,
  });

  const { imageUrl, nickName, description, file } = formData;

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nickName: e.target.value });
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleImageChange = (event: { target: { files?: any } }) => {
    setFormData({ ...formData, file: event.target.files[0] });
    setPreviewURL(URL.createObjectURL(event.target.files[0]));
    closeModal();
  };

  const getImageUrl = async () => {
    const imageData = new FormData();
    imageData.append("files", formData.file);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/image`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        }
      );
      onSubmit(response.data[0].imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogout = () => {
    setIsOpen(true);
  };

  const defaultImage = () => {
    setPreviewURL("");
    closeModal();
  };

  const Logout = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("profile");
      localStorage.removeItem("accessToken");
    }
    setIsSigned(false);
    router.push("/");
  };
  const onSubmit = async (imageUrl: string) => {
    const requestBody = {
      imageUrl: imageUrl,
      nickName: nickName,
      description: description,
    };
    if (regex.test(nickName)) {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/member`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status === 200 && profile) {
        setProfile({
          ...profile,
          imageUrl: imageUrl,
          nickName: nickName,
          description: description,
        });
        localStorage.setItem(
          "profile",
          JSON.stringify({
            ...profile,
            imageUrl: imageUrl,
            nickName: nickName,
            description: description,
          })
        );
        router.push("/my");
      }
    } else {
      setIsError(true);
    }
  };
  return (
    <WithHeaderLayout>
      <div
        className="flex flex-col h-full justify-between px-4"
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        <div className="mt-4 px-4">
          <h3 className="text-lg font-bold">프로필 편집</h3>
          <br />
          <div className="grid place-items-center">
            <div className="flex-grow-0 flex-shrink-0 w-[88px] h-[88px] relative rounded-full bg-[#ededed]">
              <img
                className="w-full h-full rounded-full overflow-hidden"
                src={
                  previewURL === ""
                    ? "/icons/profile_default.png"
                    : previewURL
                    ? previewURL
                    : profile?.imageUrl === ""
                    ? "/icons/profile_default.png"
                    : profile?.imageUrl
                }
                alt="profile"
              />
              <Image
                src="/icons/camera.png"
                width={24}
                height={24}
                alt="이미지삭제"
                onClick={() => {
                  openModal();
                }}
                className="w-6 h-6 absolute left-16 top-16"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="mt-5 mb-2 font-medium text-[#131313] text-sm">
              닉네임
            </p>
            <p className="mt-5 mb-2 font-medium text-[#777777] text-sm">
              {nickName.length} / 10
            </p>
          </div>
          <input
            type="text"
            name="nickName"
            value={nickName}
            onChange={handleNickNameChange}
            maxLength={10}
            className={`${
              isError ? "border-[#eb3434]" : "border-[#e3e3e3]"
            } p-3 rounded-lg border w-full resize-none text-center text-base text-[#353535] h-[50px]`}
          />

          <p className="mt-1 mb-2 font-medium text-[#eb3434] text-xs h-1">
            {isError
              ? "닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요."
              : ""}
          </p>
          <p className="mt-5 mb-2 font-medium text-[#131313] text-sm">
            소개 한 마디
          </p>
          <textarea
            id="description"
            maxLength={100}
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="소개 한 마디를 써 보세요:)"
            className="border-[#e3e3e3] p-3 rounded-lg border w-full resize-none text-xs text-[#353535] h-[100px]"
          />
        </div>
        <div className="flex items-end justify-end">
          <button
            type="submit"
            onClick={() => {
              file !== null ? getImageUrl() : onSubmit("");
            }}
            className="mt-5 mb-5 w-full py-4 rounded-lg text-white text-center bg-[#00C37D] text-sm font-bold"
          >
            적용하기
          </button>
          {/* <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={onClickLogout}
          >
            <Image
              src="/icons/logout_icon.svg"
              width={16}
              height={16}
              alt="logout"
            />
            <span className="text-[#999] font-bold">로그아웃</span>
          </div> */}
        </div>

        {isModalOpen && (
          <>
            <div
              className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[60]"
              onClick={closeModal}
            />
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white z-[70] w-full max-w-[390px] rounded-t-xl">
              <label htmlFor="imageUpload">
                <div className="flex flex-col items-center justify-center py-4 cursor-pointer	">
                  <h3>이미지 변경</h3>
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden" // 파일 입력 요소를 숨깁니다.
                  name="filename"
                  accept="image/*"
                  onChange={handleImageChange} // 파일이 변경되었을 때 호출될 핸들러 함수
                />
              </label>

              <hr />
              <div
                className="flex flex-col items-center justify-center py-4 cursor-pointer"
                onClick={defaultImage}
              >
                <h3>기본 이미지로 변경</h3>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        confirmEvent={Logout}
        title="정말 로그아웃할까요?"
        content="가지 마세요..."
        confirmButton="로그아웃하기"
        closeButton="닫기"
      />
    </WithHeaderLayout>
  );
};
export default ProfileEditPage;
