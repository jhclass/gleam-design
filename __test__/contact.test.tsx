import { render, screen, waitFor } from "@testing-library/react";
import Contact from "@/component/Contact";
import userEvent from "@testing-library/user-event";

test("파일업로드 후 alert", async () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation((msg) => {
    console.log("출력완료", msg);
  });
  render(<Contact />);

  const fileInput = screen.getByLabelText("첨부파일");
  const file = new File(["dummy content"], "test-file.txt", {
    type: "text/plain",
  });
  // ✅ 필수 입력 필드를 모두 채움

  await userEvent.type(
    screen.getByPlaceholderText("사업자등록증의 회사명을 입력하세요."),
    "테스트 회사"
  );
  await userEvent.type(
    screen.getByPlaceholderText("담당자분의 성함을 입력하세요."),
    "홍길동"
  );
  await userEvent.type(
    screen.getByPlaceholderText(
      "담당자분의 전화번호를 입력하세요.( - 없이 숫자만 )"
    ),
    "01012345678"
  );
  await userEvent.type(
    screen.getByPlaceholderText("상세내용을 입력하여주세요."),
    "테스트 상세 내용"
  );

  await userEvent.upload(fileInput, file);
  await userEvent.click(screen.getByText("전송"));

  await waitFor(
    () => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith("파일 업로드 성공!");
    },
    { timeout: 3 }
  );
});
