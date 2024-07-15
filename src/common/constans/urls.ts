export const URLs = {
  equifax: {
    oauth: {
      token: '/v1/oauth/token',
      tokenV2: '/v2/oauth/token',
    },
    business: {
      asset: {
        scope: '/business/asset-view/v1',
        initiate: '/business/verification-of-assets/v1/initiate',
        retrieve: '/business/asset-view/v1/retrieve',
        refresh: '/business/asset-view/v1/refresh',
      },
      scoreAttributes: {
        scope: 'https://api.equifax.com/business/scores-and-attributes/v2',
        creditReport: '/business/scores-and-attributes/v2/credit-report',
      },
      bankTransactionData: {
        scope: 'https://api.equifax.com/business/bankingandlending/v1',
        userRegister: '/business/bankingandlending/v1/user-registrations',
      },
      oneView: {
        scope: 'https://api.equifax.com/business/oneview/consumer-credit/v1',
        consumerCredit:
          '/business/oneview/consumer-credit/v1/reports/credit-report',
      },
      chexAdvisor: {
        scope: '/business/datax/v1',
        request: '/business/datax/v1/core',
      },
      preApprovalOne: {
        scope: 'https://api.equifax.com/business/preapproval-of-one/v1',
        reportRequest: '/business/preapproval-of-one/v1/report-requests',
      },
      preQualification: {
        scope: 'https://api.equifax.com/business/prequal-of-one/v1',
        reportRequest: '/business/prequal-of-one/v1/report-requests',
      },
    },
  },
  experian: {
    oauth: {
      token: '/v1/oauth/token',
      tokenV2: '/v2/oauth/token',
    },
    transactionCategoriser: {
      get: '/eits/gdp/v1/request?targeturl=https%3A%2F%2Fsandbox-api.serasaexperian.com.br%2Fopen-banking%2Fcategorization%2Fv1%2Fcategorize',
    },
    openBanking: {
      verifyIncome:
        '/eits/gdp/v1/request?targeturl=https%3A%2F%2Fsandbox-api.serasaexperian.com.br%2Fopen-banking%2Fincome-verification%2Fv1%2Fincome-verifications',
      abilityPay:
        '/eits/gdp/v1/request?targeturl=https%3A%2F%2Fsandbox-api.serasaexperian.com.br%2Fopen-banking%2Faffordability-check%2Fv1%2Faffordability-checks',
      bankScore: '/eits/gdp/v1/request?targeturl=',
      targetUrlBankScore:
        'https://sandbox-api.serasaexperian.com.br/open-banking/score/v1/scores',
    },
  },
};
