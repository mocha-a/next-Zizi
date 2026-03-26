// 회원가입용 types

export interface JoinField {
    label?: string;
    type: 'name' | 'id' | 'email' | 'password' | 'password-check' | 'date' | 'gender';
    placeholder?: string;
    required: boolean;
}