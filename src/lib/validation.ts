// 유효성 검사 !
export const validate = (
  type: string,
  value: string,
  originalPassword?: string
) => {
  let error = '';

  switch (type) {
    case 'username':
      const idReg = /^[a-zA-Z0-9]{4,16}$/;
      if (!idReg.test(value)) {
        error = '✨ 영문 · 숫자를 조합해 4~16자로 입력해줘';
      }
      break;

    case 'password':
      const pwReg =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=()-])(?=.*[0-9]).{8,}$/;
      if (!pwReg.test(value)) {
        error = '🔒 영문 · 숫자 · 특수문자를 포함해 8자 이상 입력해줘';
      }
      break;

    case 'password-check':
      if (value !== originalPassword) {
        error = '🔑 비밀번호를 한 번 더 확인해줘';
      }
      break;

    case 'email':
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(value)) {
        error = '📧 이메일 형식으로 입력해줘';
      }
      break;

    case 'security-answer':
      if (!value.trim()) {
        error = '💬 답변을 입력해줘';
      }
      break;
  }

  return error;
};