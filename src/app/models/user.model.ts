export interface User {
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    user_status: string; // "I" - Inactive, "A" - Active, "T" - Terminated
    department: string;
    user_id?: number; // Optional for update and delete operations
  }