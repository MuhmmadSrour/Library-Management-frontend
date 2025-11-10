export type REGISTERTYPE = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: "ADMIN" | "EMPLOYEE" | "PATRON";
};
export type USERINFOTYPE = {
  type?: "ADMIN" | "EMPLOYEE" | "PATRON";
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  _id?: string;
  cardId?: string;
  createdAt?: string;

  updatedAt?: string;
  libraryCard?: LIBRARYCARD;
  isActive?: boolean;
};
export type PROFILEINFOTYPE = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newPassword?: string;
};
export type BOOKINFOTYPE = {
  _id?: string;
  barcode?: string;
  cover?: string;
  title?: string;
  authors?: string[];
  description?: string;
  subjects?: string[];
  publicationDate?: string;
  publisher?: string;
  pages?: number;
  genre?: string;
  records?: [];
  status?: loanStatus;
};
export type SearchParamsType = {
  query?: string;
  title?: string;
  barcode?: string;
  author?: string;
  description?: string;
  subject?: string;
  genre?: string;
  status?: string;
  page?: number;
  limit?: number;
};
export type LIBRARYCARD = {
  _id?: string;
  cardNumber: string;
  isActive?: boolean;
  issueDate?: Date;
  expiryDate?: Date;
  createdAt?: string;
  updatedAt?: string;
  user?: string;
};
export type loanRecordType = {
  _id?: string;
  status?:
    | "LOANED"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "RETURNED"
    | "OVERDUE"; // حالة الكتاب
  loanedDate?: Date; //موعد اعارة الكتاب
  dueDate?: Date; //موعد النهائي لتسليم الكتاب
  requestedDays?: number;
  returnedDate?: Date; //الفعلي لتسجيل تاريخ اعادة الكتاب
  patron?: string; //المستفيد الذي استعار الكتاب
  employeeOut?: string; //موظف الاعارة
  employeeIn?: string; //موظف الاعادة
  actualLoanDate?: Date;
  isOverdue?: boolean;
  rejectionReason?: string;
  item?: string; //العنصر المعار
};
export type BorrowRequestType = {
  _id?: string;
  status?:
    | "LOANED"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "RETURNED"
    | "OVERDUE";
  requestedDays?: number;
  patron?: USERINFOTYPE;
  employeeOut?: string;
  item?: BOOKINFOTYPE;
  createdAt?: string;
  updatedAt?: string;
};
export type loanStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RETURNED"
  | "OVERDUE";
