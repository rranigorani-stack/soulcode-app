/**
 * 약관·개인정보처리방침에 들어가는 운영자 정보.
 * 사업자등록 후 빈 칸(대표자, 사업자등록번호, 주소, 통신판매업 신고번호)을 채우면 모든 문서에 자동 반영돼요.
 * 빈 값은 화면에 표시되지 않아요.
 */
export const OPERATOR = {
  service: '소울코드 (SOULCODE)',
  name: 'chillguy',
  representative: '',
  bizNo: '',
  mailOrderNo: '',
  address: '',
  email: 'rranigorani@gmail.com',
  privacyOfficer: '운영자',
};

/** 시행일: 문서를 바꾸면 이 날짜도 갱신하세요 */
export const EFFECTIVE_DATE = '2026년 11월 18일';
