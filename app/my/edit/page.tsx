import WithHeaderLayout from "@/components/WithHeaderLayout";

const ProfileEditPage = () => {
  return (
    <WithHeaderLayout>
      <form className="mt-4 px-4">
        <h3 className="text-lg font-bold">프로필 편집</h3>
        <p className="mt-5 mb-2 font-medium text-[#131313] text-sm">
          소개 한 마디
        </p>
        <textarea
          name="introduce"
          id="introduce"
          value="하루의 끝에 그날의 내 기분에
          맞춘 시 한 편을 써요"
          className="border-[#e3e3e3] p-3 rounded-lg border w-full resize-none text-xs text-[#353535] h-[100px]"
        />
        <button
          type="submit"
          className="mt-5 w-full py-4 rounded-lg text-white text-center bg-[#6D6D6D] text-sm font-bold"
        >
          적용하기
        </button>
      </form>
    </WithHeaderLayout>
  );
};
export default ProfileEditPage;
