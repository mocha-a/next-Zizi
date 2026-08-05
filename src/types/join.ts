// 회원가입용 types

export interface JoinField {
    label?: string;
    type: 'name' | 'username' | 'email' | 'password' | 'password-check' | 'securityQuestion' | 'securityAnswer' | 'nickname' | 'date' | 'gender';
    placeholder?: string;
    required: boolean;
}