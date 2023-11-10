export type Note = {
    id: string;
    createdDate: Date;
    modifiedDate: Date;
    clientId: string; // Assuming clientId is a string, you can change the type accordingly
    categoryId: string; // Assuming categoryId is a string, you can change the type accordingly
    title: string;
    content: string;
  };
  