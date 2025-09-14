const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7008';

export interface Borrower {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

export interface Lender {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface LoanPlan {
  lender_id: number;
  interestRate: number;
  durationInMonths: number;
  maxLoanAmount: number;
}

export interface Loan {
  borrower_id: number;
  amount: number;
  status: string;
}

export interface LoginResponse {
  message: string;
  borrowerId: number;
}

// Helper function to create FormData
const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  return formData;
};

// Borrower API
export const borrowerApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const formData = createFormData({ email, password });
    const response = await fetch(`${API_BASE_URL}/api/Borrowers/Login`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    return response.json();
  },

  addBorrower: async (borrower: Borrower): Promise<Borrower> => {
    const formData = createFormData(borrower);
    const response = await fetch(`${API_BASE_URL}/api/Borrowers/AddBorrower`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to create borrower');
    }
    
    return response.json();
  },

  getBorrowers: async (): Promise<Borrower[]> => {
    const response = await fetch(`${API_BASE_URL}/api/Borrowers/GetBorrowers`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch borrowers');
    }
    
    return response.json();
  },

  getBorrower: async (id: number): Promise<Borrower> => {
    const response = await fetch(`${API_BASE_URL}/api/Borrowers/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch borrower');
    }
    
    return response.json();
  },

  updateBorrower: async (id: number, borrower: Partial<Borrower>): Promise<Borrower> => {
    const formData = createFormData(borrower);
    const response = await fetch(`${API_BASE_URL}/api/Borrowers/UpdateBorrower/${id}`, {
      method: 'PUT',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to update borrower');
    }
    
    return response.json();
  },
};

// Lender API
export const lenderApi = {
  addLender: async (lender: Lender): Promise<Lender> => {
    const formData = createFormData(lender);
    const response = await fetch(`${API_BASE_URL}/api/Lender/AddLender`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to create lender');
    }
    
    return response.json();
  },

  getLenders: async (): Promise<Lender[]> => {
    const response = await fetch(`${API_BASE_URL}/api/Lender/GetLenders`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch lenders');
    }
    
    return response.json();
  },
};