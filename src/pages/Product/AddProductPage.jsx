import React from 'react';
import Card from "@/UI/Card";
import AddProd from '@/components/product/AddProduct';

const AddProductPage = () => {
  return (
    <Card 
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0"
      headClass="border-none"
      title="Create Product"
    >
      <AddProd />
    </Card>
  );
};

export default AddProductPage;