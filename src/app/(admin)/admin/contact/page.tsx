export default function AdminContactPage() {
  return (
    <>
      <div className="dbWrap w-full p-4 flex justify-center items-center flex-col">
        <h2 className="py-8 text-[1.5rem]">고객DB</h2>
        <div className="dbGroup w-full md:w-[80%] lg:w-[60%]">
          <div className="dbItem bg-[#F0F8FF] p-4 rounded-md mb-4 mt-4 max-h-[500px] overflow-y-auto">
            <h3 className="w-full flex justify-between items-center">
              <span className="font-bold underline">No.1</span>
              <div className="checkStatus">
                <button>
                  상태: <span className="text-primary">확인 중</span>{" "}
                  <i className="xi-angle-down"></i>
                </button>
              </div>
            </h3>
            <div className="mt-2">
              <span className="font-semibold">회사명: </span>
              <span>제목을 입력합니다.</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">담당자명: </span>
              <span>작성자이름</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">전화번호: </span>
              <span>01012341234</span>
              <button className="p-1 underline text-primary">
                <i className="xi-mobile"></i>전화하기
              </button>
            </div>
            <div className="flex flex-col mt-2">
              <span className="font-semibold">상세내용: </span>
              <span className="mt-1">
                상세내용을 입력하여주세요.상세내용을 입력하여주세요.상세내용을
                입력하여주세요.상세내용을 입력하여주세요.상세내용을
                입력하여주세요.상세내용을 입력하여주세요.상세내용을
                입력하여주세요.상세내용을 입력하여주세요.상세내용을
                입력하여주세요.상세내용을 입력하여주세요.상세내용을
                입력하여주세요.상세내용을 입력하여주세요.상세내용을
                입력하여주세요.상세내용을 입력하여주세요.
              </span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">예산: </span>
              <span>50만원 이상 ~ 100만원 미만</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">파일명: </span>
              <span>
                <a
                  href="#"
                  download={"파일명"}
                  className="underline text-[#0d37aa]"
                >
                  파일명
                </a>
              </span>
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-primary text-[#fff] rounded-md">
                확인 중
              </button>{" "}
              <button className="px-4 py-2 bg-accentRed text-[#fff] rounded-md">
                확인 완료
              </button>{" "}
              <button className="px-4 py-2 bg-gray-700 text-[#fff] rounded-md">
                미확인
              </button>
            </div>
          </div>
        </div>
        <div className="pager flex justify-center items-center gap-8 py-8 ">
          <button className="flex justify-center items-center gap-1">
            <i className="xi-angle-left"></i>
            <span>PREV</span>
          </button>
          <div className="flex justify-center items-center gap-8">
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <button className="flex justify-center items-center gap-1">
            <span>NEXT</span>
            <i className="xi-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
