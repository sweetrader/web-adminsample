export default {
  // --------------- 좌측 사이드 바 메뉴 및 상단 경로 표시 이름
  route: {
    main: 'Main',
    'dashboard': 'Dashboard',
    org: 'Service Provider',
    'orgManagement': 'Service Provider',
    mcht: 'Affiliate Channel',
    'mchtManagement': 'Affiliate Channel',
    'mchtCreate': 'Register Affiliate Channel',
    'mchtEdit': 'Edit Affiliate Channel',
    'mchtExcel': 'Upload Excel for Affiliate Channel',
    pointCard: 'Point Card',
    pointCardList: 'Point Card List',
    'pointCardCreate': 'Register Point Card',
    'pointCardEdit': 'Edit Point Card',
    pointCardIsu: 'Point Card History',
    pointCardTrx: 'Point History',
    'pointCardTrxDtl': 'Point History',
    calculate: 'Settlement',
    statistic: 'Charts',
    system: 'System Management',
    'manager': 'Admin',
    'mngCreate': 'Register Account',
    'mngEdit': 'Edit Account',
    'myInfo': 'My Information'
  },
  // --------------- 버튼
  btn: {
    imgSelect: 'Select Image',
    msgSelect: 'Select Message',
    cardSelect: 'Select Card',
    search: 'Search',
    add: 'Register',
    edit: 'Edit',
    before: 'Back',
    list: 'List',
    confirm: 'OK',
    cancel: 'Cancel',
    plus: 'Add',
    apply: 'Apply',
    delete: 'Delete',
    write: 'Draft',
    whole: 'All',
    refresh: 'Refresh',
    addGroup: 'Add Group',
    modGroup: 'Edit Group',
    delGroup: 'Delete Group',
    groupChange: 'Change Group',
    addImg: 'Add Image',
    delImage: 'Delete Selected Image',
    idStore: 'Save ID',
    excelUpload: 'Upload Excel',
    excelDownload: 'Download Excel',
    // 따로 영어 샘플 파일이 없다면 그냥 샘플 파일로 변경
    excelSample: 'Sample File',
    saveTemp: 'Save Draft',
    duplCheck: 'Duplicate Check',
    checkOk: 'Available'
  },
  // --------------- Placeholder, 흐림 글씨
  placeholder: {
    searchType: 'Search Type',
    search: 'Insert Text',
    lvDivCd: 'English Key',
    lvDivNm: 'Korean Title',
    accuLmt: 'Max. Pts To Collected',
    initPit: 'Signing Bonus Point',
    minUsePsbltPit: 'Min. Pts To Use',
    maxUsePsbltPit: 'Max. Pts To Use',
    org: 'Service Provider',
    orgCd: 'Service Provider Code',
    orgNm: 'Service Provider',
    mchtNm: 'Affiliate Channel',
    pitCard: 'Point Card',
    pitCardNo: 'Point Card Number',
    pointCardNm: 'Point Card Name',
    fncDiv: 'Service Type',
    select: 'Select',
    minUsePit: 'Min. Points to insert',
    maxUsePit: 'Max. Points to insert',
    mngId: 'ID',
    mngNm: 'Name',
    pwd: 'Password',
    prePwd: 'Current Password',
    pwdCheck: 'Confirm Password',
    calcMonth: 'Settlement Period',
    pitAccuVal: ' Of X Value',
    eachAccuLmt1: 'Max. Pts Per TNX',
    eachAccuLmt2: 'Max. Transactions',
    mngIdRequiredEn: 'At Least 4 Alphabets Or Numbers',
    userInfo: 'User Info'
  },
  // --------------- 메뉴별 타이틀
  title: {
    service: 'Current Status',
    orgManagement: 'Manager Service Provider',
    'orgCreate': 'Register Service Provider',
    'orgEdit': 'Edit Service Provider ',
    mcntManagement: 'Manage Affiliate Channel',
    'mchtCreate': 'Register Affiliate Channel',
    'mchtEdit': 'Edit Affiliate Channel',
    'mchtExcel': 'Affiliate Channel Excel Upload',
    pointCardMng: 'Manage Point Card',
    'pointCardCreate': 'Register Point Card',
    'pointCardEdit': 'Edit Point Card',
    pointCardTrx: 'Manage Point History',
    'pointCardTrxDtl': 'Point History in Details',
    calculate: 'Settlement',
    system: 'System Management',
    'manager': 'Admin',
    'mngCreate': 'Register Admin',
    'mngEdit': 'Edit Admin',
    'myInfo': 'My Info'
  },
  // --------------- 경고, 에러, 성공 메세지 문구 등
  message: {
    imageRestrictOne: 'Only 1(One) Image Can Be Uploaded.',
    passwordValidate: '8~16 Including Upper, Lower Case English Alphabet, Number And Special Charecter.',
    passwordCheck: 'Confirm Password.',
    idValidateCheck: 'Insert ID.',
    mngIdRequiredEn: 'At Least 4 Alphabets Or Numbers.',
    valid_required: 'Mandatory.',
    addConfirm: 'Are You Sure To Add?',
    editConfirm: 'Are You Sure To Edit?',
    applyConfirm: 'Are You Sure To Apply?',
    deleteConfirm: 'Are You Sure To Delete?',
    success: 'Success.',
    failure: 'Fail.',
    careful: 'Warning!',
    selectedImgRequired: 'Select Image!',
    selectedGroupRequired: 'Select Group!',
    deleteProcessError: 'An Error Occurred While Processing Your Request.',
    successCopy: 'Duplicated.',
    dragExcelFile: 'Drag File Here.',
    acceptableExcelFile: 'Only xlsx / xls / csv.',
    onlySupportOne: 'Only 1(One) File Can Be Uploaded.',
    modifyLevelWarning: 'Merchants Data Will Be Refreshed<br>When Save Edited.',
    mchtDeleteGuide: 'Data Will Be Deleted Permanently.<br>Are You Sure To Edit?',
    lvDivCdDuplicate: 'Invalid Key.',
    lvDivValid: 'Key and Title in English Are Mandatory.',
    selectOrgCd: 'Service Provider.',
    uploadExcel: 'Upload Excel .',
    excelErroMsg1: '  Data, "',
    excelErroMsg2: 'Data Inserted in " is Invalid.',
    accuEqualGuide: 'Data Will Be Input Automatically For Merchants Registered Under [Collect & Spend].',
    needCheckDupl: 'Check ID.',
    checkPassword: 'Check Password.',
    statSearchValid1: 'Select Card.',
    statSearchValid2: 'Select Date.',
    saveTempCheck: 'Draft Will Be Permanently Deleted If You Clear Your Browser History.',
    lvValidMessage: 'Click "Apply" After Setting Membership Tiers and Service Type.',
    // 포인트 카드 유효성 검사 메세지
    pointCardValid: {
      orgCd: 'Select Service Provider.',
      pitCardNm: 'Insert Point Card.',
      prdSetDt: 'Insert Service Period.',
      levelList: 'Member Benefits Are Set, Click "Apply".',
      pitAccu: 'Insert Service Type.',
      maxLmtPit: 'Max. Points Collect – Insert the Max. of Points to Collect.',
      initPit: 'Insert Bonus Points.',
      accuLmtYn: 'Insert Point Collect Limitation.',
      useLmtYn: 'Insert Point Spend Limitation.',
      lvList: 'Set Merchant Point Collect Type.',
      accuMchtList: 'Select Point Collect Merchants.',
      accuDivVal: 'Complete Point Collecting Type for Merchants.',
      useMchtList: 'Select Point Spend Merchants.',
      usePlaseDataEmpty: 'Complete Point Spending Type for Merchants.',
      usePit: 'Confirm Points for Point Spend Merchant.',
      usePitMaxMin: 'Please Set the Range of Points to be spent for Point Spend Merchant Correctly.',
      usePitMaxMin2: 'Min. Points To Spend Cannot Be Bigger Than Max. Points To Spend.',
      vldPrdVal: 'Confirm Service Period.'
    }
  },
  // --------------- 상단 바 언어 정보
  navbar: {
    authorityManage: 'Manage Account',
    auxiliary: '',
    logOut: 'Logout'
  },
  // --------------- 로그인 화면
  login: {
    title: 'Echoss Point Service',
    logIn: 'Login',
    username: 'ID',
    password: 'Password'
  },
  // --------------- 이미지 업로드 메세지(이미지 업로드 기능 삭제됐습니다.)
  components: {
    imageUploadTip: 'Only Image File Can Be Uploaded.'
  },
  // --------------- 상단 바 아래 조회한 메뉴 리스트 관련 언어
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close All Tabs',
    closeAll: 'Close Tabs'
  },
  // --------------- 우측에 페이지 설정(기능이 있었는데 삭제됐습니다.)
  settings: {
    title: 'Page Setting',
    theme: 'Set Theme Color',
    tagsView: 'Apply Tag View',
    fixedHeader: 'Secure Header',
    sidebarLogo: 'Sidebar Logo'
  },
  // --------------- 컴포넌트 및 기본설정
  // --------------- 메뉴별 언어 설정
  // -- Dashboard (메인 - 서비스 현황)
  dashboard: {
    newSubByTo: 'New User',
    accuPitByTo: 'Point Collected',
    usePitByTo: 'Point Spent',
    orgMng: 'Manage Service Provider',
    allPitCard: 'Active Point Card',
    allMcht: 'Active Affiliate Channel',
    allUser: 'All Users',
    thisMoNewSub: 'New Members This Month',
    lastMoNewSub: 'New Members Last Month',
    thisMoNewUser: 'New Users This Month',
    lastMoNewUser: 'New Users Last Month',
    allAccuPit: 'Accumulated Points',
    thisMoAccuPit: 'Points Collected This Month',
    thisWeekAccuPit: 'Points Collected This Week',
    thisWeekEarnPoints: 'Accumulated Points',
    allUsePit: 'Points Spent',
    thisMoUsePit: 'Points Spent This Month',
    thisWeekUsePit: 'Points Spent This Week',
    // 운영사
    useOrAccuMchtByOrgCd: 'Merchant Registered Under Point Spend Merchant',
    orgDashboardInfo: 'Point Card Status',
    // 제휴사
    mchtDashboardInfo: 'Service Status'
  },
  // -- 운영사 관리
  orgManagement: {
    no: 'No',
    action: 'Action',
    orgCd: 'Service Provider Key',
    orgNm: 'Service Provider',
    pointCardCnt: 'Number Of Point Card',
    regId: 'Registered By',
    regDttm: 'Registered',
    status: 'Status',
    statusOptions: {
      ok: 'Active',
      close: 'Inactive'
    },
    clntId: 'Client ID',
    clntScr: 'Client Secret',
    telNo: 'Contact Number',
    addr: 'Address',
    pitCardNm: 'Point Card Name',
    ipInfo: 'IP Info'
  },
  // -- 제휴사 관리
  mchtManagement: {
    no: 'No',
    action: 'action',
    mchtCd: 'Affiliate Code',
    mchtNm: 'Affiliate Channel',
    orgCd: 'Service Provider Code',
    orgNm: 'Service Provider',
    orgSel: 'Select Service Provider',
    addr: 'Address',
    mchtMgmtCd: 'Manage Affiliate Code',
    telNo: 'Contact Number',
    lat: 'Latitute',
    longi: 'Longtitute',
    img: 'Image',
    imgUrl: 'Image Url',
    ctnt: 'Description',
    baseFncDiv: 'Service Type',
    baseFncDivGbn: {
      all: 'Collect & Spend',
      accu: 'Collect',
      use: 'Spend',
      trimAll: 'Collect & Spend'
    },
    clntId: 'Client ID',
    clntScr: 'Client Secret',
    status: 'Status',
    statusOptions: {
      ok: 'Active',
      close: 'Inactive'
    },
    regId: 'Registered By',
    regDttm: 'Registered',
    uploadGbn: 'Uploaded File',
    mchtCreate: 'Register Affiliate Channel'
  },
  // -- 포인트 카드 관리
  pointCard: {
    no: 'No',
    action: 'Action',
    org: 'Service Provider',
    pitCardFixNo: 'Point Card Key',
    pitCardNo: 'Point Card Number',
    pitCardNm: 'Point Card',
    mcht: 'Merchant',
    mchtNm: 'Merchant',
    mchtMgmtCd: 'Manage Merchant Code',
    mchtCnt: 'Number of Merchants',
    prdSet: 'Service Period',
    prdSetOptions: {
      y: 'Select',
      n: 'None'
    },
    prdSetStDt: 'Start Date',
    prdSetEndDt: 'End Date',
    lvDiv: 'Member Benefits',
    lvDivYn: 'Member Benefits Tier',
    accuDiv: 'Point Collect Type',
    accuDivOptions: {
      rt: 'Fixed Rate',
      flat: 'Flat Rate',
      fix: 'Per TNX'
    },
    accuDivOptionsLong: {
      rt: 'N% of Total Sale',
      flat: 'N Points for N Sale',
      fix: 'N Points Per Transaction'
    },
    maxLmtPit: 'Max Points',
    initPitYn: 'Signing Bonus',
    accuPoint: 'Points Collected',
    accuLmtYn: 'Collect Limit',
    accuLmtDivOptions: {
      pit: 'Points Limit',
      cnt: 'TNX Limit'
    },
    accuCntLmtDivOptions: {
      day: 'Day',
      week: 'Week',
      month: 'Month'
    },
    useLmtYn: 'Spend Limit',
    accuSpotNm: 'Point Collect Merchant',
    regAccuSpot: 'Register Point Collect Merchant',
    accuDivYn: 'Point Collection Plan',
    accuDivYnOptions: {
      y: 'Yes',
      n: 'No'
    },
    mchtCd: 'Merchant Code',
    mchtWay: 'Point Collect Type',
    mchtSel: 'Select',
    showMcht: 'View Merchant',
    accuRate: 'Point Collect Rate',
    regUseSpot: 'Register Point Spend Merchant',
    vldPrdDiv: 'Select Valid Service Period',
    vldPrdDivOptions: {
      // none: 'None',
      day: 'N Day',
      month: 'N Month',
      year: 'Reset'
    },
    pitExiDiv: 'Point Expiration Type',
    pitExiDivOptions: {
      prmt: 'First-In-First-Out',
      reset: 'Reset',
      none: 'None'
    },
    fncDiv: 'Service Type',
    fncDivOptions: {
      all: 'All',
      accu: 'Collect',
      use: 'Spend',
      cAccu: 'Cancel Point Collected',
      cUse: 'Cancel Point Spent',
      exp: 'Expired',
      available: 'Available'
    },
    trxAmt: 'Sale Amount',
    pit: 'Point',
    pitSum: 'Balance Pts',
    status: 'Status',
    statusOptions: {
      ok: 'Active',
      close: 'Inactive'
    },
    ynOptions: {
      y: 'Yes',
      n: 'No'
    },
    sttDt: 'Registration Date Starts',
    endDt: 'Registration Date Ends',
    accuStDt: 'Transaction Date Start',
    accuEndDt: 'Transaction Date Ends',
    trxStDt: 'Transaction Date Starts',
    trxEndDt: 'Transaction Date Ends',
    trxDttm: 'Transaction Date',
    regId: 'Registered By',
    regDttm: 'Registered',
    basicInfo: 'Point Card Info',
    mcntInfo: 'Manage Point Collect Merchant',
    useInfo: 'Manage Point Spend Merchant',
    expiryDate: 'Point Expiration Date',
    calcInfo: 'Settlement',
    orgSel: 'Select Service Provider',
    remainPit: 'Balance Point',
    monthExtinctPit: 'Points Expired This Month',
    // 사용처 관리
    useMchtMng: 'Manage Point Spend Merchant',
    accuEqualDivYn: 'Same As Point Collect Merchant',
    accuEqualDivOptions: {
      y: 'Yes',
      n: 'No'
    },
    mchtAccuDiffDivYn: 'Point Spending Plan',
    mchtAccuDiffDivOptions: {
      y: 'Yes',
      n: 'No'
    },
    useablePoint: 'Point Spend',
    minUsePsbltPit: 'Min. Points',
    maxUsePsbltPit: 'Max. Points',
    maxText: 'Max. Points : ',
    minText: 'Min. Points : ',
    useMchtNm: 'Point Spend Merchant',
    useMchtInfo: 'Service Type',
    theNum: ' ',
    checkAll: 'Select All',
    tempList: 'List of Draft Saved',
    note: 'Remarks',
    cancelDttm: 'Cancel Date',
    // 정산 관리
    calcDiffDiv: 'Merchant Settlement Plan',
    calcDiffOptions: {
      y: 'Yes',
      n: 'No'
    },
    mchtCalc: 'Point Collect Merchant Settlement Ratio',
    useCalc: 'Point Spend Merchant Settlement Ratio',
    // 등록 수정 마우스 hover 안내 문구
    guide: {
      pitCardNm: 'Set Point Card Name.',
      prdSet: 'Set Service Period for Point Card. Point Card Service Will Be Provided Within The Service Period Only.',
      lvDivYn: 'Set Member Benefits For Each Tiers If Available. Min. 2(Two) Tiers And Above, English Key Is Mandatory.',
      accuDiv: 'Set Point Collect Limitation After Payment.<br><br>1. Fixed Rate: N% of Total Sale<br>ex) A 10% Fixed Rate Indicates A User Can Collect 10P From 100 Dollars Sale. <br><br>2. Flat Rate: N Points From N Dollars Of Sale<br>ex) 10P Is Collected For Every 100 Dollars Spent, In Other Words, 100P Is Collected For Every 1000 Dollars Spent<br><br>3. Per TNX: Collect N Points Per Transaction In Regardless Of Total Sale<br>ex)Collect 3 Points Per Transaction',
      maxLmtPit: 'Set Max. Pts To Collect By A Single User During Service Period',
      initPitYn: 'Set Points Given To A Single User As Bonus When Register For Point Card.',
      accuLmtYn: 'Set Max. Points To Collect And Total Transactions To Collect Points By A Single User.<br><br>1. Point limit: Set Max. Points To Collect Per Transaction.<br>2. TXN limit: Set Max. Of Transactions To Collect Points Per Day, Per Week Or Per Month By A Single User.',
      useLmtYn: 'Set Min. & Max Point To Spend Per Transaction, Or Apply Both Min. & Max. Point To Spend Per Transaction.<br><br>Min. Point Spend: 99 Points And Below Cannot Be Redeemed If Min. Point Spend Is 100 Points<br>Max. Point Spend: 1001 Points And Above Cannot Be Redeemed If Max. Point Spend Is 1000 Points',
      accuDivYn: 'Set Point Collection Plan Apply To Point Collect Merchant. Select “Yes” to Point Collection Plan And Insert Point Collect Ratio To Each Tier.',
      mchtMgmtCd: 'Merchant Code Managed Separately By Service Provider Or Affiliate Channel(Excluded In Point System Mgmt).',
      accuEqualDivYn: 'Select “Yes” if Point Spend Merchants Are The Same with Point Collect Merchant.<br>If “No”, Select Point Spend Merchants From the Marchant List(Registered Under “Collect & Spend”).',
      mchtAccuDiffDivYn: 'Set Ratio For Each Point Spend Merchant. Select “Yes” To Set Point Spending Ratio For Each Merchant.',
      vldPrdDiv: 'Set Points Validation Period.<br><br>1. N Day From The Day Of Point Collected: All Points Shall Be Redeemed Until The Day Indicated In Expiry Date<br>2. N Month From The Month Of Point Collected: All Points Shall Be Redeemed Until The Month Indicated In Expiry Date<br>3. Reset(N Year): All Points Shall Be Redeemed Until The Year Indicated In The Expiry Date(Point Card Will Reset Automatically And Balance Points Will Be Forfeited)',
      calcDiffDiv: 'Set Settlement Ratio For Merchants.<br>Select “Yes” If  Settlement Ratio For Point Collect Merchant And Point Collect Spend Is Different And Insert Settlement Ratio For Each Merchant.<br><br>For Point Collect Merchant: Amount will be Calculated According To The Settlement Ratio Set In For Service Provider By Point Collect Merchant.<br>For Point Spend Merchant: Amount Will Be Calculated According To The Settlement Ratio Set In For Service Provider By Point Spend Merchant.'
    },
    isuDttm: 'Issue',
    isuStDttm: 'Start Date',
    isuEndDttm: 'End Date',
    userInfo: 'User Info'
  },
  // 정산
  calculate: {
    no: 'No',
    baseInfo: 'Basic Info',
    calc: 'Settlement',
    org: 'Service Provider',
    pitCard: 'Point Card',
    mcht1: 'Affiliate Channel',
    mcht2: 'Merchant',
    fncDiv: 'Service Type',
    fncDivOptions: {
      accu: 'Collect',
      use: 'Spend',
      cAccu: 'Cancel Collect',
      cUse: 'Cancal Spend',
      exp: 'Expired'
    },
    point: 'Point',
    calcDate: 'Processed'
  },
  // 이용 통계
  // --- Accu Statistic
  // --- Use Statistic
  // --- Customer Statistic
  statistic: {
    tab: {
      accuStatistic: 'Point Collected',
      useStatistic: 'Point Spent',
      custStatistic: 'Customer'
    },
    pitCardNmAndOrgNm: 'Point Card(Service Provider)',
    allCustCnt: 'Ttl Customers',
    monthAccuPointCnt: 'Pts Collected This Mo',
    monthPointCnt: 'Pt Collect Tnx This Mo',
    weekPointAccuInfo: 'Weekly Stat',
    accuCnt: 'Tnx',
    accuSum: 'Ttl Pts',
    weekText: 'Weekly',
    weekText1: '1st Week',
    weekText2: '2nd Week',
    weekText3: '3rd Week',
    weekText4: '4th Week',
    weekText5: '5th Week',
    weekText6: '6th Week',
    dayText: 'Daily',
    poingAccuCnt: 'Ttl Tnx',
    accuPointSum: 'Ttl Pts',
    sixMonthAccuInfo: 'Pts Collect Stat In 6 Mo',
    monthText: 'Month',
    cnt: 'Count',
    fromMonth: 'M-o-M',
    monthUsePointCnt: 'Pt Spent Tnx This Mo',
    monthUsePointSum: 'Ttl Pts Spent This Mo',
    weekPointUseInfo: 'Weekly Stat',
    useCnt: 'Tnx',
    useSum: 'Amt Spent',
    poingUseCnt: 'Tnx',
    usePointSum: 'Tlt Pts Spent',
    sixMonthUseInfo: 'Pts Spent Stat In 6 Mo',
    monthAccuAnalysis: 'Pts Collection Cust. Stat This Mo',
    monthUseAnalysis: 'Pts Spent Cust. Stat This Mo',
    accuCustCntByMchtCd: 'Pt Collect Merchants Stat',
    accuCustCntByCount: 'Pt Collect Tnx Stat',
    useCustCntByMchtCd: 'Pt Spent Merchants Stat',
    useCustCntByCount: 'Pt Spent Tnx Stat',
    cntGbn: {
      fifth: '1~5 Times',
      fifteenth: '6~15 Times',
      thirtieth: '16~30 Times',
      etc: '31 Times ~'
    },
    currentMonth: 'This Mo',
    lastMonth: 'Last Mo',
    month: 'Mo',
    day: 'Day',
    // 2번째 통계 추가
    // 적립
    monthAccuCntAnalysis: 'Pt Collect Tnx Stat This Mo',
    monthAccuPitAnalysis: 'Pt Collect Stat This Mo',
    accuPoint: 'Pts Collected',
    sum: 'Sum',
    usePoint: 'Pts Spent',
    accuAnalysis: 'Pt Collect Customers',
    useAnalysis: 'Pt Spend Customers',
    monthAccuCntAnalysis2: 'Point Collect Tnx Stat This Mo',
    monthUseCntAnalysis: ' Point Spend Tnx Stat This Mo'
  },
  // 관리자
  // --- Manager
  manager: {
    no: 'No',
    action: 'action',
    mngId: 'Admin ID',
    mngNm: 'Admin',
    mngInfo: 'Admin Info',
    pwd: 'Password',
    prePwd: 'Current Password',
    mngPwd: 'Admin Password',
    chgPwd: 'Edit',
    st: 'Status',
    stOptions: {
      ok: 'Active',
      close: 'Terminate'
    },
    rule: 'Account Type',
    ruleOptions: {
      admin: 'Administrator',
      org: 'Service Provider',
      mcht: 'Affiliate Manager'
    },
    ruleCd: 'Authority Code',
    ruleInfo: 'Authority Info',
    telNo: 'Contact Number',
    eml: 'Email',
    regDttm: 'Registered',
    modDttm: 'Edited'
  }
}
