interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMailDTO {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}