export default {
  // --------------- 좌측 사이드 바 메뉴 및 상단 경로 표시 이름
  route: {
    main: 'Main',
    'dashboard': 'Dashboard',
    org: '운영사',
    'orgManagement': '운영사 관리',
    mcht: '제휴사',
    'mchtManagement': '제휴사 관리',
    'mchtCreate': '제휴사 등록',
    'mchtEdit': '제휴사 수정',
    'mchtExcel': '제휴사 엑셀 등록',
    pointCard: '포인트 카드 관리',
    pointCardList: '카드 기본 정보',
    'pointCardCreate': '포인트 카드 등록',
    'pointCardEdit': '포인트 카드 수정',
    pointCardIsu: '카드 발급 내역',
    pointCardTrx: '포인트 이용 내역',
    'pointCardTrxDtl': '포인트 내역 상세',
    calculate: '정산',
    statistic: '이용 통계',
    system: '시스템 관리',
    'manager': '관리자',
    'mngCreate': '관리자 등록',
    'mngEdit': '관리자 수정',
    'myInfo': '내 정보'
  },
  // --------------- 버튼
  btn: {
    imgSelect: '이미지 선택',
    msgSelect: '메세지 선택',
    cardSelect: '카드 선택',
    search: '조회',
    add: '등록',
    edit: '수정',
    before: '이전',
    list: '목록',
    confirm: '확인',
    cancel: '취소',
    plus: '추가',
    apply: '적용',
    delete: '삭제',
    write: '작성',
    whole: '전체',
    refresh: '새로고침',
    addGroup: '그룹 추가',
    modGroup: '그룹 수정',
    delGroup: '그룹 삭제',
    groupChange: '그룹 변경',
    addImg: '이미지 추가',
    delImage: '선택 이미지 삭제',
    idStore: '아이디 저장',
    excelUpload: '엑셀 업로드',
    excelDownload: '엑셀 다운로드',
    // 따로 영어 샘플 파일이 없다면 그냥 샘플 파일로 변경
    excelSample: '한글 샘플 파일',
    saveTemp: '임시 저장',
    duplCheck: '중복 체크',
    checkOk: '사용 가능'
  },
  // --------------- Placeholder, 흐림 글씨
  placeholder: {
    titleSearch: '제목 검색',
    searchType: '검색어 조건',
    search: '검색어 입력',
    lvDivCd: '영문 Key',
    lvDivNm: '한글명',
    accuLmt: '최대 적립 가능 점수',
    initPit: '초기 포인트',
    minUsePsbltPit: '최소 사용가능한 포인트 점수',
    maxUsePsbltPit: '최대 사용가능한 포인트 점수',
    org: '운영사',
    orgCd: '운영사 코드',
    orgNm: '운영사 명',
    mchtNm: '제휴사 명',
    pitCard: '포인트 카드',
    pitCardNo: '포인트 카드 번호',
    pointCardNm: '포인트 카드 명',
    fncDiv: '기능 구분',
    select: '선택',
    minUsePit: '최소 포인트 입력',
    maxUsePit: '최대 포인트 입력',
    mngId: '아이디',
    mngNm: '이름',
    pwd: '비밀번호',
    prePwd: '기존 비밀번호',
    pwdCheck: '비밀번호 확인',
    calcMonth: '정산 기간',
    pitAccuVal: '금액 대비',
    eachAccuLmt1: '1회 최대 적립 포인트',
    eachAccuLmt2: '최대 적립 가능 횟수',
    mngIdRequiredEn: '4자 이상 영문자 또는 숫자',
    userInfo: '사용자 정보'
  },
  // --------------- 메뉴별 타이틀
  title: {
    notice: '공지사항',
    noticeInsert: '공지사항 등록',
    noticeEdit: '공지사항 수정',
    service: '서비스 현황',
    orgManagement: '운영사 관리',
    'orgCreate': '운영사 등록',
    'orgEdit': '운영사 수정',
    mcntManagement: '제휴사 관리',
    'mchtCreate': '제휴사 등록',
    'mchtEdit': '제휴사 수정',
    'mchtExcel': '제휴사 엑셀 등록',
    pointCardMng: '포인트 카드 관리',
    'pointCardCreate': '포인트 카드 등록',
    'pointCardEdit': '포인트 카드 수정',
    pointCardTrx: '포인트 내역 관리',
    'pointCardTrxDtl': '포인트 내역 상세',
    calculate: '정산',
    system: '시스템 관리',
    'manager': '관리자',
    'mngCreate': '관리자 등록',
    'mngEdit': '관리자 수정',
    'myInfo': '내 정보'
  },
  // --------------- 경고, 에러, 성공 메세지 문구 등
  message: {
    imageRestrictOne: '이미지는 1개만 업로드 할 수 있습니다.',
    passwordValidate: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    passwordCheck: '비밀번호를 확인해주세요.',
    idValidateCheck: '아이디를 입력해주세요.',
    mngIdRequiredEn: '4자 이상 영문자 또는 숫자만 가능합니다.',
    valid_required: '필수값 입니다.',
    addConfirm: '추가 하시겠습니까?',
    editConfirm: '수정 하시겠습니까?',
    applyConfirm: '적용 하시겠습니까?',
    deleteConfirm: '삭제 하시겠습니까?',
    success: '정상 처리되었습니다.',
    failure: '실패 하였습니다.',
    careful: '주의!',
    selectedImgRequired: '이미지를 선택해주세요!',
    selectedGroupRequired: '그룹을 선택해주세요!',
    deleteProcessError: '처리 중 에러가 발생했습니다.',
    successCopy: '복사 되었습니다.',
    dragExcelFile: '엑셀 파일을 끌어다 놓아주세요.',
    acceptableExcelFile: 'xlsx / xls / csv 파일만 지원합니다.',
    onlySupportOne: '하나의 파일만 올릴 수 있습니다.',
    modifyLevelWarning: '수정 후 적용하게 되면<br>제휴처 / 사용처 관리의 정보가 초기화 됩니다.',
    mchtDeleteGuide: '해당 적립처 데이터가 완전히 삭제됩니다.<br>삭제 하시겠습니까 ?',
    lvDivCdDuplicate: '중복된 키가 존재합니다.',
    lvDivValid: '영문 Key, 한글명은 필수값 입니다.',
    selectOrgCd: '운영사를 선택해주세요.',
    uploadExcel: '엑셀 파일을 등록 해주세요.',
    excelErroMsg1: '번째 데이터, "',
    excelErroMsg2: '"에 올바르지 않은 값을 입력하였습니다.',
    accuEqualGuide: '[적립 & 사용]으로 설정된 이용처만 자동 입력됩니다.',
    needCheckDupl: '아이디 중복 체크를 해주세요.',
    checkPassword: '비밀번호를 확인해주세요.',
    statSearchValid1: '카드를 선택해주세요.',
    statSearchValid2: '날짜를 선택해주세요.',
    saveTempCheck: '브라우저 사용 기록을 정리하시면 임시저장 데이터가 삭제됩니다.',
    lvValidMessage: '등급 구분과 적립 방법을 선택한 뒤 적용 버튼을 클릭해주세요.',
    // 포인트 카드 유효성 검사 메세지
    pointCardValid: {
      orgCd: '운영사를 선택해주세요.',
      pitCardNm: '포인트 카드 명을 입력 해주세요.',
      prdSetDt: '운영 기간을 선택 해주세요.',
      levelList: '등급을 완성, 적용 해주세요.',
      pitAccu: '적립 방법을 입력해주세요.',
      maxLmtPit: '포인트 적립 한도 - 최대 적립 가능 점수를 입력 해주세요.',
      initPit: '초기 포인트를 입력 해주세요.',
      accuLmtYn: '포인트 적립 제한을 입력 해주세요.',
      useLmtYn: '사용 제한을 입력 해주세요.',
      lvList: '제휴처 적립 방법을 생성 해주세요.',
      accuMchtList: '적립처를 선택 해주세요.',
      accuDivVal: '적립처의 적립 방법을 완성 해주세요.',
      useMchtList: '사용처를 선택 해주세요.',
      usePlaseDataEmpty: '사용처 사용 방법을 완성 해주세요.',
      usePit: '사용처 포인트을 확인 해주세요.',
      usePitMaxMin: '사용처 포인트를 사용 제한에 맞게 설정 해주세요.',
      usePitMaxMin2: '사용처의 최소 포인트는 최대 포인트보다 큰 값이 들어갈 수 없습니다.',
      vldPrdVal: '유효기간을 확인해주세요.'
    }
  },
  // --------------- 상단 바 언어 정보
  navbar: {
    authorityManage: '계정 관리',
    auxiliary: ' 님',
    logOut: '로그아웃'
  },
  // --------------- 로그인 화면
  login: {
    title: 'Echoss Point Service',
    logIn: '로그인',
    username: 'ID',
    password: 'Password'
  },
  // --------------- 이미지 업로드 메세지(이미지 업로드 기능 삭제됐습니다.)
  components: {
    imageUploadTip: '이미지 파일만 업로드 가능합니다.'
  },
  // --------------- 상단 바 아래 조회한 메뉴 리스트 관련 언어
  tagsView: {
    refresh: '새로고침',
    close: '닫기',
    closeOthers: '나머지 모두 닫기',
    closeAll: '모두 닫기'
  },
  // --------------- 우측에 페이지 설정(기능이 있었는데 삭제됐습니다.)
  settings: {
    title: '페이지 설정',
    theme: '테마 색 조정',
    tagsView: '태그 뷰 사용',
    fixedHeader: '고정된 헤더',
    sidebarLogo: '사이드바 로고'
  },
  // --------------- 컴포넌트 및 기본설정
  // --------------- 메뉴별 언어 설정
  // -- Dashboard (메인 - 서비스 현황)
  dashboard: {
    newSubByTo: '신규 가입자',
    accuPitByTo: '적립 포인트',
    usePitByTo: '사용 포인트',
    orgMng: '운영사 관리',
    allPitCard: '운영중인 포인트 카드',
    allMcht: '운영중인 제휴사',
    allUser: '누적 사용자',
    thisMoNewSub: '이번 달 신규 가입자',
    lastMoNewSub: '이전 달 신규 가입자',
    thisMoNewUser: '이번 달 신규 사용자',
    lastMoNewUser: '이전 달 신규 사용자',
    allAccuPit: '누적 포인트',
    thisMoAccuPit: '이번 달 적립 포인트',
    thisWeekAccuPit: '이번 주 적립 포인트',
    thisWeekEarnPoints: '누적 포인트',
    allUsePit: '사용 된 포인트',
    thisMoUsePit: '이번 달 사용 포인트',
    thisWeekUsePit: '이번 주 사용 포인트',
    // 운영사
    useOrAccuMchtByOrgCd: '이용처에 등록된 제휴사',
    orgDashboardInfo: ' 포인트 카드 서비스 현황',
    // 제휴사
    mchtDashboardInfo: ' 서비스 현황'
  },
  // -- 운영사 관리
  orgManagement: {
    no: 'No',
    action: 'action',
    orgCd: '운영사 Key',
    orgNm: '운영사 명',
    pointCardCnt: '포인트 카드 수',
    regId: '등록자',
    regDttm: '등록 일시',
    status: '운영 상태',
    statusOptions: {
      ok: '운영',
      close: '미운영'
    },
    clntId: 'Client ID',
    clntScr: 'Client Secret',
    telNo: '전화번호',
    addr: '주소',
    pitCardNm: '포인트 카드 명',
    ipInfo: 'IP 정보'
  },
  notice: {
    no: 'No',
    title: 'title',
    content: 'content',
    regId: '등록자',
    regDate: '등록시간',
    modId: '수정자',
    modDate: '수정시간'
  },
  // -- 제휴사 관리
  mchtManagement: {
    no: 'No',
    action: 'action',
    mchtCd: '제휴사 코드',
    mchtNm: '제휴사 명',
    orgCd: '운영사 코드',
    orgNm: '운영사 명',
    orgSel: '운영사 선택',
    addr: '주소',
    mchtMgmtCd: '제휴사 관리 코드',
    telNo: '전화번호',
    lat: '위도',
    longi: '경도',
    img: '이미지',
    imgUrl: '이미지 Url',
    ctnt: '소개 내용',
    baseFncDiv: '이용처 구분',
    baseFncDivGbn: {
      all: '적립 & 사용',
      accu: '적립',
      use: '사용',
      trimAll: '적립&사용'
    },
    clntId: 'Client ID',
    clntScr: 'Client Secret',
    status: '운영 상태',
    statusOptions: {
      ok: '운영',
      close: '미운영'
    },
    regId: '등록자',
    regDttm: '등록 일시',
    uploadGbn: '업로드 구분',
    mchtCreate: '제휴사 등록'
  },
  // -- 포인트 카드 관리
  pointCard: {
    no: 'No',
    action: 'Action',
    org: '운영사',
    pitCardFixNo: '포인트 카드 Key',
    pitCardNo: '포인트 카드 번호',
    pitCardNm: '포인트 카드 명',
    mcht: '제휴처',
    mchtNm: '제휴처 명',
    mchtMgmtCd: '제휴사 관리 코드',
    mchtCnt: '제휴처 수',
    prdSet: '운영기간',
    prdSetOptions: {
      y: '선택',
      n: '없음'
    },
    prdSetStDt: '시작일',
    prdSetEndDt: '종료일',
    lvDiv: '등급',
    lvDivYn: '등급 구분',
    accuDiv: '적립 방법',
    accuDivOptions: {
      rt: '정률',
      flat: '정액',
      fix: '횟수'
    },
    accuDivOptionsLong: {
      rt: '적립 금액 대비',
      flat: '결제 금액 대비',
      fix: '결제 1건당'
    },
    maxLmtPit: '포인트 적립 한도',
    initPitYn: '초기 포인트',
    accuPoint: '적립 포인트',
    accuLmtYn: '포인트 적립 제한',
    accuLmtDivOptions: {
      pit: '포인트 제한',
      cnt: '횟수 제한'
    },
    accuCntLmtDivOptions: {
      day: '일',
      week: '주',
      month: '월'
    },
    useLmtYn: '사용 제한',
    accuSpotNm: '적립처 명',
    regAccuSpot: '적립처 등록',
    accuDivYn: '적립처별 적립율',
    accuDivYnOptions: {
      y: '상이',
      n: '동일'
    },
    mchtCd: '제휴처 코드',
    mchtWay: '적립 방법',
    mchtSel: '선택',
    showMcht: '제휴처 조회',
    accuRate: '적립률',
    regUseSpot: '사용처 등록',
    vldPrdDiv: '유효기간 선택',
    vldPrdDivOptions: {
      // none: '없음',
      day: '적립일로 부터 N일',
      month: '적립달로 부터 N개월',
      year: '일괄 초기화(N년)'
    },
    pitExiDiv: '포인트 소멸 방식',
    pitExiDivOptions: {
      prmt: '선입 선출',
      reset: '초기화',
      none: '없음'
    },
    fncDiv: '기능 구분',
    fncDivOptions: {
      all: '전체',
      accu: '적립',
      use: '사용',
      cAccu: '적립 취소',
      cUse: '사용 취소',
      exp: '소멸',
      available: '가용'
    },
    trxAmt: '거래 금액',
    pit: '포인트',
    pitSum: '잔여 포인트',
    status: '상태',
    statusOptions: {
      ok: '운영',
      close: '미운영'
    },
    ynOptions: {
      y: '사용',
      n: '미사용'
    },
    sttDt: '등록 시작 일자',
    endDt: '등록 종료 일자',
    accuStDt: '적립 시작 일자',
    accuEndDt: '적립 종료 일자',
    trxStDt: '거래 시작 일자',
    trxEndDt: '거래 종료 일자',
    trxDttm: '거래 일시',
    regId: '등록자',
    regDttm: '등록 일시',
    basicInfo: '포인트 카드 기본 정보',
    mcntInfo: '적립처 관리',
    useInfo: '사용처 관리',
    expiryDate: '포인트 유효기간 관리',
    calcInfo: '정산 관리',
    orgSel: '운영사 선택',
    remainPit: '잔여 포인트',
    monthExtinctPit: '당월 소멸 포인트',
    // 사용처 관리
    useMchtMng: '사용처 관리',
    accuEqualDivYn: '적립처 동일 여부',
    accuEqualDivOptions: {
      y: '동일',
      n: '상이'
    },
    mchtAccuDiffDivYn: '사용처별 사용 포인트',
    mchtAccuDiffDivOptions: {
      y: '상이',
      n: '동일'
    },
    useablePoint: '사용 포인트',
    minUsePsbltPit: '최소 포인트',
    maxUsePsbltPit: '최대 포인트',
    maxText: '최대 포인트 : ',
    minText: '최소 포인트 : ',
    useMchtNm: '사용처 명',
    useMchtInfo: '사용 방법',
    theNum: '개',
    checkAll: '모두 선택',
    tempList: '임시 저장 리스트',
    note: '비고',
    cancelDttm: '취소 일시',
    // 정산 관리
    calcDiffDiv: '제휴처 별 정산률',
    calcDiffOptions: {
      y: '상이',
      n: '동일'
    },
    mchtCalc: '적립처 정산률',
    useCalc: '사용처 정산률',
    // 등록 수정 마우스 hover 안내 문구
    guide: {
      pitCardNm: '운영할 포인트 카드이름을 설정합니다.',
      prdSet: '본 포인트 서비스 운영 기간을 설정합니다. 설정한 시작일 부터 종료일 까지만 포인트 서비스를 운영할 수 있습니다.',
      lvDivYn: '적립 포인트 별 등급이 있을 경우 설정합니다. 등급은 2개 이상 설정해야하며, 영문KEY는 필수로 입력해야합니다.',
      accuDiv: '결제 이 후 적립 방법에 대한 설정입니다.<br><br>1.정률 : 결제금액 대비 퍼센트로 계산하여 적립<br>ex)10%적립의 경우 결제금액 100원에 10원포인트로 적립됨<br><br>2.정액: 결제금액 대비 횟수로 계산하여 적립<br>ex)100원 결제금액 당 10포인트적립 시, 1000원 결제 시 100포인트 적립됨<br><br>3.횟수: 결제 금액과 상관없이 결제 건당 포인트로 적립<br>ex)1회 결제 시 3포인트 적립',
      maxLmtPit: '포인트 사용자가 최대로 적립 할 수 있는 한도를 설정합니다.',
      initPitYn: '최초 포인트 카드 생성과 동시에 사용자에게 제공되는 기본 포인트를 설정할 수 있습니다.',
      accuLmtYn: '사용자가 적립 할 수 있는 횟수와 적립가능한 최대 포인트를 제한할 수있습니다.<br><br>1.포인트제한: 1회 적립 시  최대로 적립할 수 있는 포인트를 제한합니다.<br>2.횟수제한: 일별,주별,월별 최대 적립 할 수 있는 횟수를 설정합니다.',
      useLmtYn: '사용자가 1회 포인트 사용 시 사용가능한 최소,최대 금액을 둘다 혹은 둘중 하나 설정할 수 있습니다.<br><br>최소 사용가능한 포인트 점수 : 100으로 설정 시 99이하 포인트 사용 할 수 없음<br>최대 사용가능한 포인트 점수 : 1000으로 설정 시 1001이상 포인트 사용 할 수 없음',
      accuDivYn: '적립처 별 적립율을 설정합니다. 각 적립처 마다 적립율이 다를 경우 상이를 선택하시고 적립처 별 적립율을 설정하세요.',
      mchtMgmtCd: '포인트 시스템과 별개로 운영사(또는 제휴사)가  별도로 관리하는 제휴사 코드입니다.',
      accuEqualDivYn: '적립처와 사용처가 동일하거나 적립처와 사용처가 상이할때 선택합니다. 동일한경우 등록한 적립처 목록이(제휴처 구분이 "적립&사용"에 한하여) 그대로 불러옵니다.',
      mchtAccuDiffDivYn: '사용처 별 사용율을 설정합니다. 각 사용처마다 사용율이 다를 경우 상이를 선택하시고 사용처 별 사용율을 설정하세요.',
      vldPrdDiv: '적립된 포인트의 유효기간을 설정합니다.<br><br>1. 적립일로 부터 N일: 포인트적립일부터  설정한 일수가 지날 경우 포인트 사용불가<br>2. 적립달로 부터 N월: 포인트적립한 달 부터  설정한 개월수가 지날 경우 포인트 사용불가<br>3. 일관 초기화(N년): 초기적립일 부터 설정한 년수가 지날 경우 해당 포인트 초기화',
      calcDiffDiv: '제휴처 별 정산률을 설정합니다.<br>적립처와 사용처 별 정산률이 다를 경우 정산률상이를 선택하여 각 적립처,사용처 별 정산률을 설정합니다.<br><br>적립처 정산률:  적립처에서 적립된 포인트에서 설정한 정산률에 따라 운영사에게 정산할 금액이 계산됩니다.<br>사용처 정산률:  사용처에서 사용된 포인트에서 설정한 정산률에 따라 운영사가 사용처에게 정산할 금액이 계산됩니다.'
    },
    isuDttm: '발급 일자',
    isuStDttm: '발급 시작 일자',
    isuEndDttm: '발급 종료 일자',
    userInfo: '사용자 정보'
  },
  // 정산
  calculate: {
    no: 'No',
    baseInfo: '기본 정보',
    calc: '정산',
    org: '운영사',
    pitCard: '포인트 카드',
    mcht1: '제휴사',
    mcht2: '제휴처',
    fncDiv: '기능 구분',
    fncDivOptions: {
      accu: '적립',
      use: '사용',
      cAccu: '적립 취소',
      cUse: '사용 취소',
      exp: '소멸'
    },
    point: '포인트',
    calcDate: '처리 일자'
  },
  // 이용 통계
  // --- Accu Statistic
  // --- Use Statistic
  // --- Customer Statistic
  statistic: {
    tab: {
      accuStatistic: '적립',
      useStatistic: '사용',
      custStatistic: '고객'
    },
    pitCardNmAndOrgNm: '포인트 카드 (운영사)',
    allCustCnt: '전체 고객 수',
    monthAccuPointCnt: '당월 적립 포인트 합계',
    monthPointCnt: '당월 포인트 적립 수',
    weekPointAccuInfo: '주간 별 포인트 적립 현황',
    accuCnt: '적립 건수',
    accuSum: '적립 합계',
    weekText: '주차',
    weekText1: '1 주차',
    weekText2: '2 주차',
    weekText3: '3 주차',
    weekText4: '4 주차',
    weekText5: '5 주차',
    weekText6: '6 주차',
    dayText: '일자',
    poingAccuCnt: '포인트 적립 건수',
    accuPointSum: '적립 포인트 합계',
    sixMonthAccuInfo: '최근 6개월 포인트 적립 현황',
    monthText: '월',
    cnt: '건수',
    fromMonth: '전달 대비',
    monthUsePointCnt: '당월 포인트 사용 수',
    monthUsePointSum: '당월 사용 포인트 합계',
    weekPointUseInfo: '주간 별 포인트 사용 현황',
    useCnt: '사용 건수',
    useSum: '사용 금액',
    poingUseCnt: '포인트 사용 건수',
    usePointSum: '사용 포인트 합계',
    sixMonthUseInfo: '최근 6개월 포인트 사용 현황',
    monthAccuAnalysis: '당월 적립 이용 고객수 현황',
    monthUseAnalysis: '당월 포인트 사용 고객수 현황',
    accuCustCntByMchtCd: '적립처별 이용 고객수 현황',
    accuCustCntByCount: '적립 횟수별 이용 고객수',
    useCustCntByMchtCd: '사용처별 이용 고객수 현황',
    useCustCntByCount: '사용 횟수별 이용 고객수',
    cntGbn: {
      fifth: '1 ~ 5회',
      fifteenth: '5 ~ 15회',
      thirtieth: '15 ~ 30회',
      etc: '30회 ~'
    },
    currentMonth: '당월',
    lastMonth: '전월',
    month: '월',
    day: '일',
    // 2번째 통계 추가
    // 적립
    monthAccuCntAnalysis: '당월 적립 건수 분석',
    monthAccuPitAnalysis: '당월 적립 포인트 분석',
    accuPoint: '적립 포인트',
    sum: '합계',
    usePoint: '사용 포인트',
    accuAnalysis: '적립 이용 고객수',
    useAnalysis: '사용 이용 고객수',
    monthAccuCntAnalysis2: '당월 적립 이용 횟수 분석',
    monthUseCntAnalysis: '당월 사용 이용 횟수 분석'
  },
  // 관리자
  // --- Manager
  manager: {
    no: 'No',
    action: 'action',
    mngId: '관리자 아이디',
    mngNm: '관리자 명',
    mngInfo: '관리자 정보',
    pwd: '비밀번호',
    prePwd: '기존 비밀번호',
    mngPwd: '관리자 비밀번호',
    chgPwd: '변경',
    st: '상태',
    stOptions: {
      ok: '정상',
      close: '정지'
    },
    rule: '권한',
    ruleOptions: {
      admin: '총괄 관리자',
      org: '운영사 관리자',
      mcht: '제휴사 관리자'
    },
    ruleCd: '권한 코드',
    ruleInfo: '권한 정보',
    telNo: '전화 번호',
    eml: '이메일',
    regDttm: '등록 일시',
    modDttm: '수정 일시'
  }
}
