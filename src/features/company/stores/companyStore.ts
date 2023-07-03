import { makeObservable, observable, action } from "mobx";

interface Workspace {
  id: string;
  name: string;
  // Add more fields as necessary for your application
}

interface Company {
  id: string;
  name: string;
  workspaces: Workspace[];
}

interface UpdateCompany {
  id: string;
  name?: string;
}

export class CompanyStore {
  companies: Company[] = [];

  constructor() {
    makeObservable(this, {
      companies: observable,
      addCompany: action,
      updateCompany: action,
      deleteCompany: action,
      addWorkspaceToCompany: action,
    });
  }

  addCompany(company: Company) {
    this.companies.push(company);
  }

  updateCompany(updatedFields: UpdateCompany) {
    const companyIndex = this.companies.findIndex(
      (company) => company.id === updatedFields.id
    );

    if (companyIndex !== -1) {
      this.companies[companyIndex] = {
        ...this.companies[companyIndex],
        ...updatedFields,
      };
    }
  }

  deleteCompany(id: string) {
    this.companies = this.companies.filter((company) => company.id !== id);
  }

  addWorkspaceToCompany(companyId: string, workspace: Workspace) {
    const companyIndex = this.companies.findIndex(
      (company) => company.id === companyId
    );

    if (companyIndex !== -1) {
      this.companies[companyIndex].workspaces.push(workspace);
    }
  }
}
