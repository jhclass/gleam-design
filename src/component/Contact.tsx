"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
  companyName: string;
  name: string;
  phoneNum: string;
  cost: string;
  agree: string;
  file: File[] | null;
  detail: string;
}
const costList = [
  "10만원 이상 ~ 50만원 미만",
  "50만원 이상 ~ 100만원 미만",
  "100만원 이상",
];
export default function Contact() {
  const [agreeSelect, setAgreeSelect] = useState("agree");
  const [costSelect, setCostSelect] = useState<string>(costList[2]);
  const [files, setFiles] = useState<File[] | null>([]);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();
  const [textareaLength, setTextAreaLength] = useState<number>(0);
  const textareaLengthCheck = (textAreaClassName: string) => {
    const textarea = document.querySelector(
      textAreaClassName
    ) as HTMLTextAreaElement;
    const MAX_LENGTH = 300;
    textarea.addEventListener("input", function (e: Event) {
      const target = e.target as HTMLTextAreaElement;
      if (target.value.length <= MAX_LENGTH) {
        clearErrors("detail");
        setTextAreaLength(target?.value?.length);
      } else {
        setError("detail", {
          type: "manual",
          message: `최대 ${MAX_LENGTH}자 까지만 입력 가능합니다.`,
        });
        target.value = target.value.slice(0, MAX_LENGTH);
      }
    });
  };
  useEffect(() => {
    textareaLengthCheck(".textarea");
  }, [textareaLength]);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const onChangedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > MAX_FILE_SIZE
    );
    if (selectedFiles.length > 5) {
      setError("file", {
        type: "manual",
        message: "파일은 최대 5개까지만 등록가능 합니다.",
      });
      return;
    } else if (oversizedFiles.length > 0) {
      setError("file", {
        type: "manual",
        message: oversizedFiles
          .map((file) => `${file.name}의 용량이 너무 큽니다.`)
          .join("\n"),
      });
    }
    clearErrors();
    setFiles(selectedFiles);
  };

  const onSubmit = async (data: FormData) => {
    console.log("폼데이터", data);
    console.log("파일데이터", files);
    const { companyName, name, phoneNum, detail, cost, agree } = data;
    const formData = new FormData();
    if (files) {
      files.forEach((file) => formData.append("file", file));
      formData.append("folderName", "폴더명");
    }
    // formData.forEach((value, key) => console.log(key, value));
    // const responseData = await axios.post(
    //   "http://localhost:4000/upload",
    //   formData
    // );
    alert("파일 업로드 성공!");
  };

  return (
    <div id="form-area" className="w-full md:w-3/5 px-3 mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-4">
          <label className="text-xl">회사명</label>
          <input
            type="text"
            className="h-10 rounded-lg pl-4 mt-2"
            {...register("companyName", {
              required: "회사명을 입력하세요.",
            })}
            placeholder="사업자등록증의 회사명을 입력하세요."
          />
          {errors.companyName && (
            <p className="text-red-500">{errors.companyName.message}</p>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xl">담당자명</label>
          <input
            type="text"
            className="h-10 rounded-lg pl-4 mt-2"
            placeholder="담당자분의 성함을 입력하세요."
            {...register("name", {
              required: "담당자명을 입력하세요",
            })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xl">전화번호</label>
          <input
            type="text"
            className="h-10 rounded-lg pl-4 mt-2"
            placeholder="담당자분의 전화번호를 입력하세요.( - 없이 숫자만 )"
            {...register("phoneNum", {
              required: "전화번호를 입력하세요.",
            })}
          />
          {errors.phoneNum && (
            <p className="text-red-500">{errors.phoneNum.message}</p>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xl">예산</label>
          <div className="flex flex-col md:flex-row items-left mt-2">
            <div className="flex items-center">
              <input
                id="cost10"
                type="radio"
                value={costList[0]}
                checked={costSelect === costList[0]}
                className="w-5 h-5 rounded-lg pl-4 ml-4 cursor-pointer"
                {...register("cost")}
                onChange={(e) => {
                  setCostSelect(e.target.value);
                }}
              />
              <label htmlFor="cost10">&nbsp;{costList[0]}</label>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <input
                id="cost50"
                type="radio"
                value={"costList[1]"}
                checked={costSelect === "costList[1]"}
                {...register("cost")}
                onChange={(e) => {
                  setCostSelect(e.target.value);
                }}
                className="w-5 h-5 rounded-lg pl-4 ml-4 cursor-pointer"
              />
              <label htmlFor="cost50">&nbsp;{costList[1]}</label>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <input
                id="cost"
                type="radio"
                value={costList[2]}
                checked={costSelect === costList[2]}
                className="w-5 h-5 rounded-lg pl-4 ml-4 cursor-pointer"
                {...register("cost")}
                onChange={(e) => {
                  setCostSelect(e.target.value);
                }}
              />
              <label htmlFor="cost">&nbsp;{costList[2]} </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xl">상세내용</label>
          <textarea
            className="textarea h-40 rounded-lg p-4 mt-2"
            placeholder="상세내용을 입력하여주세요."
            {...register("detail", { required: "상세내용을 입력하여주세요." })}
          ></textarea>
          <div className="flex text-gray-500 px-1">
            {textareaLength < 300 ? (
              <span className="font-semibold text-gray-800">
                {textareaLength}
              </span>
            ) : (
              <span className="text-red-500 font-semibold">300</span>
            )}
            /300자
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xl" htmlFor="fileInput">
            첨부파일
          </label>
          <input
            id="fileInput"
            type="file"
            className="h-10 mt-2 cursor-pointer"
            multiple
            {...register("file")}
            onChange={onChangedFiles}
          />
          {errors.file && (
            <p className="text-red-500 whitespace-pre-line">
              {errors.file.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xl">
            개인정보활용에 동의하여 주시기 바랍니다.
          </label>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              value={"agree"}
              {...register("agree")}
              checked={agreeSelect === "agree"}
              onChange={(event) => {
                setAgreeSelect(event.target.value);
              }}
              className="w-5 h-5 rounded-lg pl-4 ml-4"
            />
            <span>&nbsp;예</span>
            <input
              type="radio"
              value={"disagree"}
              checked={agreeSelect === "disagree"}
              {...register("agree")}
              onChange={(event) => {
                setAgreeSelect(event.target.value);
              }}
              className="w-5 h-5 rounded-lg pl-4 ml-4"
            />
            <span>&nbsp;아니요</span>
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <button
            type="submit"
            className="w-2/5 md:w-1/5 bg-primary p-4 text-white rounded-xl"
          >
            전송
          </button>
          <button
            type="reset"
            className="w-2/5 md:w-1/5 bg-accentRed p-4 ml-4 text-white rounded-xl"
            onClick={() => setTextAreaLength(0)}
          >
            초기화
          </button>
        </div>
      </form>
    </div>
  );
}
