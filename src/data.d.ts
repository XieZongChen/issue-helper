export interface Form {
  repo: string;
  title: string;
  type: string;
  versionRepository: string;
  versionBrowser: string;
  reproduce: string;
  steps: string;
  expected: string;
  actual: string;
  remarks: string;
  functionContent: string;
  functionalExpectations: string;
}

export interface FormData {
  form: Form;
  version: {
    repo: string[];
  };
}

export interface RepoItem {
  name: string;
  github: string;
  npm: string;
}
