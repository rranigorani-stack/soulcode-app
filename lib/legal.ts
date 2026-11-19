/**
 * 약관·개인정보처리방침에 들어가는 운영자 정보.
 * 사업자등록 후 빈 칸(대표자, 사업자등록번호, 주소, 통신판매업 신고번호)을 채우면 모든 문서에 자동 반영돼요.
 * 빈 값은 화면에 표시되지 않아요.
 */
export const OPERATOR = {
  service: '소울코드 (SOULCODE)',
  name: 'chillguy', // 사업자등록 후: 상호(예: 소울코드)로 바꾸기
  representative: '',
  bizNo: '',
  mailOrderNo: '', // 간이과세자 등 신고 면제면 비워 두기
  address: '',
  phone: '',
  email: 'rranigorani@gmail.com',
  hosting: 'Vercel Inc.',
  privacyOfficer: '운영자',
};

/**
 * 전자상거래법에 따라 사이트 하단에 보여주는 사업자 정보 (채워진 항목만).
 * 사업자등록번호가 들어가기 전에는 문의 이메일만 보여요.
 */
export function bizLines(): [string, string][] {
  const o = OPERATOR;
  if (!o.bizNo) return [['문의', o.email]];
  return ([
    ['상호', o.name],
    ['대표자', o.representative],
    ['사업자등록번호', o.bizNo],
    ['통신판매업 신고번호', o.mailOrderNo],
    ['주소', o.address],
    ['전화', o.phone],
    ['이메일', o.email],
    ['호스팅 제공', o.hosting],
  ] as [string, string][]).filter(([, v]) => v);
}

/** 시행일: 문서를 바꾸면 이 날짜도 갱신하세요 */
export const EFFECTIVE_DATE = '2026년 11월 18일';
