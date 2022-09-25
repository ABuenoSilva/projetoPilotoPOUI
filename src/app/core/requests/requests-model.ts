export interface ProtheusLoginSucess {
  userCode: string;
  userName: string;
  userRoles: [{
    roleCode: string
  }];
  _messages: [
    {
      code: string;
      message: string;
      detailedMessage: string;
    }
  ]
}
